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
    const questionPattern = /(\d+)\.\s*(.*?)(?:\s*([A-Z\s/]+))$/g; // Match question number, question, and answer
    const bonusPattern = /B(\d+):\s*(.*?)(?:\s*([A-Z\s/]+))$/g; // Match bonus question number, bonus question, and answer

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

// Function to show the next question, word by word
function showNextQuestion() {
    const currentQuestion = window.questions[window.currentQuestionIndex];
    if (!currentQuestion) {
        alert("No more questions available!");
        return;
    }

    // Clear previous question text
    document.getElementById("question-display").innerText = '';

    // Display the question word by word
    const questionWords = currentQuestion.questionText.split(' ');
    let wordIndex = 0;
    const intervalId = setInterval(() => {
        document.getElementById("question-display").innerText += questionWords[wordIndex] + ' ';
        wordIndex++;
        if (wordIndex === questionWords.length) {
            clearInterval(intervalId); // Stop the interval when all words have been displayed
            document.getElementById("buzz-button").classList.remove("hidden"); // Show the buzz button
        }
    }, 500); // Show each word with a delay of 500ms

    // Display the question type (optional)
    document.getElementById("question-type").innerText = currentQuestion.type;
}

// Function to handle the buzz-in action
function buzzIn() {
    const currentQuestion = window.questions[window.currentQuestionIndex];
    document.getElementById("answer-display").innerText = `Answer: ${currentQuestion.answer}`;

    // Hide the buzz button and move to the next question
    document.getElementById("buzz-button").classList.add("hidden");
    window.currentQuestionIndex++;

    // Wait for 3 seconds before showing the next question
    setTimeout(() => {
        if (window.currentQuestionIndex < window.questions.length) {
            showNextQuestion(); // Show next question
        } else {
            alert("Game over! All questions have been answered.");
        }
    }, 3000);
}
