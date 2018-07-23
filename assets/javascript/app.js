$(document).ready(function () {
    // Create a function that creates the start button and initial screen

    function openingPage() {
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-md btn-block start-button' href='#' role='button'>Giddy Up!</a></p>";
        $("#mainArea").append(openScreen);
    }

    openingPage();

    //on-click event for start button to begin name

    $("#mainArea").on("click", ".start-button", function (event) {
        event.preventDefault();

        generateQuestions();

        timerWrapper();

    }); // Closes start-button click

    $("body").on("click", ".answer", function (event) {

        selectedAnswer = $(this).text();
        //ternary operator, if/else replacement
        selectedAnswer === correctAnswers[questionCounter] ? (
            //alert("correct");
            clearInterval(theClock),
            generateWin()) :
            //else
            (//alert("wrong answer!");
                clearInterval(theClock),
                generateLoss()
            )
    }); // Close .answer click

    $("body").on("click", ".reset-button", function (event) {
        resetGame();
    }); // Closes reset-button click

});  //  Closes jQuery wrapper

function timeoutLoss() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-george' src='assets/images/georgephoto.gif'>";
    $("#mainArea").html(gameHTML);
    setTimeout(wait, 3000);  //  change to 4000 or other amount
}

function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $("#mainArea").html(gameHTML);

    setTimeout(wait, 3000);  //end generatewin
}

function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wgeorge' src='assets/images/george.gif'>";
    $("#mainArea").html(gameHTML);
    setTimeout(wait, 5000);
}
//end generate loss

function generateQuestions() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
    $("#mainArea").html(gameHTML);
}; //end generate question

function wait() {
    //ternary operator replacing if/else for generate more questions
    questionCounter < 7 ?
        (questionCounter++ ,
            generateQuestions(),
            counter = 30,
            timerWrapper()) :

        (finalScreen())
}; //end function

function timerWrapper() {
    theClock = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            timeoutLoss();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, hopefully you're the master of your domain." + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $("#mainArea").html(gameHTML);
}

function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 30;
    generateQuestions();
    timerWrapper();
}

var openScreen;
var gameHTML;
var counter = 30;
var questionArray =
    ["What is George's secret ATM password?",
        "What is Elaine's middle name?",
        "Whose former postal route did Newman take over?",
        "Whose Chrystler Lebaron did George think he bought?",
        "What object belonging to George does Elaine throw out of a window?",
        "What is Jerry's real first name?",
        "What flavor of Italian Ice does Bette Midler ask Kramer to buy for her?",
        "What major character was not in the pilot episode?"
    ];

var answerArray = [
    ["Bunion", "Bosco", "Seven", "Twix"],
    ["Marie", "Gail", "Susan", "Estelle"],
    ["Crazy Joe Davola", "Jack Klompus", "David Berkowitz", "Ted Bundy"],
    ["Keith Hernandez", "Jon Voight", "Marissa Tomei", "Tim Whatley"],
    ["Baseball Card", "Car Keys", "Wig", "Sweater"],
    ["Gerald", "Joshua", "Jerard", "Jerome"],
    ["Pineapple", "Tutti-frutti", "Strawberry", "Banana"],
    ["George", "Kramer", "Jerry", "Elaine"],];

var imageArray = new Array();
imageArray[0] = "<img class='center-block' src='assets/images/georgefudge.gif'>";
imageArray[1] = "<img class='center-block' src='assets/images/elaine.gif'>";
imageArray[2] = "<img class='center-block' src='assets/images/newmanjambalaya.gif'>";
imageArray[3] = "<img class='center-block' src='assets/images/georgewaving.gif'>";
imageArray[4] = "<img class='center-block' src='assets/images/elainewig.gif'>";
imageArray[5] = "<img class='center-block' src='assets/images/jerry.gif'>";
imageArray[6] = "<img class='center-block' src='assets/images/bettemidler.gif'>";
imageArray[7] = "<img class='center-block' src='assets/images/kramerdancing.gif'>";

var correctAnswers =
    ["B. Bosco",
        "A. Marie",
        "C. David Berkowitz",
        "B. Jon Voight",
        "C. Wig",
        "D. Jerome",
        "A. Pineapple",
        "B. Kramer"];

var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;






// var currentQuestion = 0;
// var score = 0;

// var container = document.getElementById('quizContainer');
// var questionEl = document.getElementById('question');
// var opt1 = document.getElementById('opt1');
// var opt2 = document.getElementById('opt2');
// var opt3 = document.getElementById('opt3');
// var nextButton = document.getElementById('nextButton');
// var resultContent = document.getElementById('result');


// var totQuestions = questions.length;

// function loadQuestion (questionIndex) {
//     var q = questions[questionIndex];
//     questionEl.textContent = (questionIndex + 1) + '. ' + q.question;
//     opt1.textContent = q.option1;
//     opt2.textContent = q.option2;
//     opt3.textContent = q.option3;
// };

// loadQuestion();







// //click function for when user hits start button-initialize start game function
// $("#buttonStart").click(function(){
//     var currentQuestion = questions[currentQuestionIndex];
//     var choices = currentQuestion.answers;
//     var answer = currentQuestion.correctAnswer;
//     $("#quizContainer").append(currentQuestion.question);
//     console.log(currentQuestion.answers[answer]);

// //call displayQuestion function using current question object values
// displayQuestion(currentQuestion.question, currentQuestion.answers);
// });



// function submitAnswer(){
// //compare user choice against actual choice
// //show results of above code
// //increment correct or wrong answer
// //increment current question index
// currentQuestionIndex++;
// var currentQuestion = questions[currentQuestionIndex];
// var answer = currentQuestion.correctAnswer;
// displayQuestion(currentQuestion.question, currentQuestion.answers);
// }

// //display question 
// function displayQuestion(question, answers) {

// }

// //initialize countdown timer


// //take user input and show whether or not answer was correct


// //display new question and initialize countdown timer

// //show stats at the end of the quiz


// // If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

// // The scenario is similar for wrong answers and time-outs.

// // If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
// // If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.
// // On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).



// //NO CODE BELOW ME
// });