const express = require("express");
const bodyParser = require( "body-parser");
const bcrypt = require( "bcrypt-nodejs");
var cors = require('cors');
var knex = require('knex') 
var register = require('./controllers/register');
var signin = require('./controllers/signin') 
var profile = require('./controllers/signin') 
var image = require('./controllers/image') 



const db = knex({
  client: 'pg',
  connection: {
  	connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) =>{
	res.send('It is working');
})

app.post('/signin', (req, res) =>{signin.handleSignIn(req, res, db, bcrypt )})

app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)})


app.listen(process.env.PORT || 300, ()=> {
	console.log(`App is about to start running on port ${process.env.PORT}`);
})

