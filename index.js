// Число игрока и инициализация других элементов страницы
let playerNumber = document.getElementById('user-guess');
let attempts = document.getElementById('attempts');
let checkButton = document.getElementById('check-button');

// Инициализация переменных
let minNumber = parseInt(document.getElementById("min-number").value);
let maxNumber = parseInt(document.getElementById("max-number").value);
let randomNumber = generateRandomNumber(minNumber, maxNumber);
let numAttempts = 0;

// Функция для генерации случайного числа в заданном диапазоне
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для обработки предположения пользователя
function handleGuess() {
    const result = document.getElementById("result");
    let message;
    let userGuess = parseInt(document.getElementById("user-guess").value);
    let numAttempts = Number(attempts.innerText.split(' ')[1]);
    // Проверка введенного числа на валидность
    if (isNaN(userGuess) || userGuess < minNumber || userGuess > maxNumber) {
        console.log(minNumber);
        console.log(maxNumber);
        alert("Пожалуйста, введите число в диапазоне от " + minNumber + " до " + maxNumber + ".");
        return;
    }
    
    numAttempts += 1;
    attempts.innerHTML = "Попыток: " + numAttempts;
    
    // Проверка угаданного числа
if (userGuess === randomNumber) {
    message = ("Поздравляю! Вы угадали число " + randomNumber + " за " + numAttempts + " попыток.");
    result.innerHTML = message;
    checkButton.setAttribute('disabled', 'disabled');
    playerNumber.setAttribute('disabled', 'disabled')
    // resetGame();
} else {
    // Вывод подсказки
    if (numAttempts % 3 === 0) {
        let isEven = (randomNumber % 2 === 0) ? "четное" : "нечетное";
        message = (userGuess < randomNumber) ? "Загаданное число больше, чем " + userGuess + " и загаданное число является " + isEven + "." : "Загаданное число меньше, чем " + userGuess + "   и загаданное число является " + isEven + ".";
        result.innerHTML = message;
        playerNumber.value = '';
    } else {
        // Вывод подсказки о том, больше или меньше загаданное число
        message = (userGuess < randomNumber) ? "Загаданное число больше, чем " + userGuess + "." : "Загаданное число меньше, чем " + userGuess + ".";
        result.innerHTML = message;
        playerNumber.value = '';
        }
    }
}

// Функция сброса игры
function resetGame() {
minNumber = parseInt(document.getElementById("min-number").value);
maxNumber = parseInt(document.getElementById("max-number").value);
playerNumber.value = '';
result.innerHTML = '';
attempts.innerHTML = 'Попыток: 0'
playerNumber.removeAttribute('disabled');
checkButton.removeAttribute('disabled');
minNumber = parseInt(document.getElementById("min-number").value);
maxNumber = parseInt(document.getElementById("max-number").value);
randomNumber = generateRandomNumber(minNumber, maxNumber);

// Проверка введенных значений минимального и максимального числа
if (isNaN(minNumber) || isNaN(maxNumber) || minNumber >= maxNumber || minNumber < 1 || maxNumber < 1) {
    alert("Пожалуйста, введите корректный диапазон чисел.");
    return;
}

// Сброс переменных и генерация нового случайного числа
randomNumber = generateRandomNumber(minNumber, maxNumber);
numAttempts = 0;

// Очистка поля ввода
document.getElementById("user-guess").value = "";
}


// Обработчик кнопки "Проверить"
document.getElementById("check-button").addEventListener("click", handleGuess);

// Обработчик кнопки "Начать заново"
document.getElementById("reset-button").addEventListener("click", resetGame);