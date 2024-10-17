const input_field = document.getElementById('input');
const output_field = document.getElementById('output');
const historyContainer = document.getElementById('history');
const toggleIcon = document.getElementById('toggleIcon');

// A function to toggle between dark and light mode
toggleIcon.onclick = function () {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains('dark-theme')){
        toggleIcon.innerHTML = '<i class="fas fa-sun icon"></i>';
    }
    else{
        toggleIcon.innerHTML = '<i class="fas fa-moon icon"></i>';
    }
}

// local storage for the history feature. 
let history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
updateHistory(); 

//A function that appends operands to the input div.

function appendToDisplay(input) {
    const currentInput = input_field.innerText; 
    if (currentInput.length < 15) {
        const lastChar = currentInput.slice(-1);
        const operators = /[+\-*/%]/;
    if (operators.test(input) && operators.test(lastChar)) {
        return;
    }
    if (input === '.' && currentInput.split(/[\+\-\*\/%]/).pop().includes('.')) {
        return; 
    }
    input_field.innerHTML += input;
    evalExpression();                
    } else {
         alert("You can't enter more than 15 characters.");
     }
}

// A function that clears the displayed expression.

function clearDisplay() {
    input_field.innerHTML = '';
    output_field.innerHTML = '&nbsp;'; 
}
//A function that evaluates the input expressions and automatically appends the results to the output div without needing to click the equal button.

function evalExpression() {
    const expression = input_field.innerHTML;
    const hasOperator = /[+\-*/%]/.test(expression);
    const hasOperand = /\d/.test(expression);

    if (hasOperator && hasOperand) {
        try {
            let evalExpression = expression.replace(/ln\(([^)]+)\)/g, 'Math.log($1)')
                .replace(/log\(([^)]+)\)/g, 'Math.log10($1)')
                .replace(/\be/g, 'Math.E');

            if (evalExpression.includes('Math.log(') || evalExpression.includes('Math.log10(')) {
                const logInput = evalExpression.match(/Math\.log\(([^)]+)\)/) || evalExpression.match(/Math\.log10\(([^)]+)\)/);
                if (logInput && parseFloat(logInput[1]) <= 0) {
                    output_field.innerHTML = "Error: Logarithm of non-positive number";
                    return;
                }
            }

            if (evalExpression.includes('/0')) {
                output_field.innerHTML = " ";
                alert("can't divide by 0. ");
                return;
            }

            const result = new Function(`return ${evalExpression}`)();
            output_field.innerHTML = formatResult(result);
        } catch (error) {
            console.error('Error evaluating expression:', error);
            output_field.innerHTML = "&nbsp";
        }
    } else {
        output_field.innerHTML = '&nbsp;'; // Clear output if no valid expression
    }
}
function formatResult(result) {
    const resultStr = result.toString();
    if (resultStr.length > 10) {
    return result.toExponential(2); 
    }
    return resultStr;
}
function calculate() {
    const expression = input_field.innerHTML.trim();
    const hasOperator = /[+\-*/%]/.test(expression);
    const hasOperand = /\d/.test(expression);
    const validExpression = expression.replace(/ln\(([^)]+)\)/g, 'Math.log($1)')
    .replace(/log\(([^)]+)\)/g, 'Math.log10($1)')
    .replace(/e/g, 'Math.E');
    if (validExpression.includes('/0')) {
    output_field.innerHTML = " ";
    alert("can't divide by 0. ");
    return;
    }
        try {
        const result = new Function(`return ${validExpression}`)();
        history.push(`${expression} = ${result}`);
        localStorage.setItem('calculatorHistory', JSON.stringify(history)); 
        input_field.innerHTML = result;
        output_field.innerHTML = '&nbsp;'; 
        updateHistory();
        } 
        catch(error) {
            output_field.innerHTML = "&nbsp";
            alert("in valid expression.")
    }
}
// A function that updates the history
function updateHistory() {
    historyContainer.innerHTML = history.map((item, index) =>
    `<div class="history-item">
        <span onclick="selectHistory('${item.split(' = ')[0]}')">${item}</span>
            <button class="del-btn" onclick="delHistory(${index})">
                <i class="fas fa-trash"></i>
                </button>
    </div>`
    ).join('');
    }

// A function to retrieve data from history to the input div. 

function selectHistory(expression) {
    clearDisplay();
    input_field.innerHTML = expression;
    }

// A function to remove a specific entry from the history container.  

function delHistory(index) {
    history.splice(index, 1);
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
    updateHistory(); 
}

// A function to remove the last element from the input div.

function slicer() {
    input_field.innerHTML = input_field.innerHTML.slice(0, -1);
    if (input_field.innerHTML === '') {
        output_field.innerHTML = '&nbsp;'; 
    } 
    else {
        evalExpression(); 
    }
}
