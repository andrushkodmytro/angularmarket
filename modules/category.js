var module=angular.module('categoryApp',[]);
module.controller('categoryCtrl',function($scope,$http){
	$scope.category=[];

$scope.loadCategory=function(){
	$http.get('/loadcategory').then(function(data){
		$scope.category=data.data;
		$scope.category.unshift({name:'Всі категорії'});
		$scope.selectCategory=$scope.category[0].name;
	})
}
$scope.loadCategory();


})