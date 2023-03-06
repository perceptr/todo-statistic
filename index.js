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

function sortByImportance(infoAboutTodos) {
    let normalTodos = [];
    let importantTodos = [];
    for (const [todo, info] of infoAboutTodos.entries()) {
        if (info.isImportantTodo) {
            importantTodos.push(todo);
        } else {
            normalTodos.push(todo);
        }
    }
    return [importantTodos, normalTodos]
}

function sortBy(argument) {
    const info = getInfoAboutTodos();
    switch (argument) {
        case 'importance':
            return sortByImportance(info)
            break
        case 'user':
            break
        case 'date':
            break
        default:
            return 'wrong_argument';
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
    const [commandName, arguments] = processArguments(command)
    if (commandName == 'exit' && arguments.length == 0) {
        process.exit(0);
    } else if (commandName == 'show' && arguments.length == 0) {
        console.log(getAllToDos())
    } else if (commandName == 'important' && arguments.length == 0) {
        console.log(showOnlyImportantTodos())
    } else if (commandName == 'sort' && arguments.length == 1) {
        console.log(sortBy(arguments[0]))
    } else {
        console.log('wrong command');
    }
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