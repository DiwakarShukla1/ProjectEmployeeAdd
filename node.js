var express = require('express.io');
var couchbase = require('couchbase');
var db = new couchbase.Connection({host: 'http://ec2-54-187-152-26.us-west-2.compute.amazonaws.com:8091', bucket: 'updata'});
var app = express().http().io();


app.use(express.bodyParser());
app.use(express.static('./clientSide'));
//app.use(express.static(path.join(__dirname, 'clientSide')));
app.use(express.cookieParser());
app.use(express.session({ secret: 'abc' }));


app.get('/',function(req,res){
	res.end("ok");
        //res.render("./clientSide/index.html");
});

app.listen(9003);
console.log('Express server started on port 9003');

app.get('/getParrentName/:level',function(req,res){
	console.log(req.params.level);
	var Name="ByLevel2",VName="SearchByLevel2";
	if(req.params.level=="4"){
		Name="ByLevel3";
		VName="SearchByLevel3";
	}
	var query=db.view(Name,VName);
	query.query(function(err, results) { 	 
	for(i in results)
    		console.log(results[i]);
		res.json(results);
	});	
});

app.post('/addEmployee',function(req,res){
	var newEmployee=req.body;
	if(newEmployee.Level=="2"){
		newEmployee.allParrent=["ranadeydata@gmail.com"];
		newEmployee.Child=[];
		newEmployee.Type="emp";
		db.add(newEmployee.Email,newEmployee,function(err,res){
			console.log(JSON.stringify(res));
		});
	}else{
		db.get(newEmployee.Parrent,function(err,res){
			var newRes=getValue(res);
			newRes.allParrent.push(newEmployee.Parrent);
			newEmployee.allParrent=getSet(newRes.allParrent);
			newEmployee.Child=[];
			newEmployee.Type="emp";
			var newRes1=getValue(res);
			newRes1.Child.push(newEmployee.Email);
			db.add(newEmployee.Email,newEmployee,function(err,res1){
				console.log(JSON.stringify(res1));
			});
			db.set(newRes1.Email,newRes1,function(err,res1){
				console.log(JSON.stringify(res1));
			});		
		})
	}
	res.end("Chal be");
});

	function getValue(doc){
                while(!doc.Name){
                        doc=doc.value;
                }
                 return doc;
        }

function getSet(newArray1){
	var a=[];
	for(var i in newArray1){
		if(a.indexOf(newArray1[i])===-1){
			a.push(newArray1[i]);
		}
	}
	return a;
}

