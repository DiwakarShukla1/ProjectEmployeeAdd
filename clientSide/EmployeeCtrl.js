angular.module("Employee",[])
.controller("EmployeeCtrl",function($scope,$http){
	$scope.emp={};
	$scope.flag=false;

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
			$scope.flag=true;
		}else{
			$scope.flag=false;
		}
	}
});
