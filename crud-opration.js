const express = require("express");
const fs = require("fs")
let users = require("./MOCK_DATA.json");
// const { Sequelize } = require("sequelize");
// console.log("rtttttt",Sequelize);

const app = express()
const PORT = 8000;
app.use(express.urlencoded({ extended: false }));



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
