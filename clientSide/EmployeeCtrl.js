angular.module("Employee",[])
.controller("EmployeeCtrl",function($scope,$http){
	$scope.emp={};
	$scope.flag=false;
	$scope.parrent=[];

	$scope.addEmployee=function(){
		window.alert(JSON.stringify($scope.emp));
		window.alert("Added Successfully.....");
		
		$http.post("/addEmployee",$scope.emp)
		.success(function(data,status,headers,config){
			window.alert("Ya Ya Ya......");
		}).error(function(data,status,headers,config){
			window.alert("Na Na Na......");
		});
	}
	
	$scope.change=function(){
		if($scope.emp.Level!="2"){
			//window.alert()
			$scope.flag=true;
			$http.get('/getParrentName/'+$scope.emp.Level)
			.success(function(data,status,headers,config){
				$scope.parrent=data;
				window.alert(data);
			}).error(function(data,status,headers,config){
				window.alert("No Parrent");
			});
		}else{
			$scope.flag=false;
		}
	}
});
