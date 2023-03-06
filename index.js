const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function getAllTodos() {
    return [];
}

function showOnlyImportantTodos() {
    let importantTodos = [];
    let allTodos = getAllTodos();
    for (const todo of allTodos) {
        if (todo.includes('!')) {
            importantTodos.push(todo);
        }
    }

    return importantTodos;
}


function processCommand(command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;

        case 'show':
            // show all todos
        case 'important':
            // show important todos that start with '!'
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
