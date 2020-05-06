import {AppPage} from '@e2e/app.po';

describe('App Root', () => {
    const page: AppPage = new AppPage();

    beforeEach(() => page.load());

    it('should have a progress bar', async () => {
        await expect(page.progress).toBeTruthy();
        await expect(page.progress.isPresent()).toBe(true);
    });

    it('should have a notifications container', async () => {
        await expect(page.notifications).toBeTruthy();
        await expect(page.notifications.isPresent()).toBe(true);
    });
});
