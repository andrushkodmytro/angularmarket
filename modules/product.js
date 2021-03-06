var module=angular.module('productApp',[]);
module.directive('currentItem',function(){
	return function(scope,element,attr){
		element.on('load',function(e){
			var path=e.target.contentDocument.body.innerHTML;
			scope.$apply(function(){
				scope.newProduct.path=path;
			})
			

		})
	}
})

module.controller('productCtrl',function($scope,$http){
	$scope.products=[];
	$scope.loadProducts=function(item){
	var item=item||"Всі категорії"
	$http.post('/loadproducts',{name:item}).then(function(data){
		$scope.products=data.data;
		$scope.sortMas($scope.sortSelect);
		$scope.setPage(1);

	})

};
$scope.loadProducts();
$scope.sortSelect="По спаданню";
$scope.sortMas=function(value){
	function sortDesc(a,b){
		return b.price-a.price;
	};
	function sortAcces(a,b){
		return a.price-b.price;
	};
	if(value=="По спаданню")
		$scope.items.sort(sortDesc)
	else $scope.items.sort(sortAcces)
}



$scope.getPage=function(totalItems,currentPage,pageSize){
	var currentPage=currentPage||1;
	var pageSize=pageSize||10;
	var totalPage=Math.ceil(totalItems/pageSize);
	var startPage=0;
	var endPage=0;
	if(totalPage<10){
		startPage=1;
		endPage=totalPage;
	}
	else{
		if(currentPage<=6){
			startPage=1;
			endPage=10;
		}
		else{
			if(currentPage+4>totalPage){
				endPage=totalPage;
				startPage=totalPage-9
			}
			else{
				endPage=currentPage+4;
				startPage=currentPage-5;
			}
		}

	}
	var pages=[];
	for(var i=startPage;i<=endPage;i++){
		pages.push(i);
	};
	var startIndex=(currentPage-1)*pageSize;
	var endIndex=Math.min(startIndex+pageSize-1,totalItems-1);
	return {
		pages:pages,
		startIndex:startIndex,
		endIndex:endIndex,
		startPage:startPage,
		endPage:endPage,
		totalItems:totalItems,
		currentPage:currentPage,
		pageSize:pageSize,
		totalPage:totalPage
	}
};
$scope.items=[];
$scope.objpage={};
$scope.setPage=function(pageNumber){
	$scope.objpage=$scope.getPage($scope.products.length,pageNumber,5);
	
	$scope.items=$scope.products.slice($scope.objpage.startIndex,$scope.objpage.endIndex+1);

}


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
	$scope.orders=[];
	$scope.loadOrders=function(){
		$http.get('/loadorders').then(function(data){
			$scope.orders=data.data;
			console.log($scope.orders)
		})
	};
	$scope.loadOrders()
})