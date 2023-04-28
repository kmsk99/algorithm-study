const array = [1, 10, 5, 8, 7, 6, 4, 3, 2, 9];
const len = array.length;

let i, j, min, index, temp;

for (i = 0; i < len; i++) {
    min = Infinity;
    for (j = i; j < len; j++) {
        if (min > array[j]) {
            min = array[j];
            index = j;
        }
    }
    temp = array[i];
    array[i] = array[index];
    array[index] = temp;
}

for (i = 0; i < len; i++) {
    console.log(array[i]);
}
