var module=angular.module('categoryApp',[]);
module.controller('categoryCtrl',function($scope,$http){
	$scope.category=[];
	$scope.onlycategory=[];

$scope.loadCategory=function(){
	$http.get('/loadcategory').then(function(data){
		$scope.category=data.data;
		$scope.onlycategory=$scope.category.slice(0);
		$scope.category.unshift({name:'Всі категорії'});
		$scope.selectCategory=$scope.category[0].name;
	})
}
$scope.loadCategory();


})