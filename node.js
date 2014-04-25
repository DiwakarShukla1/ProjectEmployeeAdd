var express = require('express.io');
var couchbase = require('couchbase');
var db = new couchbase.Connection({host: 'http://ec2-54-187-111-33.us-west-2.compute.amazonaws.com:8091', bucket: 'ranadeyData'});
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

app.get('/getParrentName',function(req,res){
	console.log("getParrentName");
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
		db.add(newEmployee.Email,newEmployee,function(err,res){
			console.log(JSON.stringify(res));
		});
	}else{
		db.get(newEmployee.Parrent,function(err,res){
			res.push(newEmployee.Parrent);
			newEmployee.allParrent=res;
			db.add(newEmployee.Email,newEmployee,function(err,res1){
				console.log(JSON.stringify(res1));
			});		
		})
	}
});
