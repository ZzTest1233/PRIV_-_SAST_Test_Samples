pm.test("TC_1: RESPONSE STATUS HTTP 200 OK", function () 
{
    pm.response.to.have.status(200);
});

pm.test("TC_2: OFFERING RESPONSE VALIDATION OK", function () {

    var jsonData = pm.response.json();

    var m = pm.collectionVariables.get("msisdn");  //получаем номер из переменных коллекции
    var c = pm.collectionVariables.get("channel");
    var p = pm.collectionVariables.get("productSpecID");
    var s = pm.collectionVariables.get("slug");

    pm.expect(jsonData.data.productOfferings.edges[0].node.id).not.eql(null); 
    pm.expect(jsonData.data.productOfferings.edges[0].node.acceptanceStatus.canBeAccepted).to.eql(true); 
    pm.expect(jsonData.data.productOfferings.edges[0].node.acceptanceStatus.statusReason).to.eql(null);
    pm.expect(jsonData.data.productOfferings.edges[0].node.acceptanceStatus.code).to.eql(null);
    pm.expect(jsonData.data.productOfferings.edges[0].node.channel.slug).to.eql(c); 
    pm.expect(jsonData.data.productOfferings.edges[0].node.customer.id).to.eql(""); 
    pm.expect(jsonData.data.productOfferings.edges[0].node.customer.msisdn).to.eql(m); 
    pm.expect(jsonData.data.productOfferings.edges[0].node.customer.billingAccountNumber).to.eql(null); 
    pm.expect(jsonData.data.productOfferings.edges[0].node.offerProvider.source).to.eql("EP"); 
    pm.expect(jsonData.data.productOfferings.edges[0].node.offerProvider.externalProductId).to.eql(p); 
    pm.expect(jsonData.data.productOfferings.edges[0].node.offerType).to.eql("SALE"); 

    for (i = 0; i < 2; i++)
    {
		var d = 0;
        pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].type).to.eql("RECURRING"); 
        pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].action.slug).to.eql("SUBSCRIPTION"); 
		
		if (jsonData.data.productOfferings.edges[0].node.prices[i].resultPrice.amount < 
            jsonData.data.productOfferings.edges[0].node.prices[i].basePrice.amount   )
			{
				d = jsonData.data.productOfferings.edges[0].node.prices[i].basePrice.amount - 
					jsonData.data.productOfferings.edges[0].node.prices[i].resultPrice.amount;
					
					pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].modifiers.discounts.amount.amount).to.eql(d); 
                    pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].modifiers.discounts.amount.currency).to.eql("RUB"); 
                    pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].modifiers.discounts.duration).to.eql(null); 
                    pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].modifiers.discounts.reason.slug).to.eql(null); 
                    pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].modifiers.discounts.reason.description).to.eql(""); 
			}

        if (i == 0)
        {
            pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].componentId).to.eql("05c33517-3c57-4d76-8cb7-d8629218f558");
			
			if (jsonData.data.productOfferings.edges[0].node.prices[i].firstPrice.amount == 0 || 
			    jsonData.data.productOfferings.edges[0].node.prices[i].payNow == false)
				{
					pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].modifiers.paymentDateShift.reason.slug).to.eql(null); 
                    pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].modifiers.paymentDateShift.reason.description).to.eql(null); 
                    pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].modifiers.paymentDateShift.duration.duration).to.eql(30); 
                    pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].modifiers.paymentDateShift.duration.unit).to.eql("DAY"); 
					pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].firstPrice.amount).to.eql("0.00"); 
					pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].payNow).to.eql(false); 
				}

			else { 
			pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].resultPrice.amount).to.eql(jsonData.data.productOfferings.edges[0].node.prices[i].firstPrice.amount); 
			pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].modifiers.paymentDateShift).to.eql(null);
			}
            
            pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].basePrice.amount).to.eql("249.00"); 
            
            pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].interval.duration).to.eql(1); 
            pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].interval.unit).to.eql("MONTH"); 

            pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].isEnabled).to.eql(true); 
        }

        if (i == 1)
        {
            pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].componentId).to.eql("e10b664b-e1e4-42a7-8adb-80e0f72e7027"); 
            pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].resultPrice.amount).to.eql(jsonData.data.productOfferings.edges[0].node.prices[i].firstPrice.amount); 
            pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].basePrice.amount).to.eql("1890.00"); 
            
            pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].interval.duration).to.eql(1); 
            pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].interval.unit).to.eql("YEAR"); 

            pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].isEnabled).to.eql(false); 
			pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].payNow).to.eql(true); 
        }
        
        pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].resultPrice.currency).to.eql("RUB"); 
        pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].firstPrice.currency).to.eql("RUB"); 
        pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].basePrice.currency).to.eql("RUB"); 
        pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].duration).to.eql(null); 
        pm.expect(jsonData.data.productOfferings.edges[0].node.prices[i].availableForSale).to.eql(true); 

        pm.expect(jsonData.data.productOfferings.edges[0].node.specification.id).to.eql(p);
        pm.expect(jsonData.data.productOfferings.edges[0].node.specification.slug).to.eql(s);
        pm.expect(jsonData.data.productOfferings.edges[0].node.touchPointView.general.name).to.eql("МТС Premium");
        pm.expect(jsonData.data.productOfferings.edges[0].node.type).to.eql("PRODUCT_SIMPLE");
        pm.expect(jsonData.data.productOfferings.edges[0].node.quantity).to.eql("1");
    }
});// console.log(jsonData);

   // pm.expect(jsonData.data.productOffering.createDate).to.include("2022-");
   // pm.expect(jsonData.data.productOffering.expireDate).to.include("2022-"); });