import { IMutStyleRules, stringifyCSSRules } from '../utils';

describe('test MutStyle Component', () => {
    it('single child', () => {
        const css: IMutStyleRules = {
            '.hello': {
                maxHeight: 100,
            },
            '.hello.you': {
                background: 'red',
            },
        };
        expect(stringifyCSSRules(css)).toBe(`.hello {
max-height: 100px;
}
.hello.you {
background: red;
}
`);
    });
});
