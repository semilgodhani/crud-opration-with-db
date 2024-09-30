const express = require("express");
const app = express();
const PORT = 3000;
const connection = require("./postsql")
const bodyParser = require("body-parser")
const user = require("./model/users");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'postgres',
    username: 'postgres',
    port: 5432,
    password: "semil##232499"
});

connection();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.post("/api/addusers", async (req, resp) => {

    const { firstName, lastName, age, city } = req.body;

    const currentDate = new Date();
    try {
        const res = await sequelize.query(
            `INSERT INTO public.users("firstName" , "lastName", "age","city" ,"createdAt", "updatedAt") VALUES (:firstName, :lastName, :age,:city, :createdAt, :updatedAt)`,
            {
                replacements: {
                    firstName,
                    lastName,
                    city,
                    age,
                    createdAt: currentDate,
                    updatedAt: currentDate,
                },
            }
        );
        resp.status(201).send({ message: "User created successfully", user: { firstName, lastName, age, city } });
    } catch (error) {
        console.error('Error inserting user:', error);
        resp.status(500).send({ message: "Error creating user", error: error.message });
    }
});


app.delete("/api/deleteuser", async (req, resp) => {
    const { id } = req.body;

    try {
        const result = await sequelize.query(
            `DELETE FROM public.users WHERE id = :id`,
            {
                replacements: { id },
            }
        );

        if (result[1] === 0) {
            return resp.status(404).send({ message: "User not found" });
        }

        resp.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        console.error('Error deleting user:', error);
        resp.status(500).send({ message: "Error deleting user", error: error.message });
    }
});

app.put("/api/updateUser", async (req, resp) => {
    const { firstnName, lastName, age, city, id } = req.body;
    const currentDate = new Date();

    try {
        const result = await sequelize.query(
            `UPDATE public.users SET "firstnName" = :${firstnName},"lastName" = :${
                lastName}, "city" = :${city}, age = :${age}, "updatedAt" = :${currentDate} WHERE id = :id`
         
        );


        if (result[1] === 0) {
            return resp.status(404).send({ message: "User not found" });
        }

        resp.status(200).send({ message: "User updated successfully" });
    } catch (error) {
        console.error('Error updating user:', error);
        resp.status(500).send({ message: "Error updating user", error: error.message });
    }
});


app.get("/api/users/getuser", async (req, resp) => {
    const city = req.query.city; // Extract city from query parameters

    if (!city) {
        return resp.status(400).send({ message: "City parameter is required" });
    }

    try {
        const result = await sequelize.query(
            `SELECT * FROM public.users WHERE city = :${city}`,
         
        );

        if (result.length === 0) {

            return resp.status(404).send({ message: `No users found from ${city}` });
        }

        resp.status(200).send(result[0]);
    } catch (error) {
        console.error('Error fetching users:', error);
        resp.status(500).send({ message: "Error fetching users", error: error.message });
    }
});


app.get("/api/users/getusers", async (req, resp) => {
    const lastName = req.query.lastName; 
    console.log(lastName)

    if (!lastName) {
        return resp.status(400).send({ message: "lastName parameter is required" });
    }

    try {
        const result = await sequelize.query(
            `SELECT * FROM public.users where "lastName" LIKE '%${lastName}%' `
         
        );

        if (result.length === 0) {

            return resp.status(404).send({ message: `No users found from ${lastName}` });
        }

        resp.status(200).send(result[0]);
    } catch (error) {
        console.error('Error fetching users:', error);
        resp.status(500).send({ message: "Error fetching users", error: error.message });
    }
});




//     console.log("OOOOOPOPPPPP");

//     // const createuser = user.build({ name: "parth" })
//     // const runQueries = async () => {
//     const res = await sequelize.query(`INSERT INTO public.users("user", "name", age,"createdAt","updatedAt") VALUES ('RRR111', 'SATISH1111', 29,'2024-09-20 08:23:00','2024-09-20 08:23:00')`);
//     console.log('Users:', res.rows);
//     // console.log('Inserted User:', newUser.rows[0]);
//     // }

//     // createuser.save()
//     //     resp.send(req.body)




app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})