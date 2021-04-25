
var moment = require('moment');
const pg = require('pg');
const cs = require('../../database-confiq/config');

module.exports = async () => {
    //async function calculate() {

    var data = [];
    var client = new pg.Client(cs.cs);
    client.connect();

    //extract current date
    var today = new Date();
    var currentDate = today.toISOString().slice(0, 10)

    await client.query('SELECT * FROM field_staff WHERE id NOT IN (SELECT field_staff_id FROM leave where ($1) between start_date and end_date )', [currentDate], (error, results) => {
        // client.query("SELECT * FROM field_staff", (error, results) => {
        if (error) {
            throw error
        }

        // var 1 = results.rows;
        data[0] = results.rows;
        //  console.log(results.rows);
        //  console.log(data)
    })

    await client.query('select count(id) from borrower where category = ($1)', [1], (error, results) => {
        if (error) {
            throw error
        }

        data[1] = results.rows[0];
        // console.log(results.rows[0]);
    })

    await client.query('select count(allocation_date) from allocation where allocation_date = ($1)', [currentDate], (error, results) => {

        if (error) {
            throw error
        }

        data[2] = results.rows[0];
        console.log(data);
        return data;
    })

    //console.log(data);
}
//calculate()

//query
//   client.query('SELECT * FROM field_staff WHERE id NOT IN (SELECT field_staff_id FROM leave where start_date <="' + currentDate + '" and end_date >="' + currentDate + '")'