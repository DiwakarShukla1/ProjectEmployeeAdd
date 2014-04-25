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
			$http.get('/getParrentName?level='+emp.Level)
			.success(function(data,status,headers,config){
				$scope.parrent=data;
				$scope.flag=true;
			}).error(function(data,status,headers,config){
				window.alert("No Parrent");
			});
		}else{
			$scope.flag=false;
		}
	}
});
