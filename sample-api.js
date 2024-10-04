
const express = require("express");
const fs = require("fs")
const app = express()
const PORT = 8000;


app.get("/api/users/ :name",(req,resp) =>{
    const name = (req.params.name)
    console.log(req.params)

    const u = users.find((item)=>item.name === name);
    return resp.json(u)
})

app.get("/users",(req,resp)=>{
    const html = ` <ul>${users.map((user)=>`<li>${user.first_name }</li>`).join("")}
    </ul>`;
    resp.send(html)
})


app.get("/api/users/:id",(req,resp)=>{
   const id = Number(req.params.id);
//    console.log(req.params)
   const user = users.find((i) =>i.id === id);
   return resp.json(user)
})
