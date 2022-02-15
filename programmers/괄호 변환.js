function solution(p) {
    if (p === '') return p;
    let [u, v] = divide(p);
    if (correct(u)) {
        return u + solution(v);
    } else {
        return (
            '(' +
            solution(v) +
            ')' +
            u
                .split('')
                .slice(1, -1)
                .map((x) => (x === '(' ? ')' : '('))
                .join('')
        );
    }
}

function divide(string) {
    for (let i = 2; i <= string.length; i += 2) {
        const string1 = string.slice(0, i);
        const string2 = string.slice(i);
        if (balanced(string1)) {
            return [string1, string2];
        }
    }
    return ['', ''];
}

function balanced(string) {
    let open = 0;
    let close = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === '(') open++;
        else close++;
    }

    return open === close;
}

function correct(string) {
    const stack = [];
    for (let i = 0; i < string.length; i++) {
        if (string[i] === '(') {
            stack.push(string[i]);
        } else {
            if (stack.length > 0) {
                stack.pop();
            } else {
                return false;
            }
        }
    }
    return true;
}
