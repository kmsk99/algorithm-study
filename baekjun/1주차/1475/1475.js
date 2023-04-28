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
