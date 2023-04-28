# 11729 - 하노이의 탑 이동 순서

## 1. 개요

https://www.acmicpc.net/problem/11729

## 2. 코드

```
const input = +require('fs').readFileSync('/dev/stdin').toString().trim();
// const input = 3;
const result = [];

const hanoi = (number, from, to, other) => {
    if (number === 0) return;
    hanoi(number - 1, from, other, to);
    result.push(`${from} ${to}`);
    hanoi(number - 1, other, to, from);
};

hanoi(input, 1, 3, 2);

result.unshift(result.length);

console.log(result.join('\n'));
```

## 3. 설명

1. 구현방법
    - 재귀함수를 이용하여 구현해주었다
    - number가 1일 때 하노이의 탑은 1 에서 3으로 이동한다
    - number가 2 이상일 때 1에서 2로 이동 후 1에서 3으로 이동, 이후 2에서 3으로 이동한다
    - 1을 from 2를 other 3을 to로 대입한 뒤, 재귀함수를 실행해준다
    - 결과값을 배열로 구성하여 넣어준 뒤 마지막에 배열의 길이를 구하여 가장 앞에 대입하고 로그출력한다

## 4. 최선의 코딩 방법

-   플랫폼을 인식하여 테스트케이스를 자동으로 집어넣어줄 수 있다
-   문자열을 return해주며 N이 1일때를 따로 넣어준다
-   계산 횟수는 직접 계산식을 넣어준다

```
let fs = require('fs')
const PATH = process.platform === 'linux' ? '/dev/stdin' : 'testcase.txt'
const N = +(fs.readFileSync(PATH).toString().trim())

function hanoi(N, start, end, via) {
  if (N === 1) return `${start} ${end}\n`

  let answer = ''
  answer += hanoi(N - 1, start, via, end)
  answer += `${start} ${end}\n`
  answer += hanoi(N - 1, via, end, start)
  return answer
}

const result = hanoi(N, 1, 3, 2)
console.log(2 ** N - 1)
console.log(result)
```
