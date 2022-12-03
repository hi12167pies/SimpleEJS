# How to use
Its simple!
In the "views" folder you can put any code you want.
This can be .html, .css, .js

The thing that make this cool is you can use EJS and use javascript on the server side in html.

Files ending in .ejs are using this

# Examples
```
<%- includes('./header.ejs') %>
```

You may also use the `req` and `res` variables inside you ejs

```
<%
  let content
  if (req.query.page == "home") {
    content = include("./home.ejs")
  } else {
    res.status(404)
    content = "Uh Oh! Not found!"
  }
%>
<div>
  <%- content %>
</div>
```
