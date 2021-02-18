//Importing Dependencies---
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex');
//-------------------------

//Importing Controller Functions From Controller Folder---
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
//--------------------------------------------------------


const app = express();


const db = knex({
	  client: 'pg',
  	connection: {
    host : '127.0.0.1',
    port : '5433',
    user : 'postgres',
    password : 'PAPU',
    database : 'face-recognition-app'}
});

//db.select('*').from('users');

app.use(express.json());
app.use(cors());


//temp database-----
// const database = {
// 	users:[
// 		{
// 			id:'120',
// 			name: 'john wick',
// 			email: "john@gmail.com",
// 			password: "12345",
// 			entries: 0,
// 			joined: new Date()
// 		},
// 		{
// 			id:'121',
// 			name: 'papu',
// 			email: 'papu@gmail.com',
// 			password: '54321',
// 			entries: 0,
// 			joined: new Date()
// 		}		
// 	]
// };


//~~~~~~~~~~~~~~~~~~~~~~All Requests Are Mentioned Below~~~~~~~~~~~~~~~~~~~~~~




//Enter 127.0.0.1:3001 in browser for testing if server is running properly---
app.get('/', (req, res)=>{
	res.send("This is Face Recognition App's Server, listening to requests!");
})





//SignIn the user by comparing hash & email---
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));




//Registers the user to database---
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));




//Calls clarifai API & send data to front-end---
app.post('/facebox', (req, res) => image.handleApiCall(req, res));




//Update the number of entries of user---
app.put('/image', (req, res) => image.handleImage(req, res, db));




//Gets Profile by given ID---
app.get('/profile/:id', (req, res) =>  profile.handleProfile(req, res, db));




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~





//Server Starter at Port 3001---
app.listen(3001, ()=>{console.log('Running at 3001 speed')});