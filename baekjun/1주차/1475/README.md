# 1475 - 방번호

## 1. 개요

https://www.acmicpc.net/problem/

## 2. 코드

```
// 방 번호
const fs = require('fs');
const roomNumber = fs.readFileSync('/dev/stdin').toString();

// 9를 6으로 모두 바꿈
const newRoomNumber = roomNumber.replaceAll('9', '6');
let roomNumberCount = {};
let result = 0;

// 문자열을 각 숫자당 개수를 나타내는 오브젝트로 변환
for (let i = 0; i < newRoomNumber.length; i++) {
    if (roomNumberCount[newRoomNumber[i]]) {
        roomNumberCount[newRoomNumber[i]] =
            roomNumberCount[newRoomNumber[i]] + 1;
    } else {
        roomNumberCount[newRoomNumber[i]] = 1;
    }
}

// 6은 6과 9가 합쳐져 있으므로 절반으로 나눈 뒤 올림
if (roomNumberCount[6]) {
    roomNumberCount[6] = Math.ceil(roomNumberCount[6] / 2);
}

// 오브젝트 전체에 걸쳐 최대값 측정
for (const currentNumber in roomNumberCount) {
    if (result < roomNumberCount[currentNumber]) {
        result = roomNumberCount[currentNumber];
    }
}

console.log(result);
```

## 3. 설명

1. 구현방법

    - 오브젝트로 구현하여 각 오브젝트의 개수를 추가하였다

2. 사전 작업

    - 방 번호의 모든 9를 6으로 바꿔준다
    - 방 번호 당 숫자를 세는 빈 객체를 만든다
    - 결과값을 선언한다

    ```
    const newRoomNumber = roomNumber.replaceAll('9', '6');
    let roomNumberCount = {};
    let result = 0;
    ```

3. 함수 구현

-   문자열을 각 숫자당 개수를 나타내는 오브젝트로 변환

    ```
        for (let i = 0; i < newRoomNumber.length; i++) {
        if (roomNumberCount[newRoomNumber[i]]) {
        roomNumberCount[newRoomNumber[i]] =
        roomNumberCount[newRoomNumber[i]] + 1;
        } else {
        roomNumberCount[newRoomNumber[i]] = 1;
        }
        }
    ```

-   6은 6과 9가 합쳐져 있으므로 절반으로 나눈 뒤 올림

    ```
    if (roomNumberCount[6]) {
    roomNumberCount[6] = Math.ceil(roomNumberCount[6] / 2);
    }
    ```

-   오브젝트 전체에 걸쳐 최대값 측정

    ```
    for (const currentNumber in roomNumberCount) {
    if (result < roomNumberCount[currentNumber]) {
    result = roomNumberCount[currentNumber];
    }
    ```

## 4. 최선의 코딩 방법

-   모든 문자를 숫자로 바꾸어 배열로 저장한다
-   숫자를 카운트하는 빈 배열을 만든다
-   빈 배열에 카운트를 더한다
-   6과 9의 카운트를 더하고 1을 더한 뒤 2로 나누어준다 이후 parseInt해준다
-   Math.max 함수로 카운트 배열을 스프레드 해준 값의 최대값을 구한다

```
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('').map(n=>parseInt(n));
const count = new Array(10).fill(0);
input.forEach(n=>count[n]++);
const sixNine = parseInt((count[6] + count[9] + 1) / 2);
const answer = Math.max(...count.slice(0,6), ...count.slice(7,9), sixNine);
console.log(answer);
```
