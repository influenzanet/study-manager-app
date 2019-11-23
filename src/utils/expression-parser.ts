import { Expression, isExpression } from "survey-engine/lib/data_types";

export const expressionToString = (exp: Expression): string => {
    let expStr = '$' + exp.name;
    if (exp.dtype) {
        expStr += '<' + exp.dtype + '>';
    }
    expStr += '(';

    if (Array.isArray(exp.data)) {
        exp.data.forEach(d => {
            if (isExpression(d)) {
                expStr += expressionToString(d);
            } else if (typeof(d) === 'string') {
                expStr += '"' + d + '"';
            } else {
                expStr += d.toString();
            }
            expStr += ', ';
        });
        expStr = expStr.slice(0, -2);
    } else if (isExpression(exp.data)) {
        expStr += expressionToString(exp.data);
    } else if (typeof(exp.data) === 'string') {
        expStr += '"' + exp.data + '"';
    } else {
        expStr += exp.data.toString();
    }

    expStr += ')';
    return expStr;
}

export const parseExpression = (exp: string): Expression | null => {
    exp = exp.trim();

    if (exp.length < 1) {
        console.error('expression empty');
        return null;
    } else if (exp[0] !== '$') {
        console.error('wrong start character: ' + exp);
        return null;
    }

    const argStart = exp.indexOf('(');
    const argEnd = exp.lastIndexOf(')');

    const dtypeEnd = exp.lastIndexOf('>', argStart);
    const dtypeStart = exp.lastIndexOf('<', dtypeEnd);

    const dtype = (dtypeStart > -1 && dtypeEnd > -1) ?
        exp.slice(dtypeStart + 1, dtypeEnd).trim() : undefined;

    const name = dtypeStart > -1 ? exp.slice(1, dtypeStart).trim() : exp.slice(1, argStart).trim();
    const data = (argStart > -1 && argEnd > -1) ? parseData(exp.slice(argStart + 1, argEnd).trim()) : undefined;

    let value: Expression = {
        name: name,
    }
    if (dtype) {
        value['dtype'] = dtype;
    }
    if (data) {
        value['data'] = data;
    }

    return value;
}

const parseData = (dataStr: string): any => {
    dataStr = dataStr.trim();
    if (dataStr.length < 1) {
        return;
    }

    const commas: Array<number> = [];
    let openBrackets = 0;
    let openQuotes = false;
    for (let i = 0; i < dataStr.length; i++) {
        const ch = dataStr[i];
        if (ch === '"') {
            openQuotes = !openQuotes;
        } else if (ch === '(' && !openQuotes) {
            openBrackets += 1;
        } else if (ch === ')' && !openQuotes) {
            openBrackets -= 1;
        } else if (!openQuotes && !openBrackets && ch === ',') {
            commas.push(i);
        }
    }
    commas.push(dataStr.length);

    if (commas.length < 1) {
        console.log('parse string into single value');
        return dataStr;
    }
    let item: any = dataStr.slice(0, commas[0]).trim()
    if (item.length > 0) {
        if (item[0] === '$') {
            item = parseExpression(item);
        } else if (item[0] !== '"') {
            item = parseFloat(item);
        } else {
            item = item.slice(1, item.length - 1);
        }
    }
    let items = [
        item
    ];
    for (let i = 1; i < commas.length; i++) {
        item = dataStr.slice(commas[i - 1] + 1, commas[i]).trim();
        if (item.length > 0) {
            if (item[0] === '$') {
                item = parseExpression(item);
            } else if (item[0] !== '"') {
                item = parseFloat(item);
            } else {
                item = item.slice(1, item.length - 1);
            }
        }
        items.push(item);
    }

    return items;
}