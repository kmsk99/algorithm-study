function findString(parent, pattern) {
    const parentSize = parent.length;
    const patternSize = pattern.length;
    let parentHash = 0;
    let patternHash = 0;
    let power = 1;
    for (let i = 0; i <= parentSize - patternSize; i++) {
        if (i == 0) {
            for (let j = 0; j < patternSize; j++) {
                parentHash =
                    parentHash + parent.charCodeAt(patternSize - 1 - j) * power;
                patternHash =
                    patternHash +
                    pattern.charCodeAt(patternSize - 1 - j) * power;
                if (j < patternSize - 1) power = power * 2;
            }
        } else {
            parentHash =
                2 * (parentHash - parent.charCodeAt(i - 1) * power) +
                parent.charCodeAt(patternSize - 1 + i);
        }
        if (parentHash === patternHash) {
            let finded = true;
            for (let j = 0; j < patternSize; j++) {
                if (parent[i + j] !== pattern[j]) {
                    finded = false;
                    break;
                }
            }
            if (finded) {
                console.log(`${i + 1} 번째에서 발견했습니다`);
            }
        }
    }
}

const parent = 'ababacabacaabacaaba';
const pattern = 'abacaaba';
findString(parent, pattern);
