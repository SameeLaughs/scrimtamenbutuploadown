// Function to parse the packet and start the game
function parseAndStartGame() {
    const packet = document.getElementById("packet-input").value;
    const parsedQuestions = parsePacket(packet);

    if (parsedQuestions.length === 0) {
        alert("No questions were found in the packet.");
        console.log("Parsing result: ", parsedQuestions);
        return;
    }

    // Store parsed questions in the game
    window.questions = parsedQuestions;
    window.currentQuestionIndex = 0;

    // Hide the input area and show the game area
    document.getElementById("question-container").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");

    // Start showing the first question
    showNextQuestion();
}

// Function to parse the packet into questions and answers
function parsePacket(packetText) {
    const questionPattern = /\d+\.(.*?)\n([A-Z\s]+)/g; // Match question number, question, and answer
    const bonusPattern = /B\d+\.(.*?)\n([A-Z\s]+)/g; // Match bonus number, bonus question, and bonus answer

    let questions = [];
    let tossupMatch;
    let bonusMatch;

    // Parsing tossup questions
    while ((tossupMatch = questionPattern.exec(packetText)) !== null) {
        const tossupQuestion = tossupMatch[1].trim();
        const tossupAnswer = tossupMatch[2].trim();
        questions.push({
            type: 'Tossup',
            questionText: tossupQuestion,
            answer: tossupAnswer
        });
    }

    // Parsing bonus questions
    while ((bonusMatch = bonusPattern.exec(packetText)) !== null) {
        const bonusQuestion = bonusMatch[1].trim();
        const bonusAnswer = bonusMatch[2].trim();
        questions.push({
            type: 'Bonus',
            questionText: bonusQuestion,
            answer: bonusAnswer
        });
    }

    return questions;
}

// Function to show the next question
function showNextQuestion() {
    const currentQuestion = window.questions[window.currentQuestionIndex];
    if (!currentQuestion) {
        alert("No more questions available!");
        return;
    }

    document.getElementById("question-display").innerText = currentQuestion.questionText;
    document.getElementById("buzz-button").classList.remove("hidden");
}

// Function to handle the buzz-in action
function buzzIn() {
    const currentQuestion = window.questions[window.currentQuestionIndex];
    document.getElementById("answer-display").innerText = `Answer: ${currentQuestion.answer}`;

    // Hide the buzz button and move to the next question
    document.getElementById("buzz-button").classList.add("hidden");
    window.currentQuestionIndex++;
    setTimeout(showNextQuestion, 3000); // Show the next question after 3 seconds
}
