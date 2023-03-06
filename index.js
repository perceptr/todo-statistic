const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();
console.log('Please, write your command!');
readLine(processCommand)

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

function showOnlyImportantTodos() {
    let importantTodos = [];
    let allTodos = getAllToDos();
    for (const todo of allTodos) {
        if (todo.includes('!')) {
            importantTodos.push(todo);
        }
    }

    return importantTodos;
}

function getInfoAboutTodos() {
    let allTodos = getAllToDos();
    let todoMap = new Map();

    for (const todo of allTodos) {
        const name = todo.split(';')[0].slice(8);
        const date = todo.split(';')[1];
        const comment = todo.split(';')[2];

        let todoInfo = {
            name: name === '' ? null : name,
            date: date === '' ? null : new Date(date),
            comment: comment === '' ? null : comment,
            isImportantTodo: todo.includes('!')
        }

        todoMap.set(todo, todoInfo);
    }

    return todoMap;
}


function processCommand(command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            console.log(getAllToDos())
            break;
        case 'important':
            console.log(showOnlyImportantTodos())
            break;
        case 'user':
            console.log(getInfoAboutTodos())
            break;
        default:
            console.log('wrong command');
            break;
    }
}
