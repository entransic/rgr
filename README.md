# rgr - Red Green Refactor
Demonstration repository for test automation and web development.  

 * 'Playwright' tests the page structures and elements
 * 'go test' executes tests for the server and web API

## Setting up the project
npm install

## Building the project locally
Navigate into the root directory of the repository and run the following:

* go build -o ./bin/main main.go

## Testing the project locally
Navigate into the root directory of the repository and run the following:

 * go test ./tests/
 * npx playwright test ./tests/