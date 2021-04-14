const express = require('express')
const jwt = require('jsonwebtoken');
const cors = require('cors')
const app = express()
let _router = express.Router();
app.use(express.json())
// app.use(cors());
app.use(cors());


const pg = require('pg');
const cs = require('../server/database-confiq/config');
const { isValidAuth, checkAuth } = require('../server/auth/auth');
//app.use("/api", _router);

var client = new pg.Client(cs.cs);
client.connect();

app.post('/login', (req, res) => {


    const { username, password } = req.body.data;
    console.log("come", username, password);
    client.query("SELECT * FROM admin where username= $1 and password = $2", [username, password], (error, results) => {
        if (error) {
            throw error
        }
        var user = results.rows

        if (results.rowCount > 0) {
            console.log(user)
            const token = jwt.sign(
                { id: user.id, isAdmin: true },
                // process.env.JWT_SECRET,
                cs.JWT_SECRET_code,
                {
                    expiresIn: `${1000 * 60 * 30}ms`, //30 min
                }
            );
            // res.cookie('token', token, { httpOnly: true, maxAge: 60*30*1000 });
            res.status(200).json({ status: 'success', token });
        }
        else {
            res.status(401).json({ status: 'fail' });
            // res.json({ status: 'fail' });
        }
    })


})
app.use(isValidAuth);


app.get('/demo', (req, res) => {

    client.query("SELECT * FROM admin ", (error, results) => {
        if (error) {
            throw error
        }
        var user = results.rows
        console.log(user)

    })

    res.status(200).json({ status: 'ookkk' });


})


app.listen(3001, () => {
    console.log("Server started running!")
});

