import * as React from 'react';

import MutStyle from '../main';
import { useCallback, useState } from 'react';

export default {
    title: 'test',
};

export const Primary = () => {
    return (
        <>
            <MutStyle
                css={{
                    '.hello': {
                        color: 'red',
                    },
                }}
            >
                <>
                    <div className="hello">hello</div>
                    <div className="hello">hello</div>
                </>
            </MutStyle>
            <MutStyle
                css={{
                    '.hello': {
                        color: 'red',
                    },
                }}
            >
                <div
                    className="hello"
                    ref={ref => {
                        // tslint:disable-next-line:no-console
                        console.info(ref);
                    }}
                >
                    hello
                </div>
                <div className="hello">hello</div>
            </MutStyle>
        </>
    );
};

export function Foo() {
    const [color, setColor] = useState('red');

    return (
        <div>
            <MutStyle css={{ '.hello': { color } }}>
                <div className="hello">hello</div>
            </MutStyle>
            <button
                onClick={() => {
                    setColor(color === 'red' ? 'blue' : 'red');
                }}
            >
                Change text color
            </button>
        </div>
    );
}
