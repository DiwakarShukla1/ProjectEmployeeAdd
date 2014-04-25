var express = require('express.io');
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

