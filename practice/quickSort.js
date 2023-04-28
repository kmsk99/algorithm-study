const array = [1, 10, 5, 8, 7, 6, 4, 3, 2, 9];
const len = array.length;

function quickSort(data, start, end) {
    if (start >= end) return;

    const key = start;
    let i = start + 1;
    let j = end;
    let temp;

    while (i <= j) {
        while (i <= end && data[i] <= data[key]) i++;
        while (j > start && data[j] >= data[key]) j--;
        if (i > j) {
            temp = data[j];
            data[j] = data[key];
            data[key] = temp;
        } else {
            temp = data[j];
            data[j] = data[i];
            data[i] = temp;
        }
    }

    quickSort(data, start, j - 1);
    quickSort(data, j + 1, end);
}

quickSort(array, 0, len - 1);

for (i = 0; i < len; i++) {
    console.log(array[i]);
}
