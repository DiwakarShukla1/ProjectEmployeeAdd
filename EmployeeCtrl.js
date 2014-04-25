angular.module("Employee",[])
.controller("EmployeeCtrl",function($scope){
	$scope.emp={};
	$scope.flag=false;

	$scope.addEmployee=function(){
		console.log(JSON.stringify($scope.emp));
		console.log("Added Successfully.....");
	}
	
	$scope.change=function(){
		if($scope.emp.Level!="2"){
			$scope.flag=true;
			console.log("Not 2.......");
		}else{
			$scope.flag=false;
		}
	}
});