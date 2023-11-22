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
 * Game process
 *
 * 1. build the game field
 * 2. put apple on the field randomly
 * 3. put snake on the board randomly
 * 4. add keyboard handler
 * 5. check field changes and game status on tick
 */


initNewField(); // step 1
