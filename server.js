const express = require('express');
const app = express();
const port = 5149;
const database=require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser')

app.use(cookieParser());
let connection=database.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:'Entertainment'
});
app.use(express.static('public'));
app.set("view engine","ejs");
var urlencodedParser=bodyParser.urlencoded({extended:false});
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.json());

const data = require('./data.json');
connection.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("database connected")
    }
});


app.get('/home',(req,res)=>{
  const myCookie = req.cookies['Cookie token name'];
  if(myCookie){
    var sql="SELECT * FROM storedata";
        connection.query(sql,(err,resl)=>{
          if(err){
            console.log(err)
          }
          else{
            let result=resl;
              res.render('index',{result:result}); 
          }
        })
  }
  else{
    res.render('home');
  }
})


app.get('/index',(req,res)=>{
  const myCookie = req.cookies['Cookie token name'];
  console.log(data.length)
  var sql="SELECT * FROM storedata";
        connection.query(sql,(err,resl)=>{
          if(err){
            console.log(err)
          }
          else{
            let result=resl;
            if(myCookie){
              res.render('index',{result:result}); 
            }
            else{
              res.render('home')
            }
             
          }
        })
    });

   
 app.post('/renderpage',(req,res)=>{
    var sql="SELECT * FROM getusers";
    connection.query(sql,(err,resl)=>{
      if(err){
        console.log(err)
      }
      else{
        let result=resl;
        res.json(result);
      }
    })
 })

 app.post('/setbookmark',(req,res)=>{
   console.log(req.body);
   let username=req.body.title;
   let title=req.body.username;
   var sql=`insert into bookmarks (useremail, title) values ('${username}','${title}')`;
   connection.query(sql,(err,result)=>{
   })
 });

 app.post('/showbookmarks',(req,res)=>{
  const oneDay = 24 * 60 * 60 * 1000;
    const expiresdate = new Date(Date.now() + oneDay);
        res.cookie(`Cookie token name`,`encrypted cookie string Value`,{
        expires: expiresdate,
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    }); 
    res.json("resl");
   })
 

 app.post('/bookmarks',(req,res)=>{
    let username=req.body.email;
    console.log(username);
    var mysql=`SELECT * FROM bookmarks WHERE title= '${username}'`;
    connection.query(mysql,(err,resl)=>{
        console.log(resl)
     res.json(resl);
    })
 })
 app.post('/removebookmark',(req,res)=>{
    console.log(req.body);
    let username=req.body.title;
    let title=req.body.username;
    let sql=`DELETE FROM bookmarks WHERE useremail='${username}' AND title='${title}'`;
    connection.query(sql,(err,result)=>{
    })
  })

 app.post('/pushvalues',(req,res)=>{
    console.log(req.body);
    let email=req.body.email;
    let password=req.body.password;
    console.log(email);
    console.log(password);
    const oneDay = 24 * 60 * 60 * 1000;
    const expiresdate = new Date(Date.now() + oneDay);
        res.cookie(`Cookie token name`,`encrypted cookie string Value`,{
        expires: expiresdate,
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    }); 
        var sql=`insert into getusers (useremail, password) values ('${email}', '${password}')`;
        connection.query(sql,(err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json('mani');
                console.log(result);
            }
     })
 })

app.post("/logout",(req,res)=>{
  res.clearCookie(`Cookie token name`);
  return res.redirect("/home");
})


app.listen(port,() =>console.log("listening server",port));
