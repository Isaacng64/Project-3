import { createElement } from 'lwc';
import Key from 'c/key';

/* Test fail to load TypeError: Cannot read property 'color' of undefined*/

describe('c-key', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('ClickHandler is fired when the user clicks a key', () => {

        const keyElement = createElement('c-key', { is: Key });

        document.body.appendChild(keyElement);

        const keyEventHandler = jest.fn();
        keyElement.addEventListener('keyclickce', keyEventHandler);

        const keyEventKey = keyElement.shadowRoot.querySelector('div');
        keyEventKey.click();

        return Promise.resolve().then(() => {
            expect(keyEventHandler).toHaveBeenCalled();
        });
    });
});