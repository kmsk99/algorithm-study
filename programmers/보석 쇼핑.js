function solution(gems) {
    const hash = {};
    let size = 0;
    let kind = 0;
    let start = 0;
    let end = 1000001;
    let dist = 1000001;
    let index = 0;
    for (let i = 0; i < gems.length; i++) {
        if (hash[gems[i]] === undefined) size++;
        if (hash[gems[i]] === index) {
            hash[gems[i]] = i;
            index = Math.min(...Object.values(hash));
        } else hash[gems[i]] = i;

        if (kind < size) {
            kind = size;
            start = index;
            end = i;
            dist = i - index;
        }
        if (dist > i - index) {
            start = index;
            end = i;
            dist = i - index;
        }
    }
    return [start + 1, end + 1];
}

// 하나씩 나가면서 해쉬맵에 최근 위치 저장
// 현재 포함된 보석 갯수, 시작 인덱스, 길이
// 보석 갯수가 전보다 크거나 같을때 최소길이, 시작, 현재인덱스 저장
// 만약 똑같은 보석이 있다면 그 보석의 마지막 위치를 확인. 시작 인덱스라면 시작 인덱스 한칸 옮김
