1. Return the given array, after setting any negative values to zero.  For example resetNegatives( [1,2,-1, -3]) should return [1,2,0,0].

```javascript
function negativeToZero (array) {
	for ( let i = 0; i < array.length; i++ ) {
		if ( array[i] < 0 ) {
			array[i] = 0;
		}
	}
	
	return array;
}
```

2. Given an array, move all values forward by one index, dropping the first and leaving a ‘0’ value at the end.  For example moveForward( [1,2,3]) should return [2,3,0].

```javascript
function moveForward ( array ) {
	array.shift();
	array.push(0);
	
	return array;
}
```

3. Given an array, return an array with values in a reversed order.  For example, returnReversed([1,2,3]) should return [3,2,1].

```javascript
function reverseArray ( array ) {
	let newArray = [];
	
	for ( let i = (array.length - 1); i >= 0; i-- ) {
		newArray.push(array[i]);
	}
	
	return newArray;
}
```

4. Create a function that changes a given array to list each original element twice, retaining original order.  Have the function return the new array.  For example repeatTwice( [4,”Ulysses”, 42, false] ) should return [4,4, “Ulysses”, “Ulysses”, 42, 42, false, false].

```javascript
function repeatElements ( array ) {
	let newArray = [];
	
	for ( let i = 0; i < array.length; i++ ) {
		newArray.push(array[i]);
		newArray.push(array[i]);
	}
	
	return newArray;
}
```