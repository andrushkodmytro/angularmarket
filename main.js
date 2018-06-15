var mainApp=angular.module('mainApp',["cartApp","productApp","categoryApp"]);
mainApp.controller('mainCtrl',function($scope,$http){
	$scope.current={
		view:"product.html",
		header:"Товари"

	};
	$scope.showCart=function(){
		$scope.current.view="cart.html",
		$scope.current.header="Корзина"
	};
	$scope.showProducts=function(){
		$scope.current.view="product.html",
		$scope.current.header="Товари"
	};









})

// mainApp.controller('Ctrl1',function($scope,$rootScope){
// 	$scope.value1="test1";
// 	$scope.sendData=()=>{
// 		$rootScope.$broadcast('send',{data:$scope.value1})
// 	};
// 	$scope.sendData();
// });
// mainApp.controller("Ctrl2",function($scope){
// 	$scope.$on('send',function(event,data){
// 		$scope.value1=data.data;
// 		console.log("Hello")
// 	})
// })