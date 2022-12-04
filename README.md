# Simple-EJS-Server
* [How to use](#how-to-use)
* [Examples](#examples)
* [Config](#config)
* [Build](#build)

## How to use
---
The views folder will contain all your websites content.

Files ending with ejs can embed javascipt to run server side code.

Please look at [the ejs module](https://www.npmjs.com/package/ejs) for information on how to embed code and use the ejs syntax.

## Examples
---
You can use the following variables your EJS
* **`req`** request, from express
* **`res`** response, from express
* **`getErrorPage(code: number)`** Returns the default error page
* **`LocalDB`** Save Data localy to the memory, useful for keeping data between pages
* * **`LocalDB.get(name: string)`** Static method to get the database instance
* * Non Static Methods (After you get the instance)
* * **`LocalDB.set(key: string, value: string)`** Attach a key to a value
* * **`LocalDB.remove(key: string)`** Remove the value attached to the key
* * **`LocalDB.get(key: string)`** Gets the value attached with the key
* * **`LocalDB.getAll()`** Returns entire Database object
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
Show error code

```html
<header>
  <%- include('./header.ejs') %>
</header>
<main>
  <%- getErrorPage(500) %>
</main>
```

## Config
---

> **Port**

The port the server listens to.

Default: `80`

> **updateOnRequest**

Any of your .ejs are saved in a array and if you create a new on it will be considered a static file.

Enable this for the server to re-read the directory for your new .ejs files

Default: `false`

> **private**

A list of every directory in your "views" folder that is private

Also will prvent `/private/*` with a 403

Default: `[ "private/" ]`

> **binds**

A list of force bounded locations.

* **url:** Referance to the URL on the request.
* **method:** The method that will be accepted.
* **page:** Referance to a file in your views.

Default: `[]`

**Examples of use (For POST)**
You can use `req.body` inside your ejs for the post data
```json
"binds": [
  {
    "url": "/login",
    "method": "POST",
    "page": "/private/login.ejs"
  }
]
```


## Build
---
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