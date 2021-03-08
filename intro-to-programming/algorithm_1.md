```javascript
for(var i=0; i<5;i++){   
   console.log(i);
}
```
### Correct
1. 0
2. 1
3. 2
4. 3
5. 4

```javascript
for(var i=0; i<5; i++)
{
   i = i + 1;  
   console.log(i);
}
```
### Wrong
1. 1
2. 2
3. 3
4. 4
5. 5
### Correct
1. 1
2. 3
3. 5

```javascript
for(var i=0; i<5; i++)
{
   i = i + 3; 
   console.log(i);
}
```
### Wrong
1. 3
2. 4
3. 5
4. 6
5. 7
### Correct
1. 3
2. 7

```javascript
function y(num1, num2){   
   return num1+num2;
}
console.log(y(2,3))
console.log(y(3,5))
```
### Correct
1. 5
2. 8

```javascript
function y(num1, num2){
   console.log(num1);   
   return num1+num2;
}
console.log(y(2,3))
console.log(y(3,5))
```
### Correct
1. 2
2. 5
3. 3
4. 8

```javascript
a = 15;
console.log(a);
function y(a){
   console.log(a);   
   return a;
}
b = y(10);
console.log(b);
```
### Correct
1. 15
2. 10
3. 10

```javascript
a = 15;
console.log(a);
function y(a){
   console.log(a);   
   return a*2;
}
b = y(10);
console.log(b);
```
### Correct
1. 15
2. 10
3. 20
