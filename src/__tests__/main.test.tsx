import { render } from '@testing-library/react';
import MutStyle from '../main';
import * as React from 'react';

describe('test MutStyle Component', () => {
    it('single child', () => {
        const renderComponent = () =>
            render(
                <MutStyle
                    css={{
                        '.hello': {
                            color: 'red',
                        },
                    }}
                >
                    <div className="hello">hello</div>
                </MutStyle>
            );
        const { getByText } = renderComponent();
        const component = getByText('hello');
        const style = window.getComputedStyle(component);
        expect(style.color).toBe('red');
    });

    it('multiple children', () => {
        const renderComponent = () =>
            render(
                <MutStyle
                    css={{
                        '.hello': {
                            color: 'red',
                        },
                    }}
                >
                    <div className="hello">hello</div>
                    <div className="hello">hello</div>
                </MutStyle>
            );
        const { getAllByText } = renderComponent();
        const components = getAllByText('hello');
        components.forEach(component => {
            const style = window.getComputedStyle(component);
            expect(style.color).toBe('red');
        });
    });

    it('multiple children with fragment', () => {
        const renderComponent = () =>
            render(
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
            );
        const { getAllByText } = renderComponent();
        const components = getAllByText('hello');
        components.forEach(component => {
            const style = window.getComputedStyle(component);
            expect(style.color).toBe('red');
        });
    });
});
