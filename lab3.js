const readline = require('readline');

// Створення інтерфейсу для вводу
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

// Функція для отримання матриці від користувача
function getMatrix(rows, cols, callback) {
const matrix = [];
let rowIndex = 0;

function askForRow() {
if (rowIndex < rows) {
rl.question(`Введіть ${cols} елементів для рядка ${rowIndex + 1} (через пробіл): `, (input) => {
const row = input.split(' ').map(Number);
if (row.length !== cols) {
console.log(`Будь ласка, введіть рівно ${cols} числа для цього рядка.`);
askForRow(); // Вивести, якщо кількість елементів не відповідає
} else {
matrix.push(row);
rowIndex++;
askForRow();
}
});
} else {
callback(matrix); // Коли всі рядки введено, видати результат
}
}

askForRow();
}

// Множення матриць
function multiplyMatrices(matrix1, matrix2) {
const result = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

for (let i = 0; i < 4; i++) {
for (let j = 0; j < 4; j++) {
let sum = 0;
for (let k = 0; k < 4; k++) {
sum += matrix1[i][k] * matrix2[k][j];
}
result[i][j] = sum;
}
}

return result;
}

getMatrix(4, 4, (matrix1) => {
console.log('Матриця 1:');
console.table(matrix1);

getMatrix(4, 4, (matrix2) => {
console.log('Матриця 2:');
console.table(matrix2);
       
const result = multiplyMatrices(matrix1, matrix2);
console.log('Результат множення матриць:');
console.table(result);

rl.close(); // Закрити інтерфейс після завершення
});
});
