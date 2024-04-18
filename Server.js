const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const http = require('http');
const { validate } = require('webpack');
const MongodbPort  = 27017;
const ServerPort = 3000;
const app = express();


const mongodbloginToAcountSchema = new mongoose.Schema({
    login : Number,
    pasword : String,
})
const mongodbSchema = new mongoose.Schema({
    ID: Number,
    conectionID : Number,
    data : Object
    // [mongoose.Schema.Types.Array]// error array jest zły
})
const UserSchema = new mongoose.Schema({
    ID: Number,
    userName : Number,
    port : Number,
    lastLogin : Date
})
const User = mongoose.model('User', UserSchema);
const ServerConection = mongoose.model('ServerConection', mongodbloginToAcountSchema);

const dataFormUser = new mongoose.model('Data', UserSchema);
const ConectionToDataBase = mongoose.connect('mongodb://localhost/Chess', {useNewUrlParser: true, useOldUrlParser: true});

app.use(bodyParser.json());


// Server client 
// Włączenie serwera
app.listen(ServerPort, () =>{
    console.log("Włączenie serweru.");
    console.log("Nasłuchiwanie");
});

app.post('/login', async (req, res) =>{
    // name login password
    try{
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            console.log("aaaaaaaaaaaaaaaaa");
        });

        // await client.connect();
            // const dataBase = ServerConection.db('Chess');
            const dataBase = mongoose.connection.db('Chess');
            const collection = dataBase.collection('Users');
            const user = await collection.findOne({username});
            if(user){
                const match = await bcrypt.compare(password, user.password);

                if(match){
                    console.log("Login successful");
                }else{
                    console.log("Error in login or password.");
                }
            }else{
                console.log("User not found");
            }
            // client.close();
        }catch(e){
        console.log(e);
            res.status(500).send("ERROR in login.");
    }
});

// app.post('/login', (req, res) =>{
    // if (err) {
    //     res.status(500).send("ERROR in login.")
    // }else if(User){
    //     User.port = port;
    //     User.lastLogin = new Date();
    //     User.save();
    //     res.send("You have login ."); 
    // }else{
    //     const newUser = new User({id : 0,userName,port, lastLogin : new Date()});
    //     newUser.save(err => {
    //         if(err){
    //         res.status(500).send("Error in creating user");
    //         }  else{
    //             res.send("create");
    //         }
    //     });
    // }
// });

// End point który pobiera dane z portu POST do serewra 
app.post('/server', 
body("ID").isNumeric(),
body("conectionID").isNumeric(),
async (req, res) => {
    const error =  validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error : error.array()});
    }
// Zapis danych do bazy
    console.log(req.body);
    const newData = new dataFormUser(req.body);
    const result = await newData.save();
    res.json(result);
});

app.post('/createAcount', 
body("ID").isNumeric(),
body("conectionID").isNumeric(),
async (req, res) => {
    const error =  validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error : error.array()});
    }else{
        return mongodbCreateUser(client,req.name,res.login,req.password);
    }
// Zapis danych do bazy
});
// wysyłanie danych do klienta GET
app.get('/server', async (req, res) => {
    const data = new dataFormUser.find();
    res.json(data);
});

async function mongodbCreateUser(client, name,login, password) {
    try{

        const db = client.db("Chess")
        const collection = db.collection('Users');

        // Instert user to mongoDB

        const insert = {name: name, login: login, password: password}
        const result = await collection.insert(insert);
    }catch(e){
        console.log(e);
    }
}
function mongodbConect() {
    
}
function mongodbSetData(){

}
mongoose.connect('mongodb://localhost:27017/Chess',{
    useNewUrlParser: true, useUnifiedTopology: true
});    
// const server = http.createServer(function (req, res) {

//   })