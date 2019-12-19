function evaluate(equation) {
    const EQUALS = '=';
    
    if (equation.length > 0) {

        let arr = equation.split(EQUALS);

        if(arr.length == 2) {
            let lhs = arr[0];
            let rhs = arr[1];
            let counter = 1;
            let equationSolved = false;
            let modifiedLHS = '';
            let modifiedRHS = '';

            while(!equationSolved && counter < Number.MAX_SAFE_INTEGER) {
                modifiedLHS = modifyExpression(lhs, counter);
                modifiedRHS = modifyExpression(rhs, counter);

                if(eval(modifiedLHS) === eval(modifiedRHS)) {
                    equationSolved = true;
                    return counter;
                }
                counter++;
            }
        }
    }
    return -1;
}

function modifyExpression (arr, counter) {
    let modifiedExp = '';
    let queue = [];

    for (let i=0; i < arr.length; i++) {
        let char = arr[i];
        //ignore spaces in expression
        if(char === ' ') {
           continue; 
        }
        if(isOperator(char)) {

            while(queue.length > 0) {
                let elem = queue.shift();
                modifiedExp = updateVariableParam(elem, modifiedExp, counter);
            }
            modifiedExp += char;
        } else {
           queue.push(arr[i]); 
        }
    }
    while(queue.length > 0) {
      let elem = queue.shift();
      modifiedExp = updateVariableParam(elem, modifiedExp, counter);
    }
    return modifiedExp;
}

function updateVariableParam(elem, arr, counter) {
    const VARIABLE = 'x';
    const PRODUCT = '*';

    let len = arr.length;

    if (elem === VARIABLE) {
        
        if(len > 0 && !isOperator(arr[len-1])) {
            arr += PRODUCT;
        }
        arr += counter
    } else {
        arr += elem;
    }
    return arr;
}

function isOperator(char) {
    const SUM = '+';
    const DIFFERENCE = '-';

    if(char === SUM || char === DIFFERENCE) {
        return true;
    }
    return false;
}
evaluate('10 + 2x= 10 + x + 10');
