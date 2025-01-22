let display = document.getElementById('display');


let currentInput = '0';


function clearScreen()

{
  currentInput = '0';
  updateDisplay();
}



function deleteLast() 
{
  if (currentInput.length === 1 || currentInput === 'Error') 
  {
    currentInput = '0';
  } 
  else 
  {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}


function updateDisplay() 
{
  display.value = currentInput;
}


function appendToDisplay(value) 
{
  if (currentInput === '0' || currentInput === 'Error') 
    {
    currentInput = value;
  } 
  else 
  {
    currentInput += value;
  }
  updateDisplay();
}


function appendDot() 
{
  if (!currentInput.includes('.')) 
  {
    currentInput += '.';
  }
  updateDisplay();
}


function calculateResult() 
{
  try 
  {
    currentInput = simpleCalculate(currentInput).toString();
  } 
  catch (error) 
  {
    currentInput = 'Error';
  }
  updateDisplay();
}

function simpleCalculate(expression)
 {
  let operands = expression.split(/([+\-*/])/); 

  
  for (let i = 0; i < operands.length; i++) 
    {
    if (operands[i] === '*' || operands[i] === '/') 
      {
      let left = parseFloat(operands[i - 1]);
      let right = parseFloat(operands[i + 1]);
      let result;
      if (operands[i] === '*') 
        {
        result = left * right;
      } 
      else if (operands[i] === '/')
      {
        if (right === 0) throw new Error("Division by zero");
        result = left / right;
      }
      operands[i - 1] = result.toString();
      operands.splice(i, 2); 
      i--; 
    }
  }

  
  let result = parseFloat(operands[0]);
  for (let i = 1; i < operands.length; i += 2) {
    let operator = operands[i];
    let nextValue = parseFloat(operands[i + 1]);
    if (operator === '+') {
      result += nextValue;
    } else if (operator === '-') {
      result -= nextValue;
    }
  }

  return result;
}
