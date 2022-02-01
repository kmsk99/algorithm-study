const array = [1, 10, 5, 8, 7, 6, 4, 3, 2, 9];
const len = array.length;

let i, j, temp;

for (i = 0; i < len; i++) {
    for (j = 0; j < len - 1 - i; j++) {
        if (array[j] > array[j + 1]) {
            temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
        }
    }
}

for (i = 0; i < len; i++) {
    console.log(array[i]);
}
