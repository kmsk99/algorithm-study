// 탑

const fs = require('fs');
const input = fs
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split(/\s/)
    .map((x) => Number(x));
// const input = `5
// 6 9 5 7 4`
//     .toString()
//     .trim()
//     .split(/\s/)
//     .map((x) => Number(x));

const tower = (input) => {
    const count = input[0];
    const result = Array(count).fill(0);
    let heightStack = [];
    let positionStack = [];
    let size = 0;

    for (let i = count; i > 0; i--) {
        while (size !== 0 && heightStack[size - 1] < input[i]) {
            result[positionStack[size - 1] - 1] = i;
            heightStack.pop();
            positionStack.pop();
            size--;
        }
        heightStack.push(input[i]);
        positionStack.push(i);
        size++;
    }

    console.log(result.join(' '));
};

tower(input);

// 맨 오른쪽부터 시작
// 결과값 행령 모두 0

// 만약 새로운 안테나가 오면 스택에 쌓음

// 스택 겉값의 높이와 비교하여 새로운 값이 작다면
// 	스택에 {스택위치 : 스택높이}쌓음
// 	다음
// 와일 스택 겉값의 높이와 비교하여 새로운 값이 크다면
// 	결과값[스택위치] = 현재 위치
// 	스택에서 하나 제외
// 스택에 쌓음
