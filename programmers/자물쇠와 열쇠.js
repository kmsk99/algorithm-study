function solution(key, lock) {
    const bigArray = makeBigArray(key, lock);
    let rotated = key;
    for (let i = 0; i < 4; i++) {
        rotated = rotate(rotated);
        if (move(rotated, bigArray)) {
            return true;
        }
    }

    return false;
}

function makeBigArray(key, lock) {
    const keySize = key.length;
    const lockSize = lock.length;

    const bigArray = [];
    for (let i = 0; i < keySize; i++) {
        bigArray.push(new Array(2 * keySize + lockSize).fill(0));
    }
    for (let i = 0; i < lockSize; i++) {
        const row = new Array(keySize).fill(0);
        row.push(...lock[i]);
        row.push(...new Array(keySize).fill(0));
        bigArray.push(row);
    }
    for (let i = 0; i < keySize; i++) {
        bigArray.push(new Array(2 * keySize + lockSize).fill(0));
    }

    return bigArray;
}

function rotate(key) {
    const m = key.length;
    const rotated = [];
    for (let i = 0; i < m; i++) {
        rotated.push(new Array(m));
    }
    for (let y = 0; y < m; y++) {
        for (let x = 0; x < m; x++) {
            rotated[y][x] = key[m - x - 1][y];
        }
    }

    return rotated;
}

function move(key, bigArray) {
    const n = bigArray.length - key.length;
    for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
            const newArr = bigArray.map((v) => v.slice());

            for (let i = 0; i < key.length; i++) {
                for (let j = 0; j < key.length; j++) {
                    newArr[y + i][x + j] += key[i][j];
                }
            }

            if (isAnswer(newArr, key.length, newArr.length)) return true;
        }
    }
    return false;
}

function isAnswer(array, kl, al) {
    const start = kl;
    const end = al - kl;
    for (let y = start; y < end; y++) {
        for (let x = start; x < end; x++) {
            if (array[y][x] !== 1) return false;
        }
    }
    return true;
}
