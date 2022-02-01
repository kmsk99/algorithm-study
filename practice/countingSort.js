const array = [
    1, 2, 3, 4, 3, 5, 1, 2, 3, 4, 2, 3, 1, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3,
    5, 1, 2, 3, 4, 1, 2, 3, 4, 1, 3, 2,
];
const len = array.length;
const count = new Array(6);
let temp;

for (let i = 1; i <= 5; i++) {
    count[i] = 0;
}

for (let i = 0; i < len; i++) {
    count[array[i]]++;
}

for (let i = 1; i <= 5; i++) {
    if (count[i] != 0) {
        for (let j = 0; j < count[i]; j++) {
            console.log(i);
        }
    }
}
