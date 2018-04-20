const express = require('express');
const pg = require('pg');
const consolidate = require('consolidate');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const pool = new pg.Pool({
host:'localhost',
port: "5432",
database: 'cadb',
user: 'causer',
password:'causer'
});
pool.connect();

pool.query(`CREATE TABLE IF NOT EXISTS Sellers(
  SellerId SERIAL,
  Sname VARCHAR NOT NULL,
  Semail VARCHAR PRIMARY KEY NOT NULL,
  Susername VARCHAR NOT NULL unique,
  Spassword VARCHAR NOT NULL
)`
);

pool.query(`CREATE TABLE IF NOT EXISTS Buyers(
  BuyerId SERIAL,
  Bname VARCHAR NOT NULL,
  Bemail VARCHAR PRIMARY KEY NOT NULL,
  Busername VARCHAR NOT NULL unique,
  Bpassword VARCHAR NOT NULL
)`
);




app.set('views', './templates');
app.engine('html', consolidate.nunjucks);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', function(req, res){
  res.render('index.html');
});

app.post('/signup', function(req,res){
   // if ( req.body.usertype = 'Seller') {
      pool.query(`
        INSERT INTO sellers (semail, spassword, sname, susername)
        VALUES ('${req.body.Smail}', '${req.body.Spassword}', '${req.body.Sname}', '${req.body.Susername}');
      `)

  //  } else if( req.body.usertype = 'Customer') {
    //  pool.query(`
      //  INSERT INTO Buyers (Bemail, Bpassword, Bname, Susername)
        //VALUES ('${req.body.Semail}', '${req.body.Spassword}', '${req.body.Sname}', '${req.body.Susername}');
      //`)}
});

/*.then(function() {
  pool.query(`
    SELECT * FROM cadb WHERE email = '${req.body.email}';`
  ).then(function(results) {
    const user = results.rows[0];

    res.redirect('/profile//' + user.email);
  });
});
});
*/
//connect nah ang .then if naa nay html sunod sa sign up








app.listen(9000, function(){console.log('Server is now running at port 9000');});
