// // const app = require("./app")
// // console.log(app.z())

// // const http = require("http");

// // http.createServer((req,res) =>{
// //     res.write("hello, this is semil godhani");
// //     res.end();

// // }).listen(4500);


// // const colors = require("colors");
// // console.log("package".blue)

// const http = require("http");
// const data = require("./app")
// http.createServer((req,res) =>{
//     res.writeHead(201,{"Content-Type" : "application \ json"});
//     res.write(JSON.stringify(data));
//     res.end();

// }).listen(4700);

// const fs = require("fs");
// const path = require ("path");
// const dirpath = path.join(__dirname,"crud");
// const filepath = `${dirpath}/apple.txt`;


// fs.writeFileSync(filepath, `this is a simple text file`)

// fs.appendFile(filepath, "  and file name is apple.txt",(err)=>{
//     if(!err) console.log("file is updated")
// })

// fs.unlinkSync(`${dirpath}/apple.txt`)


// const fs = require ("fs");
// const path = require ("path");
// const pathname =path.join(__dirname,"crud");
// const filepath =`${pathname}/fruit.txt`;


// fs.writeFileSync(filepath,"this is sample of example ");

// console.log("Process done")
//  fs.readFile(filepath,"utf8",(err,item)=>{  
//             console.log(item)
//       })

// fs.appendFile(filepath, "  and file name is apple.txt",(err)=>{

//     if(!err) console.log("file is updated")
// })

// fs.unlinkSync(`${pathname}/fruit.txt`)


const express = require("express");
const fs = require("fs")
let users = require("./MOCK_DATA.json");
// const { Sequelize } = require("sequelize");
// console.log("rtttttt",Sequelize);

const app = express()
const PORT = 8000;
app.use(express.urlencoded({ extended: false }));


app.post("/api/users", (req, resp) => {
    const body = req.body;
    // users.push({ ...body, id: users.length + 1 });
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {

    //     return resp.json({ status: "sucsess", id: users.length })
    // });


});




app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);


    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const deletedUser = users.splice(userIndex, 1)[0];

    console.log(deletedUser)

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        console.log(users)
        if (err) {
            return res.status(500).json({ success: false, message: "Failed to save changes." });
        }
        res.json({ success: true, message: 'User deleted successfully', deletedUser });
    });
});
app.get("/api/users", (req, resp) => {

    if (req?.query?.SEARCH) {
        const seach=req?.query?.SEARCH.toLowerCase()
        users = users.filter(user => {
            const first_name = user.first_name.toLowerCase()
            // console.log(first_name)
            if (first_name.includes(seach)) return true
            return false
        })

    }
    return resp.json(users);
})



app.listen(PORT, () => console.log(`server sterted at port:${PORT}`)) 