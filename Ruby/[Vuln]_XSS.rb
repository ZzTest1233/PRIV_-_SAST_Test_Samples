# Wrong! Do not do this!
<%= raw @product.name %>

# Wrong! Do not do this!
<%== @product.name %>

# Wrong! Do not do this!
<%= @product.name.html_safe %>

# Wrong! Do not do this!
<%= content_tag @product.name %>


# # # Wrong! Do not do this!
# # <%= raw @product.name %> 

# # <%== @product.name %>

# # Wrong! Do not do this!
# <%= @product.name.html_safe %>

# # Wrong! Do not do this!
# <%= content_tag @product.name %>