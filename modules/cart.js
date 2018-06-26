var module=angular.module('cartApp',[]);
module.controller('cartCtrl',function($scope,$http){
	$scope.cart=[];
	$scope.badget=""; 
	$scope.sumTotal=function(){
		var res=0;
		$scope.cart.forEach(function(elem){
			res+=elem.newPrice
		})
		return res
	}

	$scope.addProduct=function(item){
		var pos=$scope.cart.indexOf(item);
		if(pos==-1){
			item.newCount=1;
			item.newPrice=item.price;
			$scope.cart.push(item)
		}
		else{
			alert("Даний товар є в корзині")
		}
	};
	$scope.deleteProduct=function(item){
		var pos=$scope.cart.indexOf(item);
		$scope.cart.splice(pos,1)
	};
	$scope.plusCount=function(item){
		if(item.newCount+1>item.count){
		alert('Товар закінчився на складі');
		return	
		} 
		else{
			item.newCount++;
			item.newPrice+=item.price;
		}
	};
	$scope.minusCount=function(item){
		if(item.newCount==1){
			$scope.deleteProduct(item);
			return
		}
		else{
			item.newCount--;
			item.newPrice-=item.price;
		}
	};
	$scope.count=1;
	$scope.order=function(){
		$scope.date=new Date();
		
		$scope.newOrder={orderNumber:$scope.count,products:$scope.cart};
		$http.post('addorder',$scope.newOrder).then(function(data){
			console.log(data)
		})
		$scope.count+=1;
		$scope.cart=[];
	}


// функція додавання товару в корзину 
	// $scope.cartAdd=function(item){
	// 	if(item.count==item.buy) return alert("товар закінчився"); /*перевірка чи не перевищує залишок товару з купленим*/
	
	// 	var val=$scope.cart.indexOf(item);/*шукаємо позицію товару в масиві*/
	// 	if(val==-1){
	// 		if($scope.cart.length==0) $scope.badget=1
	// 		else $scope.badget=$scope.badget+1;
			
	// 		item.buy=1;
	// 		$scope.cart.push(item);
	// 	}
	// 	else {
	// 			$scope.cart[val].buy++;
	// 			$scope.badget++;
	// 	}
	// };
	// $scope.productMinus=function(item){  /*функція віднімання 1 од товару в таблиці*/
	// 	console.log("click")
	// 	var index=$scope.cart.indexOf(item);
	// 	if($scope.cart[index].buy===1){ /* видаляємо товар з масиву*/
	// 		$scope.cart.splice(index,1);
	// 		if($scope.cart.length==0) 
	// 		$scope.badget=""; 
	// 	return
	// }

	// 	$scope.cart[index].buy=	$scope.cart[index].buy-1; /*зменшуємо на одиницю замовлений товар*/
	// 	$scope.badget=	$scope.badget-1; /*зменшуємо на одиницю корзину*/

	// };
	// $scope.productPlus=function(item){  /*функція додавання 1 од товару в таблиці*/
	// 	if(item.count==item.buy) return alert("товар закінчився"); /*перевірка чи не перевищує залишок товару з купленим*/
	// 	var index=$scope.cart.indexOf(item);
	// 	$scope.cart[index].buy++;
	// }
})