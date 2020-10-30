'use strict';

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  let array= getData();
  res.render('index', {message_list: array});
});

app.post('/', (req, res) =>{
  let array = getData();

  if(req.body.message.length > 0) {
    array.push(req.body.message);
    // 配列を改行コードで区切って結合
    fs.writeFileSync("data.txt", array.join("\r\n"));
  }
  res.render('index', {message_list: array});
})

function getData() {
  let data = fs.readFileSync("data.txt", {encoding: "utf-8"});
  let array = [];
  if(data.length > 0) {
    array = data.split(/\r\n|\r|\n/);
  }
  return array;
}

app.listen(3000);