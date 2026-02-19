let branch = localStorage.getItem("branch");
let mode = localStorage.getItem("mode");

let quizQuestions = questions[branch];
let current = 0;
let score = 0;
let selectedOption = null;

function loadQuestion() {
    selectedOption = null;

    let q = quizQuestions[current];

    document.getElementById("question").innerHTML =
        `${q.question} <br><small>Marks: ${q.marks}</small>`;

    let optionsHTML = "";

    q.options.forEach((opt, index) => {
        optionsHTML += `
            <div class="option" onclick="selectOption(${index})">
                ${opt}
            </div>
        `;
    });

    document.getElementById("options").innerHTML = optionsHTML;
}

function selectOption(index) {
    selectedOption = index;

    let allOptions = document.querySelectorAll(".option");
    allOptions.forEach(opt => opt.classList.remove("selected"));

    allOptions[index].classList.add("selected");
}

function nextQuestion() {

    if (selectedOption === null) {
        alert("Please select an option!");
        return;
    }

    let correctAnswer = quizQuestions[current].answer;
    let marks = quizQuestions[current].marks;

    if (selectedOption === correctAnswer) {
        score += marks;
    } else if (mode === "gate") {
        score -= 0.25;
    }

    current++;

    if (current < quizQuestions.length) {
        loadQuestion();
    } else {
        localStorage.setItem("score", score);
        window.location.href = "result.html";
    }
}

loadQuestion();
