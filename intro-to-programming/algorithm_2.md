```javascript
function a(){
   console.log('hello');
}
console.log('Dojo');
```
1. Dojo

```javascript
function a(){
  console.log('hello');
  return 15;
}
x = a();
console.log('x is', x);
```
1. hello
2. x is 15

```javascript
function a(n){
  console.log('n is', n);
  return n+15;
}
x = a(;
console.log('x is', x);
```
1. n is 3
2. x is 18

```javascript
function a(n){
  console.log('n is', n);
  y = n*2;
  return y;
}
x = a( + a(;
console.log('x is', x);
```
1. n is 3
2. n is 5
3. x is 16

```javascript
function op(a,b){
  c = a+b;
  console.log('c is', c);
  return c;
}
x = op(2, + op(3,;
console.log('x is', x);
```
1. c is 5
2. c is 8
3. x is 13

```javascript
function op(a,b){
  c = a+b;
  console.log('c is', c);
  return c;
}
x = op(2, + op(3,op(2,) + op(op(2,,op(2,);
console.log('x is', x)
```
1. c is 5
2. c is 3
3. c is 6
4. c is 3
5. c is 5
6. c is 8
7. x is 30

```javascript
var x = 15;
function a(){
  var x = 10;
}
console.log(x);
a();
console.log(x);
```
1. 15
2. 15
