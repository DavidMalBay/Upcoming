var fs = require('fs')

module.exports = {
    pathToTodosJson: function () {
        return __dirname + "\\Files\\todos.json";
    },

    addItem: function (itemToAdd) {
        var text = fs.readFileSync(module.exports.pathToTodosJson(), 'utf8')
        text = JSON.parse(text)
        console.log(text)
        text[itemToAdd] = 0
        fs.writeFile(module.exports.pathToTodosJson(), JSON.stringify(text), function (err) {
            console.log(err);
        });
        $(".todo-list").append(`<li class="todo-item">${itemToAdd}<i class="far fa-trash-alt delete-todo"></i></li>`)

    },

    markItemAsComplete: function (itemCompleted) {
        var text = fs.readFileSync(module.exports.pathToTodosJson(), 'utf8')
        text = JSON.parse(text)
        text[itemCompleted] = 1
        fs.writeFile(module.exports.pathToTodosJson(), JSON.stringify(text), function (err) {
            console.log(err);
        });

    },

    markAllAsComplete: function () {
        //identify the incomplete ones
        // change their values to 1
        var text = fs.readFileSync(module.exports.pathToTodosJson(), 'utf8')
        text = JSON.parse(text)

        for (var key in text) {
            if (text[key] == 0) {
                text[key] = 1;
            }
        }

        fs.writeFile(module.exports.pathToTodosJson(), JSON.stringify(text), function (err) {
            console.log(err);
        });
    },


    populateIncompleteItems: function () {
        text = JSON.parse(fs.readFileSync(module.exports.pathToTodosJson(), 'utf8'))

        for (var key in text) {
            if (text[key] == 0) {
                $(".todo-list").append(`<li class="todo-item">${key}<i class="far fa-trash-alt delete-todo"></i></li>`)
            }

        }
        $('.todo-list').on('click', '.delete-todo', function () {
            module.exports.markItemAsComplete($(this).parent().text())
            $(this).parent().hide()
        });
    }
}