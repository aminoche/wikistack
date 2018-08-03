const express = require('express');
const morgan = require('morgan');
const html = require('html-template-tag');
const app = express();
const models = require('./models');

//logging middleware
app.use(morgan('dev'));
//Serves up static files
app.use(express.static(__dirname));
// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  console.log('Hello world');
  res.send(html`<!DOCTYPE html>
  <html>
  <head>
    <title>Hello World</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
  <h1><a>Hello world</a></h1>
  </body>
  </html>`);
});

models.db.authenticate().
then(() => {
  console.log('connected to the database');
})

const init = async () => {
  await models.db.sync({force: true});
  const PORT = 1337;
  app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
  });
};

init();
