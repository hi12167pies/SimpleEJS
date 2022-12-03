# How to use
Its simple!
In the "views" folder you can put any code you want.
This can be .html, .css, .js

The thing that make this cool is you can use EJS and use javascript on the server side in html.

Files ending in .ejs are using this

# Examples
Please check out the EJS Module for nodejs https://www.npmjs.com/package/ejs
You can use the `req` and `res` variables inside you ejs
```html
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
# Build
First install all the packages
```bash
cd ./SimpleJS
npm i
```
Next install pkg
```bash
npm i -g pkg
```
Finnaly build the project
```bash
pkg .
```