const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
var bodyParser = require("body-parser");
const app = express()
let _router = express.Router();
app.use(express.json())
app.use(cors());



//for business logic
const AllRisk = require('./Business_logic/AllRisk');

//for post method
app.use(express.static("public"));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


const db = mysql.createConnection({
    // user: "root",
    // host: "localhost",
    // password: "jarvis",
    // database: "internship",
    // host: 3306,
    host: 'remotemysql.com',

    // Get the User for DB from Environment or use default
    user: 'W9jGKSIVO9',

    // Get the Password for DB from Environment or use default
    password: 'Oy0t3OtVFu',

    // Get the Database from Environment or use default
    database: 'W9jGKSIVO9',

    dateStrings: 'date',
});


app.use("/api", _router);

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM user WHERE username = ? and password = ? ", [username, password], (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        if (result.length > 0) {
            res.send(result);
        }
        else {
            res.send({ message: "Wrong username/password combination" })
        }
    })

})

_router.get('/getAllRisk', async (_request, _response) => {

    //console.log('callling...');
    let result = await AllRisk();

    _response.status(200)
        .send({ data: result });
});

app.post('/getSingleDepartment', (req, res) => {
    const deptId = req.body.deptId;
    db.query("SELECT dept_name, threshold from department where dept_id = ?;", deptId, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    })
})

app.get('/getRecords', (req, res) => {
    db.query("SELECT employee.emp_id, emp_name, DATE(start_date) as start_date, DATE(end_date) as end_date from employee, leaves where employee.emp_id = leaves.emp_id;", (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result)
        }
    })
})

app.get('/getDepartments', (req, res) => {
    db.query("SELECT dept_id, dept_name FROM department;", (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result)
        }
    })
})

app.post('/getEmployeeData', (req, res) => {
    const deptId = req.body.deptId;
    db.query("SELECT employee.emp_id,emp_name FROM emp_dept,employee where dept_id=? and emp_dept.emp_id = employee.emp_id;", deptId, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result)
        }
    })
})

app.listen(3001, () => {
    console.log("Server started running!")
});

