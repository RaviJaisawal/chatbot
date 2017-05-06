"use strict"

const express = require('express')
const bodyparser= require('body-parser')
const request =  require('request')

const app = express();

app.set('port',(process.env.PORT || 3000))


app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

var token = "";
app.get('/',function(req,res,next){
   res.send('This is chatbot');
})

app.get('/webhook/',function(req,res,next){
   if (req.query['hub.verify_token'] === 'googlecoder') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token!');
})

app.post('/webhook/',function(req,res,next){
    let  messaging_events =  req.body.entry[0].messaging

    for(let i=0;i<messing_events.lenght;i++){
        let event =  messaging_events[i]
        let sender = event.sender.id
        if(event.message && event.message.text){
            let text = event.message.text
            sendText(sender,"text echo: " +text.substring(0,10));

        }
    }
    res.sendStatus(200);
})

function sendText(sender,text){
    let messageData = { text : text};

    request({
        url:"https://graph.facebook.com/v2.6/memessages/",
        qs  : {access_token:token},
        method :"POST",
        json :{
            recipient :{id:sender},
            message : messageData
        }
    },function(error,response,body){
         if(error){
            console.log("sending error " + error);
         }
         else if(response.body.error){
             console.log("responce body error");
         }
    })
}

app.listen(app.get('port'),function(){
   console.log('server is listeing running');
})

