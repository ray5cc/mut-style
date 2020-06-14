import React, {
    cloneElement,
    Component,
    Fragment,
    isValidElement,
    Children,
} from 'react';
import { generateUID, IMutStyleRules, stringifyCSSRules } from './utils';

interface IMutStyle {
    updateCSS: (rules: string) => void;
}

const MUT_STYLE_CLASS = 'data-mut-style-class';

function createStyleToDocument(styleContent: string): IMutStyle {
    const head = document.head;
    const style = document.createElement('style');
    const css = document.createTextNode(styleContent);
    style.setAttribute('type', 'text/css');
    head.appendChild(style);
    style.appendChild(css);
    return {
        updateCSS(rules) {
            css.nodeValue = rules;
        },
    };
}

interface IMutStyleProps {
    css: IMutStyleRules;
}

// interface IMutStyleState {}

export default class MutStyle extends Component<
    IMutStyleProps,
    any
    // IMutStyleState
> {
    private uid = generateUID();
    private scopePrefix = `[${MUT_STYLE_CLASS}="${this.uid}"]`;
    private mutStyle = createStyleToDocument(
        stringifyCSSRules(this.props.css, this.scopePrefix)
    );
    private childrenRefs = [];

    componentDidMount() {
        this.setScopeAttrToChildren();
    }

    componentDidUpdate() {
        this.mutStyle.updateCSS(
            stringifyCSSRules(this.props.css, this.scopePrefix)
        );
        this.setScopeAttrToChildren();
    }

    setScopeAttrToChildren = () => {
        this.childrenRefs.forEach(childRef => {
            if (childRef instanceof Element) {
                childRef.setAttribute(MUT_STYLE_CLASS, this.uid);
            }
        });
    };

    setChildRef = (ref, index) => {
        this.childrenRefs[index] = ref;
    };

    assignChildRef = (child, index: number = 0) => {
        if (isValidElement(child)) {
            if (child.type === Fragment) {
                return cloneElement(
                    child,
                    {},
                    // @ts-ignore Child props never be undefined
                    Children.map(child.props.children, this.assignChildRef)
                );
            }

            return cloneElement(child, {
                // @ts-ignore
                ref: ref => {
                    this.setChildRef(ref, index);
                    // @ts-ignore Keep the origin ref
                    if (typeof child.ref === 'function') {
                        // @ts-ignore
                        child.ref(ref);
                    }
                },
            });
        } else {
            return child;
        }
    };

    render() {
        const { children } = this.props;
        if (Array.isArray(children)) {
            return Children.map(children, this.assignChildRef);
        }
        return this.assignChildRef(children);
    }
}
