const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 

app.listen(process.env.PORT||3000,function(){
    console.log("Listening on port 3000!" +__dirname);
})
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.get("/failed",function(req,res){
    res.redirect("/")
})
app.get("/success",function(req,res){
    res.redirect("/");
})
app.post("/",function(req,res){
    var fstname = req.body.fname;
    var lstname = req.body.lname;
    var email = req.body.mail;
   
    var data ={
        members: [{
            email_address: email,
            merge_fields:{
                FNAME: fstname,
                LNAME:  lstname,
            },
            status: "subscribed",
        }]
    };
    var JSONData =JSON.stringify(data);
var options={
    url: "https://us14.api.mailchimp.com/3.0/lists/6a6347ee55",
    method: "POST",
    headers:{
        "Authorization":"ankitfake913 d4e7a3dcec30d6db5a99b671cfc2f249-us14"
    },
    body: JSONData,
}

request(options, function(error, response, body){
    if(error){
        res.sendFile(__dirname+"/failure.html");
        console.log(error);
    }
    else{
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
            console.log(response.statusCode);
        }
    }  

})
})

//d4e7a3dcec30d6db5a99b671cfc2f249-us14
//6a6347ee55