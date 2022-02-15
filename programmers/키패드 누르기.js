function solution(numbers, hand) {
    const hash = {
        1: [0, 0],
        2: [1, 0],
        3: [2, 0],
        4: [0, 1],
        5: [1, 1],
        6: [2, 1],
        7: [0, 2],
        8: [1, 2],
        9: [2, 2],
        0: [1, 3],
    };
    const result = [];
    const pos = [
        [0, 3],
        [2, 3],
    ];

    for (const number of numbers) {
        const numPos = hash[number];
        if (number === 1 || number === 4 || number === 7) {
            result.push('L');
            pos[0] = numPos;
        } else if (number === 3 || number === 6 || number === 9) {
            result.push('R');
            pos[1] = numPos;
        } else {
            if (dis(pos[0], numPos) < dis(pos[1], numPos)) {
                result.push('L');
                pos[0] = numPos;
            } else if (dis(pos[0], numPos) > dis(pos[1], numPos)) {
                result.push('R');
                pos[1] = numPos;
            } else if (dis(pos[0], numPos) === dis(pos[1], numPos)) {
                if (hand === 'right') {
                    result.push('R');
                    pos[1] = numPos;
                } else if (hand === 'left') {
                    result.push('L');
                    pos[0] = numPos;
                }
            }
        }
    }

    return result.join('');
}

function dis(pos1, pos2) {
    const dx = Math.abs(pos1[0] - pos2[0]);
    const dy = Math.abs(pos1[1] - pos2[1]);
    return dx + dy;
}

// 키패드 좌표 해시
// 결과 어레이
// 최근 위치 [왼손, 오른손]
// 위치 측정 함수
// 똑같을 때 사용 핸드에 따라 다르게
