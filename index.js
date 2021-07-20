const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

// for using mysql
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'dntwlak123',
  database: 'CRUD_tuto',
});


// cors policy ~~~
app.use(cors());

// request from front end
app.use(express.json());

// use body-parser
app.use(bodyParser.urlencoded({extended: true}));


// CRUD functions

// get information
app.get('/api/get', (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews"; // sql 명령 to get information from db
  db.query(sqlSelect, (err, result) => {
    res.send(result );
  });
})

// send to database
app.post('/api/insert', (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUE (?,?)"; // sql 명령 to send information to db
  
  // if contexts are empty it's not working,,,, but why it's happening..
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
      console.log(result);
    });
});


// delete
app.delete('/api/delete/:movieName', (req, res) => {
  const name = req.params.movieName;
  const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?"; // sql 명령 to delete information from db
  
  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
  });

})

// update
app.put('/api/update', (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;

  const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName =?"; // sql 명령 to update information from db
  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) console.log(err);
  });

})

// server port
app.listen(3001, () => {
  console.log('running on port 3001');
});