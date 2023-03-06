const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();
console.log(getAllToDos())

console.log('Please, write your command!');

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function getAllToDos() {
    let todos = [];
    for (const file of files) {
        for (const line of file.split("\n")) {
            const index = line.indexOf('// TODO ');
            if (index !== -1) {
                todos.push(line.slice(index));
            }
        }
    }
    return todos;
}

function processCommand(command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
