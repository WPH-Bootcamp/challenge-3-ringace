'use strict'

// Import prompt-sync for CLI input
const prompt = require('prompt-sync')({ sigint: true })

/* ---------------------------------------------------
   1. INPUT VALIDATION FUNCTIONS
--------------------------------------------------- */

// Validate number input
function getValidNumberInput(promptMessage) {
  let input
  while (true) {
    input = prompt(promptMessage)

    // Explicit type conversion
    const converted = Number(input)

    // Validate NaN
    if (!isNaN(converted)) {
      return converted
    }

    console.log('❌ Invalid number, please try again.')
  }
}

// Validate operator input
function getValidOperatorInput(promptMessage) {
  const validOperators = ['+', '-', '*', '/', '%', '**']
  let operator

  while (true) {
    operator = prompt(promptMessage)

    if (validOperators.includes(operator)) {
      return operator
    }

    console.log('❌ Invalid operator! Choose one of: +, -, *, /, %, **')
  }
}

// Validate user selection to continue calculate or not
function exitCalculator(promptMessage) {
  const validInput = ['yes', 'no']
  let isContinue

  while (true) {
    isContinue = prompt(promptMessage)

    if (validInput.includes(isContinue)) {
      return isContinue
    }

    console.log('❌ Invalid input! Input must be exactly "yes" or "no" (case-sensitive).')
  }
}

/* ---------------------------------------------------
   2. ARITHMETIC FUNCTIONS
--------------------------------------------------- */

function add(a, b) {
  return a + b
}
function subtract(a, b) {
  return a - b
}
function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  if (b === 0) return 'Error: Division by zero!'
  return a / b
}

function modulo(a, b) {
  return a % b
}
function power(a, b) {
  return a ** b
}

/* ---------------------------------------------------
   3. MAIN CALCULATOR LOOP
--------------------------------------------------- */

console.log('📟 Welcome to the Interactive Calculator & Data Analyzer!')
console.log('-----------------------------------------------------------')

while (true) {
  // Get user inputs
  const num1 = getValidNumberInput('Enter first number: ')
  const operator = getValidOperatorInput('Enter operator (+, -, *, /, %, **): ')
  const num2 = getValidNumberInput('Enter second number: ')

  let result

  // Switch-based operation
  switch (operator) {
    case '+':
      result = add(num1, num2)
      break
    case '-':
      result = subtract(num1, num2)
      break
    case '*':
      result = multiply(num1, num2)
      break
    case '/':
      result = divide(num1, num2)
      break
    case '%':
      result = modulo(num1, num2)
      break
    case '**':
      result = power(num1, num2)
      break
    default:
      result = 'Unknown operator!'
  }

  // Result to display
  const resultDisplay = result ?? 'Result is undefined or null, something went wrong!'

  console.log(`\n🧮 Result: ${resultDisplay}`)

  /* ---------------------------------------------------
     4. RESULT ANALYSIS
  --------------------------------------------------- */

  console.log('📊 Analyzing result...')

  // Get type of result
  const type = result !== null ? typeof result : null
  console.log(`➡️ Data Type: ${type}`)

  if (type === 'number') {
    // Define the number is integer or not
    const isInteger = Number.isInteger(result)

    // Positive / Negative / Zero
    if (result > 0) {
      console.log('➡️ The result is Positive')
    } else if (result < 0) {
      console.log('➡️ The result is Negative')
    } else {
      console.log('➡️ The result is Zero')
    }

    // Integer / Float and Even / Odd (only for integers)
    if (isInteger) {
      const evenOdd = result % 2 === 0 ? 'Even' : 'Odd'
      console.log('➡️ The result is an Integer')
      console.log(`➡️ The result is ${evenOdd}`)
    } else {
      console.log('➡️ The result is a Floating Point')
    }
  }

  // Return error when result type is not number
  if (type === 'string' || type === undefined || type === null) {
    console.log(`❗ Error message: ${result}`)
  }

  /* ---------------------------------------------------
     5. EXIT CALCULATOR
  --------------------------------------------------- */

  // Get the user selection to continue calculate or not
  const again = exitCalculator('Do you want to calculate again? Type "yes" or "no": ')

  // Exit when 'no' has chosen
  if (again === 'no') {
    console.log('👋 Exiting calculator. Goodbye!')
    break
  }

  console.log('\n----------------------------------------------------------------------------\n')
}
