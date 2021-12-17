function solution(n) {
    // 3진수로 변환후 변환된 값 뒤집기
    const reverseNum = n.toString(3).split("").reverse().join("")
    // 3진수를 다시 10진수로 변환
    const answer = parseInt(reverseNum,3)
    return answer
}
