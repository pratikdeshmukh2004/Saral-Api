var express = require("express");
var fs = require("fs");
var app = express();
app.use(express.json());
// **********Task-1********
app.get("/courses", (req, res)=>{
    fs.readFile(__dirname + "/task1jsc.json", (err, data)=>{
        res.send(data);
        console.log("success")
    })
})
// ************Task-2*******
app.post("/courses", (req, res)=>{
    var allcourses = req.body;
    fs.readFile(__dirname + "/task1jsc.json",(err,data)=>{
        var list1=JSON.parse(data);
        allcourses.id=list1.length+1
        list1.push(allcourses);
        fs.writeFile(__dirname+"/task1jsc.json",JSON.stringify(list1,null,2))
        res.send(list1)
    });
});
// ************Task-3***********
app.get("/courses/:id",(req,res)=>{
    var id=req.params.id;    
   fs.readFile(__dirname + "/task1jsc.json", (err, data)=>{
       var data2 = JSON.parse(data);
       var id2=data2.length
        if (id<=id2){
            for (i of data2){
                if (i.id==id){
                    res.send(i)
                    break
                }
            }
        }else{
            var dic={"errorMsg": "Di gayi courseId ko check karo. Galat hai."};
            res.send(dic);
        }
   })  
});
// *******************Task-4***************
app.put("/courses/:id",(req,res)=>{
    var id=req.params.id;
    var dic=req.body
    fs.readFile(__dirname + "/task1jsc.json", (err, data)=>{
       var data2 = JSON.parse(data);
       var writedata=data2
       for (i of data2){
           if (i.id==id){
                i.name=dic["name"];
                i.description=dic["description"]
                console.log(writedata);
                
                fs.writeFile(__dirname+"/task1jsc.json",JSON.stringify(writedata,null,2))
                return res.json(i)
           }
       }
   });
});
// ***********Task-5**********
app.get("/courses/:id/exercise",(req,res)=>{
    var id=req.params.id;
    var alllist=[];
    console.log("your code is running...")
    fs.readFile("/home/pratik/Desktop/js/express/task2js.json",(err,data)=>{
        data=JSON.parse(data)
        for (var i of data){
            j=i["exercises"][0]
            if (j.courseId==id){
                return res.send(i["exercises"])
            };
        };
        return res.send({"errorMsg": "Di gayi courseId ko check karo. Galat hai."})
    });
    
});
// ************Task-6*********
app.post("/courses/:id/exercise",(req,res)=>{
    var id=req.params.id;
    var sdata=req.body;
    var alllist=[];
    console.log("your code is running...")
    fs.readFile("/home/pratik/Desktop/js/express/task2js.json",(err,data)=>{
        var data=JSON.parse(data)     
        for (var i of data){
            j=i["exercises"][0]
            if (j.courseId==id){
                var ja={}
                ja.name=sdata["name"]
                ja.content=sdata["content"]
                ja.hint=sdata["hint"]
                ja.id=i["exercises"].length+1
                ja.courseId=id
                i["exercises"].push(ja)                 
                fs.writeFile("/home/pratik/Desktop/js/express/task2js.json",JSON.stringify(data,null,2))
            };
        };
        res.send(ja)
    });
});
// ***********Task-7***********
app.get("/courses/:id1/exercise/:id2",(req,res)=>{
    var id1=req.params.id1;
    var id2=req.params.id2;
    var alllist=[];
    console.log("your code is running...")
    fs.readFile("/home/pratik/Desktop/js/express/task2js.json",(err,data)=>{
        data=JSON.parse(data)
        for (var i of data){
            for (var j of i.exercises){
                if (j.id==id2){
                    if (j.courseId==id1){
                        j["id"]=id2
                        return res.send(j)
                    };
                };
            };
        };
        return res.send({"errorMsg": "Di gayi courseId ko check karo. Galat hai."}) 
    });
    
});
// **********Task-8*********
app.put("/courses/:id1/exercise/:id2",(req,res)=>{
    var id1=req.params.id1;
    var id2=req.params.id2;
    var serdata=req.body;
    var alllist=[];
    console.log("your code is running...")
    fs.readFile("/home/pratik/Desktop/js/express/task2js.json",(err,data)=>{
        data=JSON.parse(data)
        for (var i of data){
            for (var j of i.exercises){
                if (j.id==id2){
                    if (j.courseId==id1){
                        j.name=serdata["name"]
                        j.content=serdata["content"]
                        j.hint=serdata["hint"]
                        fs.writeFile("/home/pratik/Desktop/js/express/task2js.json",JSON.stringify(data,null,2))
                        return res.send(j)
                    };
                };
            };
        };
        return res.send({"errorMsg": "Di gayi courseId ko check karo. Galat hai."}) 
    });
    
});
// ***********Task-9*************
app.get("/courses/:c_id/exercise/:e_id/submissions",(req,res)=>{
    var id1=req.params.c_id;
    var id2=req.params.e_id;
    var alllist=[];
    console.log("your code is running...")
    fs.readFile("/home/pratik/Desktop/js/express/task3js.json",(err,data)=>{
        data=JSON.parse(data)
        var list=[]
        for (var i of data){
            var exercise=i["exercise"];
            for (var j of exercise){
                if (j.courseId==id1){
                    var exe=j.submission
                    if (j.exerciseId==id2){
                        for (var k of exe){
                            k["courseId"]=j.courseId
                            k["exerciseId"]=j.exerciseId
                            list.push(k)
                            console.log(list);
                        }
                    }
                }
                
            }
        }
        if (list.length>0){
            return res.send(list)
        }
        res.send({"errorMsg": "Check your courseId or exerciseId. Kuch galat diya hai aapne."})
    });   
});
// *****************Task-10**********
app.post("/courses/:c_id/exercise/:e_id/submissions",(req,res)=>{
    var id1=req.params.c_id;
    var id2=req.params.e_id;
    var sdata=req.body;
    console.log("your code is running...")
    fs.readFile("/home/pratik/Desktop/js/express/task3js.json",(err,data)=>{
        data=JSON.parse(data)
        for (var i of data){
            var exercise=i["exercise"];
            for (var j of exercise){
                if (j.courseId==id1){
                    if (j.exerciseId==id2){
                        sdata["id"]=j.submission.length+1
                        j.submission.push(sdata)
                        fs.writeFile("/home/pratik/Desktop/js/express/task3js.json",JSON.stringify(data,null,2))
                        sdata["courseid"]=j.courseId
                        sdata["exerciseid"]=i.exerciseId
                        return res.send(sdata)
                    }
                }
                
            }
        }
        res.end({"errorMsg": "Check your courseId or exerciseId. Kuch galat diya hai aapne."})
    });
});
app.listen(2222)
