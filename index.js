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

// function sort_by_importance(infoAboutTodos) {
//     let normalTodos = [];
//     let importantTodos = [];
//     for (const [todo, info] of infoAboutTodos.entries()) {
//         if (info.isImportant) {
//
//         }
//     }
// }

function sort_by(argument) {
    const info = getInfoAboutTodos();
    switch (argument) {
        case 'importance':
            return sort_by_importance(info)
            break
        case 'user':
            break
        case 'date':
            break
    }
}

function processArguments(command) {
    const splitted = command.split(" ");
    const command_name = splitted[0];
    const arguments = splitted.slice(1);

    return [command_name, arguments]
}

function processCommand(command) {
    const [command_name, arguments] = processArguments(command)
    if (command_name == 'exit' && arguments.length == 0) {
        process.exit(0);
    } else if (command_name == 'show' && arguments.length == 0) {
        console.log(getAllToDos())
    } else if (command_name == 'important' && arguments.length == 0) {
        console.log(showOnlyImportantTodos())
    } else {
        console.log('wrong command');
    }
}

// TODO you can do it!
