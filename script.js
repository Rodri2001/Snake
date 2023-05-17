// Definir el tamaño del canvas y la escala del juego
const canvasSize = 400;
const scale = 20;
const rows = canvasSize / scale;
const columns = canvasSize / scale;
let score = 0

// Crear el canvas
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
canvas.width = canvasSize;
canvas.height = canvasSize;


// Crear la serpiente
let snake = [];
snake[0] = {
    x: Math.floor(rows / 2) * scale,
    y: Math.floor(columns / 2) * scale
};

// Inicializar la dirección de la serpiente
let direction;

// Generar la comida de forma aleatoria
let food = {
    x: Math.floor(Math.random() * rows) * scale,
    y: Math.floor(Math.random() * columns) * scale
};

// Controlar las direcciones permitidas
document.addEventListener('keydown', directionControl);

function directionControl(event) {


    if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}

// Función para dibujar en el canvas
function draw() {
    // Dibujar el fondo
    context.fillStyle = '#ccc';
    context.fillRect(0, 0, canvasSize, canvasSize);

    // Dibujar la serpiente
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = '#000';
        context.fillRect(snake[i].x, snake[i].y, scale, scale);
    }

    // Dibujar la comida
    context.fillStyle = '#f00';
    context.fillRect(food.x, food.y, scale, scale);
    // Mostrar el puntaje
    displayScore();
}

function changeDirection(direction) {
    // Aquí deberías tener una variable que almacene la dirección actual de la serpiente
    let currentDirection = '';

    // Obtener referencias a los botones de control
    const upButton = document.getElementById('upButton');
    const downButton = document.getElementById('downButton');
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');

    // Asignar eventos de clic a los botones de control
    upButton.addEventListener('click', () => {
        changeDirection('up');
    });
    downButton.addEventListener('click', () => {
        changeDirection('down');
    });
    leftButton.addEventListener('click', () => {
        changeDirection('left');
    });
    rightButton.addEventListener('click', () => {
        changeDirection('right');
    });
    // Actualizar la dirección según el botón de control presionado
    switch (direction) {
        case 'up':
            if (currentDirection !== 'down') {
                currentDirection = 'up';
            }
            break;
        case 'down':
            if (currentDirection !== 'up') {
                currentDirection = 'down';
            }
            break;
        case 'left':
            if (currentDirection !== 'right') {
                currentDirection = 'left';
            }
            break;
        case 'right':
            if (currentDirection !== 'left') {
                currentDirection = 'right';
            }
            break;
        default:
            break;

    }

    // Aquí deberías tener la lógica para aplicar la nueva dirección a la serpiente
    // Por ejemplo, puedes llamar a una función que actualice la dirección de la serpiente en tu juego Snake
    directionControl(currentDirection);
}



// Función para mover la serpiente
function move() {
    let head = { x: snake[0].x, y: snake[0].y };

    // Actualizar la posición de la cabeza en función de la dirección
    if (direction === 'LEFT') {
        head.x -= scale;
    } else if (direction === 'UP') {
        head.y -= scale;
    } else if (direction === 'RIGHT') {
        head.x += scale;
    } else if (direction === 'DOWN') {
        head.y += scale;
    }

    // Añadir la nueva cabeza a la serpiente
    snake.unshift(head);

    // Comprobar si la serpiente ha comido la comida
    if (head.x === food.x && head.y === food.y) {
        // Generar nueva comida de forma aleatoria
        score++
        food = {
            x: Math.floor(Math.random() * rows) * scale,
            y: Math.floor(Math.random() * columns) * scale
        };
    } else {
        // Si no ha comido, eliminar la cola de la serpiente
        snake.pop();
    }
}

// Función principal del juego
function game() {
    // Actualizar la posición de la serpiente y dibujar en cada fotograma
    draw();
    move();

    // Verificar colisiones
    checkCollision();

    // Establecer la velocidad del juego
    setTimeout(game, 100);
}

// Función para verificar colisiones
function checkCollision() {
    // Colisión con las paredes del canvas
    if (
        snake[0].x < 0 ||
        snake[0].x >= canvasSize ||
        snake[0].y < 0 ||
        snake[0].y >= canvasSize
    ) {
        // Reiniciar el juego si hay colisión con las paredes
        snake = [];
        snake[0] = {
            x: Math.floor(rows / 2) * scale,
            y: Math.floor(columns / 2) * scale
        };
        direction = undefined;
        food = {
            x: Math.floor(Math.random() * rows) * scale,
            y: Math.floor(Math.random() * columns) * scale
        };
        score = 0
    }

    // Colisión con el cuerpo de la serpiente
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            // Reiniciar el juego si hay colisión con el cuerpo de la serpiente
            snake = [];
            snake[0] = {
                x: Math.floor(rows / 2) * scale,
                y: Math.floor(columns / 2) * scale
            };
            direction = undefined;
            food = {
                x: Math.floor(Math.random() * rows) * scale,
                y: Math.floor(Math.random() * columns) * scale
            };
        }
    }
}

// Función para mostrar el puntaje en la pantalla
function displayScore() {
    context.fillStyle = '#000';
    context.font = '20px Arial';
    context.fillText('Score: ' + score, 10, 30);
}


// Iniciar el juego
game();
