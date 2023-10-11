get("/search") {
val query = call.request.queryParameters["query"]
call.respondText("<p>Showing results for $query</p>", ContentType.Text.Html)
}
// get("/search") {
// val query = call.request.queryParameters["query"]
// call.respondText("<p>Showing results for $query</p>", ContentType.Text.Html)
// }