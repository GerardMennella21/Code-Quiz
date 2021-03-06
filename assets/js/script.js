//Array of questions populated with objects and data for each question
var questions = [
    {
        question: "What is a pseudo-class?",
        options: ["A CSS rule that contains no declarations.","A CSS declaration that hides the element.","An element that has more than one class.","A CSS keyword to target an element's state."],
        answer: "A CSS keyword to target an element's state."
    },
    {
        question:"Which of the following is an example of a pseudo-element?",
        options: ["::before","::after","::first-letter","all of the above"],
        answer: "all of the above"
    },
    {
        question:"What does the * mean in css?",
        options: ["single selector","multiple selector","inverse selector","universal selector"],
        answer: "universal selector"
    },
    {
        question:"what does the Z-index property do?",
        options: ["Removes an element from the DOM","changes the stacking order of elements","Changes the opacity of an element.","Forces an element to be positioned relatively."],
        answer: "changes the stacking order of elements"
    },
    {
        question:"Using flex if you align-items flex-end where will the items go?",
        options: ["The left","The top","The bottom","The right"],
        answer: "The bottom"
    }
]

// Global Variable Declarations
var timer = document.querySelector("#Timer")
var timeRemaining = 75
var startQuiz = document.querySelector("#start")
var quizArea = document.querySelector("#quiz")
var QI = 0
var qList = document.createElement("ul")
var timeDeduct = 5
var scoreDisplay = document.querySelector("#highScore")
var highScore = localStorage.getItem("highScore")
var Name = localStorage.getItem("Name")

//If/Else Statment for Displaying High Score
if (highScore === null && Name === null) {
    scoreDisplay.textContent = "No High Score Data"
} else {
    scoreDisplay.textContent = Name + " has the high score of " + highScore
}

//Timer display
timer.textContent = "Time Remaining: " + timeRemaining

//event listener to start the quiz function and the timer
startQuiz.addEventListener("click", function() {
    var quizTimer = setInterval( function() {
        if (timeRemaining > 0 && (QI < questions.length)) {
            timeRemaining--
            timer.textContent = "Time Remaining: " + timeRemaining
        }
        else {
            clearInterval(quizTimer)
            endQuiz()
        }
    }, 1000)
    Quiz()
})

//Quiz Function
var Quiz = function() {
    quizArea.innerHTML = ""
    qList.innerHTML = ""

    for (i = 0; i < questions.length; i++) {
        var currentQuestion = questions[QI].question
        var currentOptions = questions[QI].options
        quizArea.textContent = currentQuestion
    }
    currentOptions.forEach (function (newQ) {
        var qlItem = document.createElement("li")
        qlItem.textContent = newQ
        quizArea.appendChild(qList)
        qList.appendChild(qlItem)
        qlItem.addEventListener("click", validate)
    })
}

//Function to check if answer is correct and move the iterator up
function validate(event) {
    var element = event.target

    if (element.matches("li")) {
        var result = document.createElement("div")
        result.setAttribute("id", "result")
        if (element.textContent == questions[QI].answer){
            result.textContent = "Correct! The answer is: " + questions[QI].answer
        } else {
            timeRemaining = timeRemaining - timeDeduct
            result.textContent = "Wrong! The correct answer is: " + questions[QI].answer
        }

    }

    QI++

    if (QI < questions.length) {
        Quiz(QI)
    }
    quizArea.appendChild(result)
}

//Function to end quiz and capture high score
function endQuiz() {
    quizArea.innerHTML= ""

    var createH2 = document.createElement("h2")
    createH2.setAttribute("id", "createH2")
    createH2.textContent = "End Quiz!"

    quizArea.appendChild(createH2)

    var createP = document.createElement("p")
    createP.setAttribute("id", "createP")
    createP.textContent = "The quiz is done! You finished with " + timeRemaining + " seconds remaining"

    quizArea.appendChild(createP)

    createLabel = document.createElement("label")
    createLabel.setAttribute("id", "createLabel")
    createLabel.textContent = "Enter your Name"

    quizArea.appendChild(createLabel)

    var createInput = document.createElement("input")
    createInput.setAttribute("type", "text")
    createInput.setAttribute("id", "Name")
    createInput.textContent = ""

    quizArea.appendChild(createInput)

    var createSubmit = document.createElement("button")
    createSubmit.setAttribute("type", "submit")
    createSubmit.setAttribute("id", "submit")
    createSubmit.textContent = "Submit"
    
    quizArea.appendChild(createSubmit)

    createSubmit.addEventListener("click", function() {
        var Name = createInput.value
        

       if (Name === null) {
            alert("You need to enter your Name!")
            var Name = createInput.value
        }
        
        if (highScore === null) {
            highScore = 0
        }

        if (timeRemaining > highScore) {
            localStorage.setItem("highScore", timeRemaining)
            localStorage.setItem("Name", Name)
            createP.textContent = "Congratulations, you beat the high score!"
            scoreDisplay.textContent = Name + " now has the high score of " + timeRemaining
        } else {
            createP.textContent = "You did not beat the high score!"
        }
    })
}
