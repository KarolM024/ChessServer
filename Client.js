const axios = require('axios');
const { errorMonitor } = require('ws');
const serverPort = 3000; 

async function loginToServer(data) {
    const response = "";
    response = await axios.post('http://localhost:'+serverPort+'/login', data)
    console.log("odpowidź od serwera: "+ response.data);
    console.log(response.data.conectionID);
}
async function sendDataToServer(data) {
    try{
        console.log('http://localhost:'+serverPort+'/createAcount');
        const response = "";
        response = await axios.post('http://localhost:'+serverPort+'/login',data);
        console.log("odpowidź od serwera: "+ response.data);
        console.log(response.data.conectionID);

        // response = await axios.post('http://localhost:'+serverPort+'/server',data);
        
        // console.log("odpowidź od serwera: "+ response.data);
        // console.log(response.data.conectionID);
    }catch(error){
        console.error("Błąd podczas wysyłania danych: "+ error );
    }
}
clientDataToSave = {
    "ID": "1",
    "conectionID" : 1,
    "data": {
        "id": "1",
        "name" : "aaaa",
        "player1" : "bbb",
        "player2" : "ccc",
        "moves" : ["a1", "a2", "a3", "a4", "a5", "a6", "a7"],
        "player1Time" : 10,
        "player2Time" : 11,        
    }
}
data = {

    "id": "1",
    "name" : "aaaa",
    "player1" : "bbb",
    "player2" : "ccc",
    "moves" : ["a1", "a2", "a3", "a4", "a5", "a6", "a7"],
    "player1Time" : 10,
    "player2Time" : 11,
}
loginData = {
    "name" : "Name1",
    "login" : "login1",
    "password" : "1234",   
}
loginToServer(loginData);
// sendDataToServer(clientDataToSave);
sendDataToServer(clientDataToSave);
