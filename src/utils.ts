import { CSSProperties } from 'react';

export interface IMutStyleRules {
    [selector: string]: CSSProperties;
}

export function generateUID(): string {
    const firstPart = (Math.random() * 46656) | 0;
    const secondPart = (Math.random() * 46656) | 0;
    const firstPartStr = ('000' + firstPart.toString(36)).slice(-3);
    const secondPartStr = ('000' + secondPart.toString(36)).slice(-3);
    return firstPartStr + secondPartStr;
}

function toDashLine(str: string): string {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

function convNumWithPixel(val: string | number): string {
    if (typeof val === 'string') {
        return val;
    }
    if (typeof val === 'number') {
        // return '0' if val equal to 0
        if (val === 0) return '0';
        return `${val}px`;
    }
    if (process.env.NODE_ENV === 'development') {
        // tslint:disable-next-line:no-console  Only show console when development
        console.error(
            `Type of ${typeof val} is invalid for css property value`
        );
    }
}

/**
 * Convert Css properties to html style content type
 * @param style CSS.Properties type object
 */
function convCSSObjToHtmlStyle(style: CSSProperties): string {
    let _style = '';
    Object.keys(style).forEach(property => {
        _style += `${[toDashLine(property)]}: ${convNumWithPixel(
            style[property]
        )};\n`;
    });
    // Remove end \n
    return _style.slice(0, -1);
}

/**
 * Convert Css properties to html style content type
 * @param rules {IMutStyleRules} Rules object
 * @param selectorPrefix {string} Scope prefix
 */
export function stringifyCSSRules(
    rules: IMutStyleRules,
    selectorPrefix: string = ''
): string {
    let _rules = '';
    Object.keys(rules).forEach(selector => {
        _rules += `${selectorPrefix + selector} {
${convCSSObjToHtmlStyle(rules[selector])}
}
`;
    });
    return _rules;
}
