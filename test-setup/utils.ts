export function ignoreConsoleError() {
    jest.spyOn(global.console, 'error').mockImplementation(() => {
        return;
    });
}

export function ignoreConsoleWarning() {
    jest.spyOn(global.console, 'warn').mockImplementation(() => {
        return;
    });
}

export function ignoreConsoleLog() {
    jest.spyOn(global.console, 'log').mockImplementation(() => {
        return;
    });
}
