let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let score = 0;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawGift() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

/* 'Escuta' eventos de teclado e chama a função update quando
um evento é detectado.
*/
document.addEventListener('keydown', update);
function update(event) {
    if (event.keyCode == 37 && direction != 'right') {
        direction = 'left';
    }
    if (event.keyCode == 38 && direction != 'down') {
        direction = 'up';
    }
    if (event.keyCode == 39 && direction != 'left') {
        direction = 'right';
    }
    if (event.keyCode == 40 && direction != 'up') {
        direction = 'down';
    }
}

function initGame() {

    // Definindo novas posições ao ultrapassar a borda
    if (snake[0].x > 15 * box && direction == "right") {
        snake[0].x = 0;
    }
    if (snake[0].x < 0 && direction == 'left') {
        snake[0].x = 16 * box;
    }
    if (snake[0].y > 15 * box && direction == "down") {
        snake[0].y = 0;
    }
    if (snake[0].y < 0 && direction == 'up') {
        snake[0].y = 16 * box;
    }

    // Detecta colisões entre 'cabeça' e 'corpo'
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert("Fim de Jogo :((")
        }
    }

    createBG();
    createSnake();
    drawGift();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); // Remove o último elemento da lista
    }
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score += 50;
        document.getElementById('score').innerHTML = score;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); // Adiciona ao primeiro elemento

}

let game = setInterval(initGame, 100);