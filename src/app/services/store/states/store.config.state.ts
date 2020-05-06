export interface ConfigState {
    title: string;
    breadcrumb: any;
}

export function defineConfigInitialState(): ConfigState {
    return {
        title: '',
        breadcrumb: []
    };
}
