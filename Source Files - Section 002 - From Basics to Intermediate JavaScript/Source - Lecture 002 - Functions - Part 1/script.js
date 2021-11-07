function passExam(name, score) {
    var passMBA = 80
    var passMCA = 70

    if (passMBA <= score) {
        console.log(name + ' ' + 'has passed MBA with ' + score);

    } else if (passMCA <= score) {
        console.log(name + ' ' + 'has passed MCA!!');
    } else
        console.log(name + ' ' + 'has failed. Better luck next year!!');
}

function calcScore(quizScore, assayScore) {
    var score = quizScore + assayScore
    return score
}

passExam('Anurag', calcScore(30, 60))
passExam('John', 75)
passExam('Dave', 50)