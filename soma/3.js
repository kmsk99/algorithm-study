const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

const charHash = {};
const transed = {};

const getCharHash = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 26; i++) {
        charHash[alphabet.charCodeAt(i) - 'a'.charCodeAt(0)] = alphabet[i];
    }
};

const getTransCharHash = (a, b) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 26; i++) {
        let number = alphabet.charCodeAt(i) - 'a'.charCodeAt(0);
        number = (a * number + b) % 26;
        transed[charHash[number]] = alphabet[i];
    }
};

const solution = (string) => {
    const result = [];
    for (let i = 0; i < string.length; i++) {
        const current = transed[string[i]];
        result.push(current);
    }
    return result.join('');
};

rl.on('line', function (x) {
    input.push(x);
}).on('close', function () {
    const [a, b] = input[0].split(' ').map((x) => +x);
    const string = input[1];
    getCharHash();
    getTransCharHash(a, b);
    console.log(solution(string));
    process.exit();
});

// a * s + b = t
// 해쉬테이블 만들어서 복호화!
