export const STANDARD_USER_USERNAME = process.env.STANDARD_USER_USERNAME || '';
export const LOCKED_OUT_USER_USERNAME = process.env.LOCKED_OUT_USER_USERNAME || '';
export const PROBLEM_USER_USERNAME = process.env.PROBLEM_USER_USERNAME || '';
export const PERFORMANCE_GLITCH_USER_USERNAME = process.env.PERFORMANCE_GLITCH_USER_USERNAME || '';
export const ERROR_USER_USERNAME = process.env.ERROR_USER_USERNAME || '';
export const VISUAL_USER_USERNAME = process.env.VISUAL_USER_USERNAME || '';

export const STANDARD_USER_PASSWORD = process.env.STANDARD_USER_PASSWORD || '';
export const LOCKED_OUT_USER_PASSWORD = process.env.LOCKED_OUT_USER_PASSWORD || '';
export const PROBLEM_USER_PASSWORD = process.env.PROBLEM_USER_PASSWORD || '';
export const PERFORMANCE_GLITCH_USER_PASSWORD = process.env.PERFORMANCE_GLITCH_USER_PASSWORD || '';
export const ERROR_USER_PASSWORD = process.env.ERROR_USER_PASSWORD || '';
export const VISUAL_USER_PASSWORD = process.env.VISUAL_USER_PASSWORD || '';

/*
    The tags are added here so they can be used in the authentication test cases.
    I am going with the assumption that the base test case of logging in with them 
*/
export const userCredentials = [
    { username: STANDARD_USER_USERNAME, password: STANDARD_USER_PASSWORD, tag: "@TC-1", userType: "standard_user" },
    { username: PROBLEM_USER_USERNAME, password: PROBLEM_USER_PASSWORD, tag: "@TC-2", userType: "problem_user" },
    { username: PERFORMANCE_GLITCH_USER_USERNAME, password: PERFORMANCE_GLITCH_USER_PASSWORD, tag: "@TC-3", userType: "performance_glitch_user" },
    { username: ERROR_USER_USERNAME, password: ERROR_USER_PASSWORD, tag: "@TC-4", userType: "error_user" },
    { username: VISUAL_USER_USERNAME, password: VISUAL_USER_PASSWORD, tag: "@TC-5", userType: "visual_user" },
];

// This user is isolated as he is the only one who cannot login
export const lockedOutUserCredentials = {
    username: LOCKED_OUT_USER_USERNAME, password: LOCKED_OUT_USER_PASSWORD
};

export const invalidLoginData = [
    { username: '', password: '', testName: 'empty input', tag: '@TC-7', errorMessage: 'Epic sadface: Username is required' },
    { username: '', password: '123', testName: 'empty username', tag: '@TC-8', errorMessage: 'Epic sadface: Username is required' },
    { username: STANDARD_USER_USERNAME, password: '', testName: 'empty password', tag: '@TC-9', errorMessage: 'Epic sadface: Password is required' },
    { username: STANDARD_USER_USERNAME, password: '1234', testName: 'wrong password', tag: '@TC-10', errorMessage: 'Epic sadface: Username and password do not match any user in this service' },
    { username: 'something_non_existant', password: '1234', testName: 'wrong username', tag: '@TC-11', errorMessage: 'Epic sadface: Username and password do not match any user in this service' },
]