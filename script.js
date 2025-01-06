function parsePacket(packetText) {
    const questionPattern = /(\d+)\.\s*(.*?)(?:\s*([A-Z\s]+))$/g; // Match question number, question, and answer
    const bonusPattern = /B(\d+)\.\s*(.*?)(?:\s*([A-Z\s]+))$/g; // Match bonus number, bonus question, and answer

    let questions = [];
    let tossupMatch;
    let bonusMatch;

    // Parsing tossup questions
    while ((tossupMatch = questionPattern.exec(packetText)) !== null) {
        const tossupQuestion = tossupMatch[2].trim();
        const tossupAnswer = tossupMatch[3].trim();
        questions.push({
            type: 'Tossup',
            questionText: tossupQuestion,
            answer: tossupAnswer
        });
    }

    // Parsing bonus questions
    while ((bonusMatch = bonusPattern.exec(packetText)) !== null) {
        const bonusQuestion = bonusMatch[2].trim();
        const bonusAnswer = bonusMatch[3].trim();
        questions.push({
            type: 'Bonus',
            questionText: bonusQuestion,
            answer: bonusAnswer
        });
    }

    return questions;
}
