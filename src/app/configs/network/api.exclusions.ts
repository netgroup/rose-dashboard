export function isExcludedFromHandling(url: string): boolean {
    return url.match(/^\/assets\/(icons|fonts|backgrounds)/) != null;
}
