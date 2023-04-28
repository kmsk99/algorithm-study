#

## 1. 개요

https://www.acmicpc.net/problem/

## 2. 코드

## 3. 설명

1. 구현방법

## 4. 최선의 코딩 방법

```
const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
const totalCount = input[0];
let stickerLength = [];
let stickers = [];
for(let i = 0; i < totalCount; i++){
  const index = i * 3 + 1;
  stickerLength[i] = parseInt(input[index]);
  stickers[i] = [toArray(input[index + 1]), toArray(input[index + 2])];
}

for(let i = 0; i < totalCount; i++){
  console.log(maximizeStickers(stickerLength[i], stickers[i]));
}



// Make sting to array
function toArray(str){
  return str.split(' ').map(function(i){return parseInt(i);});
}

// Solve problem
function maximizeStickers(length, arr){
  arr[0][1] += arr[1][0];
  arr[1][1] += arr[0][0];
  for(let i = 2; i < length; i++){
    arr[0][i] += Math.max(arr[1][i-1], arr[1][i-2]);
    arr[1][i] += Math.max(arr[0][i-1], arr[0][i-2]);
  }
  return Math.max(arr[0][length-1], arr[1][length-1]);
}
```
