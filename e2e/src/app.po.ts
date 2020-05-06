import {browser, by, element, ElementFinder, protractor} from 'protractor';
import {StorageKeys} from '../../src/app/app.constants';

export class AppPage {
    get progress() {
        return element(by.css('ng-progress'));
    }

    get notifications() {
        return element(by.css('app-notifications'));
    }

    /**
     * Load the root page
     */
    async load() {
        await browser.get('/');
    }

    /**
     * Execute a click on a specified element to coords 0,0
     */
    async performClick(to: ElementFinder, coords: {x: number, y: number} = { x: 0, y: 0 }) {
        await browser.actions()
            .mouseMove(to, coords)
            .perform();

        return browser.actions().click().perform();
    }

    /**
     * Send exactly 'count' times the back space key on a input/textarea field
     * to: {ElementFinder} to Field where the key sequence must be done
     * count: {number} count How many times the backspace key must be sent
     */
    async sendBackspaceKeysSequence(to: ElementFinder, count: number) {
        const backspaceSequenceString: string = Array(count).fill(protractor.Key.BACK_SPACE).join('');

        await to.sendKeys(backspaceSequenceString);
    }

    /**
     * Clear the current field value
     * control: {ElementFinder} control Field to clear from its value
     */
    async clearFieldValue(control: ElementFinder) {
        const value = await control.getAttribute('value');
        const backspaceSequenceString = Array(value.length).fill(protractor.Key.BACK_SPACE).join('');

        await control.sendKeys(backspaceSequenceString);
    }

    /**
     * Fetches a value from localStorage for the given key
     */
    async localStorageValueForKey(key: string) {
        return browser.executeScript(`return window.localStorage.getItem('${StorageKeys.STORAGE_PREFIX}.${key}');`);
    }

    /**
     * Clears all stored value inside the localStorage for current domain
     */
    async clearLocalStorage() {
        return browser.executeScript(`return window.localStorage.clear();`);
    }
}
