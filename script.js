function parseAndStartGame() {
    const packet = document.getElementById("packet-input").value;
    const parsedQuestions = parsePacket(packet);

    if (parsedQuestions.length === 0) {
        alert("No questions were found in the packet.");
        console.log("Parsing result: ", parsedQuestions);
        return;
    }

    window.questions = parsedQuestions;
    window.currentQuestionIndex = 0;

    document.getElementById("question-container").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");

    showNextQuestion();
}

function parsePacket(packetText) {
    const questionPattern = /(\d+)\.\s*(.*?)(?:\s*([A-Z\s/]+))$/g; 
    const bonusPattern = /B(\d+):\s*(.*?)(?:\s*([A-Z\s/]+))$/g;  

    let questions = [];
    let tossupMatch;
    let bonusMatch;

     while ((tossupMatch = questionPattern.exec(packetText)) !== null) {
        const tossupQuestion = tossupMatch[2].trim();
        const tossupAnswer = tossupMatch[3].trim();
        questions.push({
            type: 'Tossup',
            questionText: tossupQuestion,
            answer: tossupAnswer
        });
    }

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

 function showNextQuestion() {
    const currentQuestion = window.questions[window.currentQuestionIndex];
    if (!currentQuestion) {
        alert("No more questions available!");
        return;
    }

     document.getElementById("question-display").innerText = '';

     const questionWords = currentQuestion.questionText.split(' ');
    let wordIndex = 0;
    const intervalId = setInterval(() => {
        document.getElementById("question-display").innerText += questionWords[wordIndex] + ' ';
        wordIndex++;
        if (wordIndex === questionWords.length) {
            clearInterval(intervalId);  
            document.getElementById("buzz-button").classList.remove("hidden");  
        }
    }, 500);  

     document.getElementById("question-type").innerText = currentQuestion.type;
}

 function buzzIn() {
    const currentQuestion = window.questions[window.currentQuestionIndex];
    document.getElementById("answer-display").innerText = `Answer: ${currentQuestion.answer}`;

     document.getElementById("buzz-button").classList.add("hidden");
    window.currentQuestionIndex++;

     setTimeout(() => {
        if (window.currentQuestionIndex < window.questions.length) {
            showNextQuestion(); 
        } else {
            alert("Game over! All questions have been answered.");
        }
    }, 3000);
}
