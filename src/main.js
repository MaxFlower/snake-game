console.log('main.js loaded and executed');

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
 *  virtualField {cell[][]}
 */
let virtualField = [];

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
