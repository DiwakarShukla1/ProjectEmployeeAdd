angular.module("Employee",[])
.controller("EmployeeCtrl",function($scope){
	$scope.emp={};
	$scope.flag=false;

	$scope.addEmployee=function(){
		window.alert(JSON.stringify($scope.emp));
		window.alert("Added Successfully.....");
	}
	
	$scope.change=function(){
		if($scope.emp.Level!="2"){
			$scope.flag=true;
		}else{
			$scope.flag=false;
		}
	}
});