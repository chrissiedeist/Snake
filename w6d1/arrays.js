Array.prototype.dups = function(arr) {
	var newArr = [];

	for(var i = 0; i < arr.length; i++) {
		newArr[i] = arr[i];
	}

	return newArr;
}


Array.prototype.dups2 =  function(arr) {
	var newArr = [];

	arr.forEach(function(element, index) {
		newArr[index] = element
	});

	return newArr;
}

Array.prototype.twoSum = function(arr) {
	var twoSumArr = []

	for(var i = 0; i < arr.length; i++) {
		for(var j = i + 1; j < arr.length; j++) {
			if ( arr[i] + arr[j] === 0 ){
				twoSumArr.push([i, j]);
			}
		}
	}

	return twoSumArr;
}

Array.prototype.transpose = function(arr) {
	var transposedArr = new Array(arr.length)

	for(var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			if (i === 0) {
				transposedArr[j] = new Array(arr[i].length);
			}
			transposedArr[j][i] = arr[i][j];
		}
	}

	return transposedArr;
}



