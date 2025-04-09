# Preconditions

In order to use this project in your local environment the following is required:

* [Node.js (LTS) v22.14.0](https://nodejs.org/en) or higher.
* npm@11.2.0 or higher
* allure-commandline (if you wish to generate an Allure report locally )
* Highly recommended to use [Visual Studio Code](https://code.visualstudio.com) 
  with the plugin [Playwright Test for VSCode](https://marketplace.visualstudio.com/items/?itemName=ms-playwright.playwright)

## Local setup

After cloning/downloading the repo locally, ensure the following:

1. Install [Node](https://nodejs.org/en)
2. Open a Terminal and check it's installed properly using the command ```node -v```
. The output should be ```v22.14.0``` (or higher)
3. Check node package manager is available by using the command ```npm -v```. The output should be ```11.2.0``` or higher
   1. If version is lower it shouldn't cause problems as long as Node version is the same, but to be sure use the command ```npm install -g npm@11.2.0```. After it is done, check for version again using ```npm -v``` and it should be ```11.2.0```
4. (Recommended) - Install Playwright globally using ```npm install -g playwright --save-dev```. The output should be ```added 2 packages```
5. (Required for serving Allure report) - Install Allure report globally using ```npm install -g allure-commandline --save-dev```
6. Navigate to the root of the project using Terminal and run ```npm install``` to install packages. The output should be ```added 12 packages, and audited 13 packages``` (numbers subject to change)

## Env file

In order to run the test suite you need to have a .env located in the file which contains the usernames and passwords. Since this is a demo website and this information is exposed - here is how the file looks:

```
# Usernames
STANDARD_USER_USERNAME=standard_user
LOCKED_OUT_USER_USERNAME=locked_out_user
PROBLEM_USER_USERNAME=problem_user
PERFORMANCE_GLITCH_USER_USERNAME=performance_glitch_user
ERROR_USER_USERNAME=error_user
VISUAL_USER_USERNAME=visual_user

# Passwords
STANDARD_USER_PASSWORD=secret_sauce
LOCKED_OUT_USER_PASSWORD=secret_sauce
PROBLEM_USER_PASSWORD=secret_sauce
PERFORMANCE_GLITCH_USER_PASSWORD=secret_sauce
ERROR_USER_PASSWORD=secret_sauce
VISUAL_USER_PASSWORD=secret_sauce
```

Example:
![.env example](/screenshots/env_file.png "Env example")

## Running using Playwright Test for VSCode

Once everything is setup and enabled, you can use the plugin to run tests. 

Example:

![test run example](/screenshots/demonstration.gif "test run example")

Alternatively you can use the terminal and use the command 
```npx playwright test``` - note that this will run all the tests.

To run a specific project, e.g. "chromium" - use the command ```npx playwright test --project="chromium"```.

## Generating the report

The framework is setup to automatically generate Allure results at the end of the test run, whether it's via plugin or Terminal
After the test run is done, run the command ```allure generate ./allure-results --clean -o ./allure-report``` which will generate the html, then run the command ```allure serve allure-results``` which will open a server that displays the test run results

Example:

![allure example](/screenshots/allure_demonstration.gif "allure example")

# Project Documentation
## Project Structure

The following is the structure of the project, with brief explanations:

```plaintext
saucedemo/
├── .github/
│   └── workflows/
│       └── playwright.yml       # GitHub Actions workflow for running tests
├── allure-results/              # Directory for raw Allure test results
├── allure-report/               # Directory for generated Allure HTML reports
├── node_modules/                # Node.js dependencies (generates on npm install)
├── src/                         
│   ├── data/                    # Data for tests is located here
│   ├── env/                     # URL constants
│   ├── fixture/                 # Fixture used for all tests
│   ├── pages/                   # Page objects and page related actions
│   └── base/
│       └── basePage.ts          # The Base Page that every other page extends (for shared methods)
│       └── pageManager.ts       # Page Manager used to instantiate every page, for use in the fixture
│   ├── tests/                   # Test files organized by feature or module
├── .env                         # Environment variables (not committed to version control)
├── .gitignore                   # Git ignore file
├── [package.json](http://_vscodecontentref_/2)                 # Project metadata and dependencies
├── playwright.config.js         # Playwright configuration file
├── [README.md](http://_vscodecontentref_/3)                    # Project documentation
```

## Design Patterns used

### POM (Page Object Model)
The framework presented uses the Page Object Model design pattern, where each page of the application is represented by a corresponding class. This encapsulates the page-specific selectors and actions, making the tests more maintainable and reusable. 
The specifics of the code:

* Selectors are outlined at the start in a 'selectors' object if they are used in more than one method
* If selectors are used only once in a single method, then selectors are left in those methods
* Use basePage.ts for any possible shared methods. Each page extends this basePage
* Use pageManager.ts to instantiate all the pages that exist in the project, to then be used in the Fixture file

Example page:
![page example](/screenshots/page_example.png "page example")

### Fixtures
The file baseFixture.ts is used to extend the test method from @playwright to provide shared setup and teardown logic for tests, ensuring consistency and reducing boilerplate code. This is to avoid loading required pages, data and data manipulation into the test code

### Environment configuration
Usernames/passwords (although public for this demo site) are relegated to env. variables, to be populated in a local .env file or the CI/CD platform (git actions in this case)

### Data-Driven testing
The project uses data-driven testing to test multiple scenarios with different inputs. Tests that can be repeated with different data sets are setup in such a way, and data is stored in the /data folder to be used in different tests. This ensures that any data changes do not affect the test logic, making it simple to maintain code

The best example of reduced code due to a data sample is - login.ui.spec.ts:
Iterates over userCredentials to test login for different user types.

![login example](/screenshots/login_example.png "login example")

### CI/CD integration
Description: The project integrates with GitHub Actions for continuous integration and deployment. The workflow (playwright.yml) installs dependencies, sets up Playwright, and runs tests with environment-specific secrets. The environment that is setup on this repository is called "QA" to emulate a "QA" environment setup. 

The CI/CD pipeline uses allure report, and the artifact it uploads needs to be downloaded, and generated/served locally using the steps under section [Generating the report](#generating-the-report)