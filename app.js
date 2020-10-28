const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('hello.ejs', {message: '<strong>強調表示</strong>'});
});

app.listen(3000);