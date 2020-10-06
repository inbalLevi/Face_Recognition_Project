const express=require('express');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const Clarifai= require('clarifai');
const register=require('./controllers/register');



const app_api = new Clarifai.App({
    apiKey: 'a59b82f1f9004323a1e16811fb350bbd'
  });

const handleApiCall=(req,res)=>{
    app_api.models.predict(
        'c0c0ac362b03416da06ab3fa36fb58e3',req.body.input)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>res.status(400).json('unable to work with api'))
      
}

  


const db= knex({
        client: 'pg',
        connection: {
          host : '127.0.0.1',
          user : 'postgres',
          password : 'Ii123456',
          database : 'face_recognition'
        }
      });




const app=express();

app.use(express.json());
app.use(cors());

const database={
    users:[
        {
            id:'123',
            name:'Inbal',
            password:'cookies',
            email:'Inbalevi@gmail.com',
            entries:0,
            joined:new Date()
        },
        {
            id:'124',
            name:'Dor',
            password:'banana',
            email:'Dorlevi@gmail.com',
            entries:0,
            joined:new Date()
        }
       
    ],
    login:[
        {
            id:'987',
            hash:'',
            email:'Inbalevi@gmail.com'

        }
    ]
}

app.get('/',(req,res)=>{
    res.send(database.users);
})

app.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).json('incorrect from submission');
     }
 db.select('email','hash').from('login')
 .where('email', '=', email)
 .then(data=>{
     const isValid= bcrypt.compareSync(password,data[0].hash);
     if(isValid){
         return db.select('*').from('users')
         .where('email','=',email)
         .then(user=>{
            res.json(user[0])
         })
         .catch(err=>res.status(400).json('unable to get user'))
        }else{
            res.status(400).json('wrong credentials')

        }
 })
 .catch(err=>res.status(400).json('wrong credentials'))
})


app.post('/register',(req,res)=>{ register.handleRegister(req,res,db,bcrypt)})
   

app.get('/profile/:id',(req,res)=>{
    const {id}=req.params;
  
    db.select('*').from('users').where({id:id})
    .then(user=>{
        if(user.length){
            res.json(user[0])
        } else{
            res.status(400).json('Not found')
        }  
    })
    .catch(err=>res.status(400).json('error getting user'))
   
})


app.put('/image',(req,res)=>{
    const {id}=req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    })
    .catch(err=>res.status(400).json('unable to get entries'))

})


app.post('/imageurl',(req,res)=>{
    handleApiCall(req,res)
})


app.listen(5000,()=>{
    console.log('app is running on port 5000');
})



/* 
/-->res=this is working
/signin-->POST success/fail
/register-->POST =user
/profile/:userId -->GET=user
/image-->PUT-->user


*/