#

## 1. 개요

https://www.acmicpc.net/problem/

## 2. 코드

## 3. 설명

1. 구현방법

## 4. 최선의 코딩 방법

```
function readInputLines() {
    return require("fs").readFileSync("/dev/stdin").toString().trim().split("\n")
}

const lines = readInputLines()
const [n, m] = lines[0].split(" ").map(value => parseInt(value))
const isUsed = Array(n + 1).fill(false)
let result = ""
function generateSequence(isUsed, current, targetLength) {
    if (current.length === targetLength) {
        result += current.join(" ") + "\n"
        return
    }
    for (let i = 1; i < isUsed.length; ++i) {
        if (!isUsed[i]) {
            current.push(i)
            isUsed[i] = true
            generateSequence(isUsed, current, targetLength)
            current.pop()
            isUsed[i] = false
        }
    }
}
generateSequence(isUsed, [], m)
console.log(result)
```
