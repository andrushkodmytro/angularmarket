var mainApp=angular.module('mainApp',["cartApp","productApp","categoryApp","adminApp"]);
mainApp.controller('mainCtrl',function($scope,$http){
	$scope.current={
		view:"viewClient/product.html",
		header:"Товари"

	};
	$scope.showCart=function(){
		$scope.current.view="viewClient/cart.html",
		$scope.current.header="Корзина"
	};
	$scope.showProducts=function(){
		$scope.current.view="viewClient/product.html",
		$scope.current.header="Товари"
	};

	$scope.showAdminProducts=function(){
		$scope.current.view='viewAdmin/adminproducts.html',
		$scope.current.header="Адмін"
	}

	$scope.current.admin={
		products:"viewAdmin/addproducts.html",
		categorys:"viewAdmin/categoryAdmin.html",
		orders:"viewAdmin/orders.html"
	}
	$scope.fb_visuser=false;
	$scope.fb_user={};
	$scope.fb_GetUser=function(){
		$http.get('/fbgetuser').then(function(data){
			console.log(data.data);
			if(data.data)
			$scope.fb_user=data.data;
			$scope.fb_visuser=true
		})
	}







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