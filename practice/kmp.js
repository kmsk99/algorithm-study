function makeTable(pattern) {
    const pattrenSize = pattern.length;
    const table = new Array(pattrenSize).fill(0);
    let j = 0;
    for (let i = 1; i < pattrenSize; i++) {
        while (j > 0 && pattern[i] !== pattern[j]) {
            j = table[j - 1];
        }
        if (pattern[i] === pattern[j]) {
            table[i] = ++j;
        }
    }
    return table;
}

function KMP(parent, pattern) {
    const table = makeTable(pattern);
    const parentSize = parent.length;
    const patternSize = pattern.length;
    let j = 0;
    for (let i = 0; i < parentSize; i++) {
        while (j > 0 && parent[i] !== pattern[j]) {
            j = table[j - 1];
        }
        if (parent[i] === pattern[j]) {
            if (j === patternSize - 1) {
                console.log(`${i - patternSize + 2}번쨰에서 찾았습니다`);
                j = table[j];
            } else {
                j++;
            }
        }
    }
}

const parent = 'ababacabacaabacaaba';
const pattern = 'abacaaba';
KMP(parent, pattern);
