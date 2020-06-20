const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const bcrypt=require('bcrypt-nodejs')
const cors=require('cors');
const knex = require('knex');
const register = require('./controller/register.js');
const signIn = require('./controller/signIn.js');
const profile = require('./controller/profile.js');
const image = require('./controller/image.js');
const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
});

app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{res.send()})
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})



app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})
app.post('/signin',(req,res)=>{signIn.handleSignIn(req,res,bcrypt,db)})
app.post('/register',(req,res)=>{register.handleRegister(req,res,bcrypt,db)})

app.listen(process.env.PORT || 3000,()=>{
	console.log(`app is running on port ${process.env.PORT}`);
})







