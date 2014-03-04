Number.prototype.factors = function() {
	var factorArr = [];

	for (var i = 0; i <= this; i++) {
    if (this % i === 0) {
      factorArr.push(i);
    }
	}
	return factorArr;
}

Array.prototype.myEach = function(meth) {
  this.forEach(function(el) {
		console.log(meth(el));
  });

	return this;
}


Array.prototype.myMap = function(meth) {
	var mapArr = [];

	for (var i = 0; i < this.length; i++) {
    mapArr[i] = meth(this[i]);
	}

	return mapArr;
}

var myInject = function(arr, meth) {
  var value = arr[0];

	for (var i = 1; i < arr.length; i++) {
		value = meth(value, arr[i]);
	}

	return value;
}


var bubbleSort = function(arr) {
	var sorted = false;

	while (!sorted) {
		sorted = true;

		arr.forEach(function(el, idx){
			if (idx + 1 === arr.length) {
				return;
			}
			if (arr[idx] > arr[idx + 1]){
						var old = arr[idx + 1];
						arr[idx+1] = arr[idx];
						arr[idx] = old;
						sorted = false;
			}
		});
	}

	return arr;
}



console.log([1,2].myMap(function(el) {
	return el * 2;
}));