var module=angular.module("adminApp",[]);
module.controller('adminCtrl',function($scope,$http){
	$scope.newProduct={};
	$scope.button={add:"Додати товар",
	cansel:"Очистити"}

	$scope.addProductAdmin=function(){
		if($scope.button.add=="Додати товар"){
			$http.post("/addproduct",$scope.newProduct).then(function(data){
				console.log(data);
				$scope.newProduct={};
				$scope.loadProducts()
			})
		}
		else{
			$http.post('editproduct',$scope.newProduct).then(function(data){
				$scope.newProduct={};
				$scope.loadProducts()
			})
		}
	};
	
	$scope.removeProduct=function(item){
		$http.post("/removeproduct",item).then(function(data){
			console.log(data);
			$scope.loadProducts()
		})
	};

	$scope.editProduct=function(item){
		$scope.newProduct=item;
		$scope.button={add:"Редагувати товар",
	cansel:"Скасувати"}

	};
	$scope.cansel=function(){
		if($scope.button.add=="Редагувати товар")
			$scope.button={add:"Додати товар",
			cansel:"Очистити"}
		$scope.newProduct={};
		$scope.loadProducts()
	};
	
})