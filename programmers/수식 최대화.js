function solution(expression) {
    const array = expression.split(/(\d+)/).filter((x) => x !== '');
    const hash = { '*': 0, '+': 0, '-': 0 };
    const prior = [];
    for (const elem of array) {
        if (hash[elem] === 0) {
            hash[elem]++;
            prior.push(elem);
        }
    }
    const permutations = getPer(prior, prior.length);
    const result = calc(permutations, array);
    return result;
}

function getPer(arr, selectedNumber) {
    const results = [];
    if (selectedNumber === 1) return arr.map((x) => [x]);

    arr.forEach((fixed, index, origin) => {
        const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
        const pers = getPer(rest, selectedNumber - 1);
        const attached = pers.map((per) => [fixed, ...per]);
        results.push(...attached);
    });

    return results;
}

function calc(permutations, array) {
    let max = 0;
    for (const permutation of permutations) {
        let curArray = array.slice();
        for (const sym of permutation) {
            let i = 0;
            while (i < curArray.length) {
                if (curArray.length === 1) break;
                if (curArray[i] !== sym) {
                    i++;
                    continue;
                }
                if (sym === '*') {
                    const result = +curArray[i - 1] * +curArray[i + 1];
                    curArray = [
                        ...curArray.slice(0, i - 1),
                        result,
                        ...curArray.slice(i + 2),
                    ];
                    i = 0;
                } else if (sym === '+') {
                    const result = +curArray[i - 1] + +curArray[i + 1];
                    curArray = [
                        ...curArray.slice(0, i - 1),
                        result,
                        ...curArray.slice(i + 2),
                    ];
                    i = 0;
                } else if (sym === '-') {
                    const result = +curArray[i - 1] - +curArray[i + 1];
                    curArray = [
                        ...curArray.slice(0, i - 1),
                        result,
                        ...curArray.slice(i + 2),
                    ];
                    i = 0;
                }
                i++;
            }
        }
        max = Math.max(Math.abs(curArray[0]), max);
    }
    return max;
}
