function solution(s) {
    let minLength = 1001;
    for (let i = 1; i <= Math.floor(s.length + 1) / 2; i++) {
        const strings = [];
        const result = [];
        let k = 0;
        while (true) {
            if (k + i >= s.length) {
                strings.push(s.slice(k));
                break;
            }
            strings.push(s.slice(k, k + i));
            k += i;
        }

        let prev = '';
        let count = 1;

        for (let j = strings.length - 1; j >= 0; j--) {
            if (prev === strings[j]) {
                count++;
            } else {
                if (count > 1) {
                    result.push(count);
                    count = 1;
                }
                result.push(strings[j]);
                prev = strings[j];
            }
        }

        if (count > 1) {
            result.push(count);
        }

        const resultString = result.reverse().join('');

        minLength = Math.min(minLength, resultString.length);
    }

    return minLength;
}

// 각 길이에 대해 쪼개줌
// 쪼개진 값을 해시값에 넣어주고 넣어준 해시값 밸류는 위치로 설정
// 위치가 연속되면 숫자 추가해줌
