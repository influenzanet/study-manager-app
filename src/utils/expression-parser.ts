
import { Expression, isExpression } from "survey-engine/lib/data_types";

export const expressionToString = (exp: Expression, space: number): string => {
    let expStr = '$' + exp.name;
    if (exp.returnType) {
        expStr += '<' + exp.returnType + '>';
    }
    expStr += '(\n' + ' '.repeat(space + 2);
    /*
    if (Array.isArray(exp.data)) {
        exp.data.forEach((d, index) => {
            if (isExpression(d)) {
                expStr += expressionToString(d, space + 2);
            } else if (typeof (d) === 'string') {
                expStr += '"' + d + '"';
            } else {
                expStr += d.toString();
            }
            if (index < exp.data.length - 1) {
                expStr += ',';
            }
            expStr += '\n';
            if (index < exp.data.length - 1) {
                expStr += ' '.repeat(space + 2);
            }

        });
    } else if (isExpression(exp.data)) {
        expStr += expressionToString(exp.data, space);
    } else if (typeof (exp.data) === 'string') {
        expStr += ' '.repeat(space + 2) + '"' + exp.data + '"';
    } else {
        // expStr += ' '.repeat(space + 2) + exp.data.toString();
    }
    */
    expStr += ' '.repeat(space) + ')';
    return expStr;
}

export const parseExpression = (exp: string): Expression | null => {
    exp = exp.trim();
    if (!exp || exp.length < 1) {
        console.error('expression empty');
        return null;
    }

    if (exp[0] !== '$') {
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
        // name: name,
        name: 'getContext' // TODO: just placeholder here
    }
    if (dtype) {
        // TODO: value['dtype'] = dtype;
    }
    if (data) {
        // TODO:  value['data'] = data;
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