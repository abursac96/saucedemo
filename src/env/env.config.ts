const QA = {
    BASE_URL: 'https://www.saucedemo.com',
};

const DEV = {
    BASE_URL: 'https://www.saucedemo.com',
};

const UAT = {
    BASE_URL: 'https://www.saucedemo.com',
};

let selectedEnv: string;

/**
 * Loads the configuration based on the environment variable `NODE_ENV`.
 * Defaults to the QA environment if no valid environment is provided.
 */
export function loadConfig(): string {
    const env = process.env.NODE_ENV;

    switch (env) {
        case 'qa':
            selectedEnv = 'qa';
            return QA.BASE_URL;
        case 'dev':
            selectedEnv = 'dev';
            return DEV.BASE_URL;
        case 'uat':
            selectedEnv = 'uat';
            return UAT.BASE_URL;
        default:
            selectedEnv = 'qa';
            return QA.BASE_URL;
    }
}

/**
 * Returns the currently selected environment.
 */
export function returnEnv(): string {
    return selectedEnv;
}