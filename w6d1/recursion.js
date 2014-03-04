var range = function(start, end) {
  var rangeArr = [];

	if (start === end) {
  	return [start];
  }
	rangeArr = [start];
  return rangeArr.concat(range(start + 1,end));

}

Array.prototype.sum = function() {
	if (this.length === 1) {
		return this[0];
	}

	return this[0] + sum(this.slice(1));
}

console.log(sum([1,2,3,4]));

var exp = function(b, n) {
	if (n === 0) {
		return 1;
	}
	if (b === 0){
		return 0;
	}
	return b * exp(b, n - 1);
}


var exp2 = function(b, n) {

	if (n === 0) {
		return 1;
	}
	if (b === 0) {
		return 0;
	}

	if (n % 2 === 0) {
		answer = exp(b, n / 2);
  	return answer * answer;
	} else {
		answer = exp(b, (n - 1) / 2)
		return b * answer * answer;
	}
}

Number.prototype.fibonacci = function() {
	switch(this) {
    case 1:
			return [0];
		case 2:
			return [0,1];
  }
	var fibs = (this-1).fibanocci;
  return fibs.push((fibs[fibs.length-1] + fibs[fibs.length-2]));
}

Array.prototype.binarySearch = function(n) {
  if (this.length === 0 ) {
  	return undefined;
  }
	probeIndex = this.length/2

	firstHalf = this.slice(0, this.length/2);
	otherHalf = this.slice((this.length/2)+1);

	if (firstHalf[probeIndex] > n) {
    return firstHalf.binarySearch(n);

		} else if (n === this[probeIndex]){
		  return probeIndex;
		}	else {
			return probeIndex + 1 + otherHalf.binarySearch(n)
	}

}

var makeChange = function(target, coins) {
  coins = coins.sort().reverse();
	if (coins.length === 0 || target < coins[coins.length - 1]) {
		return [];
	}
	bestChange = null
  coins.forEach( function(coin, i){
    if coin > target {
		  continue;
   }
  });
}



