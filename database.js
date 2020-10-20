
/*
SESSION IS not implemented Yet
*/

const mongoose = require('mongoose');
const express = require("express");
const bodyparser = require("body-parser");
const bcrypt = require('bcrypt');
const app  = express();

mongoose.connect("mongodb://localhost:27017/football" , {useNewUrlParser : true , useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended  : true}));
/*app.use(require("express-session")({
  secret:"Rusty is the best og in the world",
  resave: false,
  saveUninitialized: false
}));*/

app.use(express.static(__dirname + '/'));

///app.set('view engine','ejs');

app.get("/",function(req,res){
  res.sendFile(__dirname+"/admin.html");
});

app.post("/", async function(req,res){
  var rname = req.body.namer;
  var remail= req.body.emailr;
  var rpass = req.body.passr;

  var lemail = req.body.nameL;
  var lpass = req.body.passL;

  
const regSchema = new mongoose.Schema(
  {
      username : {
        type :String,
        required : [true,"Please Add your Name "]
      },
      email :{
        type :String,
        required : [true,"Please Add your Email "]
      },
      pass: { //validation
        type :String,
        required : true 
      }
  });

  const user = mongoose.model("User",regSchema);
  let duplicate = await user.findOne({ email: remail});
  if (remail && rname &&rpass ){
  if (duplicate) {
        return res.status(400).send('That user already exisits!');
  }else{
    bcrypt.hash(rpass, 10, function(err, hash) {
      const newuser =new user({
        username: rname,
        email : remail,
        pass : hash
      });
      newuser.save();
    });    
    res.send("DONE");
  }
  }else{
    ///login
    
    let duplicate = await user.findOne({ email: lemail});

    if(duplicate){
      
      const isValid = await bcrypt.compare(lpass, duplicate.pass);
      if(isValid){
        console.log("Logged In");
      }else{
        console.log("Give Correct Pass");
      }
    
    }else{
      res.send("Please Register First");
    }


  }




});


app.listen(3000,function(){
  console.log("Run");
});



//newuser.save();  -> commented out if we dont want to save that user again n again by saving the file

/*
  >>>reading something from database
  user.find(function(err,ans){
    if(err){
      console.log(err);
    }else{
      //console.log(ans);
      //mongoose.connection.close();-> it is a good practice to
      //close the db after all works done

      ans.forEach(function(i){
        console.log(i.name);
      });

    }
  });

*/

/*
>>Data update
  user.updateOne({_id : "ekta random thakbe table a dekhle bujhbo"},{name : "def"},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("successful");
    }
  });

*/

/*
  >>>delete 

  user.deleteOne({name : "abc"},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("successful");
    }
  });

*/
/*
  >>DBMS relation
  ss tulsi 19/10/2020
*/