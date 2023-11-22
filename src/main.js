/**
 * Define reusable DOM elements
 * @type {HTMLElement}
 */
const field = document.getElementById('field');
const gameStatus = document.getElementById('game-status');
const gameBtn = document.querySelector('button');

const FIELD_SIZE = 10;

/**
 *  Game state
 *
 *  @type cell {string: 'empty', 'apple', 'snake'}
 *  @type cellCoordinate {row: number, col: number}
 *  @type direction {number: -1, 0, 1}
 *  @var virtualField {cell[][]}
 *  @var snakeCells {cellCoordinate[]}
 *  @var snakeDirection {direction[]: up/down, left/right}
 */
let virtualField = [];
let snakeCells = [];
let snakeDirection = [0, 0];

/**
 * Create a virtual field array with empty state and draw cells
 * @return {void}
 */
function initNewField() {
    field.innerHTML = '';
    virtualField = [];
    for (let r = 0; r < FIELD_SIZE; r++) {
        virtualField.push([]);
        for (let c = 0; c < FIELD_SIZE; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            field.appendChild(cell);
            virtualField[r].push('empty');
        }
    }
}

/**
 * Find empty cell on the field
 * and return a tuple of coordinates
 * @private
 * @return {number[]}
 */
function getEmptyCell() {
    let rndR = null;
    let rndC = null;
    while (rndC === null && rndR === null || virtualField[rndR][rndC] !== 'empty') {
        rndR = Math.floor(Math.random() * FIELD_SIZE);
        rndC = Math.floor(Math.random() * FIELD_SIZE);
    }
    return [rndR, rndC];
}

/**
 * Random empty cell becomes the cell with apple
 * @return {void}
 */
function putApple() {
    const [foodR, foodC] = getEmptyCell();
    virtualField[foodR][foodC] = 'apple';
}

/**
 * Put the snake at the random empty cell
 * @return {void}
 */
function putSnake() {
    const [snakeR, snakeC] = getEmptyCell();
    virtualField[snakeR][snakeC] = 'snake';
    snakeCells = [[snakeR, snakeC]];
}

/**
 * @private
 * @param cell {HTMLElement}
 * @param name {string}
 * @return {void}
 */
function removeClass(cell, name) {
    if (cell.classList.contains(name)) {
        cell.classList.remove(name);
    }
}

/**
 * Update DOM elements based on state of virtualField
 * @return {void}
 */
function updateField() {
    for (let r = 0; r < FIELD_SIZE; r++) {
        for (let c = 0; c < FIELD_SIZE; c++) {
            const cell = document.querySelector(`div[data-row="${r}"][data-col="${c}"]`);

            switch (virtualField[r][c]) {
                case 'apple':
                    removeClass(cell, 'snake');
                    cell.classList.add('apple');
                    break;
                case 'snake':
                    removeClass(cell, 'apple');
                    cell.classList.add('snake');
                    break;
                case 'empty':
                    removeClass(cell, 'snake');
                    removeClass(cell, 'apple');
                    break;
                default:
            }
        }
    }
}

/**
 * Change snake direction based on key code event
 *
 * @example
 * snakeDirection[0] === 1 snake goes up
 * snakeDirection[0] === -1 snake goes down
 * snakeDirection[0] === 0 snake goes horizontally
 * snakeDirection[1] === 1 snake goes left
 * snakeDirection[1] === -1 snake goes right
 * snakeDirection[1] === 0 snake goes vertically
 *
 * @private
 * @param e {KeyboardEvent}
 * @return {void}
 */
function handleKeyboard(e) {
    switch (e.code) {
        case 'ArrowUp':
            if (snakeDirection[0] === 1) {
                snakeCells.reverse()
            }
            snakeDirection = [-1, 0]
            break
        case 'ArrowRight':
            if (snakeDirection[1] === -1) {
                snakeCells.reverse()
            }
            snakeDirection = [0, 1]
            break
        case 'ArrowDown':
            if (snakeDirection[0] === -1) {
                snakeCells.reverse()
            }
            snakeDirection = [1, 0]
            break
        case 'ArrowLeft':
            if (snakeDirection[1] === 1) {
                snakeCells.reverse()
            }
            snakeDirection = [0, -1]
            break
        default:
    }
}

/**
 * Add global keydown handler
 * @return {void}
 */
function activateKeyboard() {
    window.addEventListener('keydown', handleKeyboard);
    window.onbeforeunload = () => window.removeEventListener('keydown', handleKeyboard);
}

/**
 * Game process
 *
 * 1. build the game field
 * 2. put an apple on the field randomly
 * 3. put a snake on the board randomly
 * 4. add a keyboard handler
 * 5. check field changes and game status on tick
 */


initNewField(); // step 1
putApple(); // step 2
putSnake(); // step 3

updateField(); // re-render the game field with apple and snake

activateKeyboard(); // step 4
