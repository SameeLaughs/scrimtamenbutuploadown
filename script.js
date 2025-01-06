// Function to parse the packet and start the game
function parseAndStartGame() {
    const packet = document.getElementById("packet-input").value;
    const parsedQuestions = parsePacket(packet);

    if (parsedQuestions.length === 0) {
        alert("No questions were found in the packet.");
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
    const tossupMarker = /Tossup:/g;
    const bonusMarker = /Bonus:/g;

    // Split the packet by tossup and bonus markers
    let questions = [];
    let tossupStartIndex = 0;
    let bonusStartIndex = 0;

    const tossupQuestions = packetText.split(tossupMarker).slice(1); // Skip the first empty split before the first tossup

    tossupQuestions.forEach((tossup, index) => {
        // Parse the tossup question and its answer
        const bonusStart = tossup.indexOf(bonusMarker);
        const tossupText = tossup.slice(0, bonusStart === -1 ? tossup.length : bonusStart).trim();
        const answer = extractAnswer(tossupText);

        // Store the parsed question and answer
        questions.push({
            type: 'Tossup',
            questionText: tossupText,
            answer: answer
        });

        // If a bonus exists after the tossup
        if (bonusStart !== -1) {
            const bonusText = tossup.slice(bonusStart + bonusMarker.length).trim();
            const bonusAnswer = extractAnswer(bonusText);

            // Store the bonus question and answer
            questions.push({
                type: 'Bonus',
                questionText: bonusText,
                answer: bonusAnswer
            });
        }
    });

    return questions;
}

// Function to extract answers from the question
function extractAnswer(questionText) {
    const answerPattern = /\(.*?\)/; // Match the answer inside parentheses
    const match = questionText.match(answerPattern);
    return match ? match[0].slice(1, -1) : "No answer found";
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
