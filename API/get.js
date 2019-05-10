var express = require('express');
var app = express();
var fs=require("fs");

app.use(express.static('public'));
app.get('/', (req, res)=> {
   res.sendFile(__dirname+"/login.html" );
});

app.get('/process_get',(req, res)=> {
   response = {
      FirstName:req.query.firstname,
      LastName:req.query.lastname,
      FatherName:req.query.fathername,
      MotherName:req.query.mothername,
      DOB:req.query.dob

   };
   console.log(response);
   fs.readFile(__dirname+"/emailpassword.json",(err,data)=>{
      alldata=JSON.parse(data)
      for (var i of alldata){
         if (response.FirstName == i.FirstName){
            return res.send("<h1>Hey, "+response.FirstName+", Your detail is already collected.");
         }else{
            alldata.push(response)
            fs.writeFile(__dirname+"/emailpassword.json",JSON.stringify(alldata,null,2))
            return res.send("<h1>Hey, "+response.FirstName+", Your detail is collected.");
         }
      }
      
   })
   
})
app.get('/all', (req, res)=> {
   res.sendFile(__dirname+"/emailpassword.json");
});
app.listen(5252 )