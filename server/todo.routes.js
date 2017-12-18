var todoCounter = 0
todoList = []
const handlers = {

    getAll: function (req, res) {
        res.render('todo_home', {
            todo: todoList
        })
    },

    createForm: function (req, res) {
        res.render('todo_create');
    },

    createPost: function (req, res) {
        var todo = req.body.todo;
        var desc = req.body.desc;
        var status = req.body.status;
        //    var comments = req.body.comment;
        // if(status != "complete") {
        //     status = "incomplete"
        // }
        todoList.push({ id: todoCounter, text: todo, desc: desc, status: status, time: Date(), comments: [] })
        res.redirect('/');
        todoCounter += 1;
    },

    editForm: function (req, res) {
        var todo;
        todoList.forEach(element => {
            if (element.id == req.params.id)
                todo = element;
        });
        res.render('todo_edit', {
            text: todo.text,
            id: todo.id,
            desc: todo.desc,
            status: todo.status
        });
    },

    editSubmit: function (req, res) {
        if (req.params.id) {
            todoList.forEach(todo => {
                if (todo.id == req.params.id) {
                    todo.text = req.body.text;
                    todo.desc = req.body.desc;
                    todo.status = req.body.status;
                    // console.log(req.params.id);
                    // console.log("Updating:"+ req.body.text)
                    res.redirect('/todo_view/' + todo.id);
                }
            })

        }
    },

    show: function (req, res) {
        var todo, comments;
        todoList.forEach(element => {
            if (element.id == req.params.id) {
                todo = element;
                // console.log(req.params.id)
                //console.log(element)
            }
        });

        // console.log(todo)
        // console.log(todo.comments)
        res.render('todo_view', {
            todo: todo,
            //  id : todo.id,
            //  desc : todo.desc,
            //  status : todo.status,
            //  comments : todo.comments
        })
    },

    showPost : function(req, res) {
        if (req.params.id) {
            todoList.forEach(todo => {
                if (todo.id == req.params.id) {
                    todo.status = req.body.status;
                    res.redirect('/todo_view/'+todo.id);
        
                }
            })
        }
    },

    deleteForm: function (req, res) {
        var todo;
        todoList.forEach(element => {
            if (element.id == req.params.id) {
                //console.log(element)
                todo = todoList.indexOf(element)
                // console.log(todo);
                todoList.splice(todo, 1);
            }
        })
        res.redirect('/');
    }
}

handlers.setup = function (app) {

    //show list of todo's
    app.get('/', handlers.getAll)

    //Show create todo form
    app.get('/create', handlers.createForm)

    //save todo in list. 
    app.post('/create', handlers.createPost)

    //Show selected todo edit form.
    app.get('/todo_edit/:id', handlers.editForm)

    //Update the selected todo.
    app.post('/todo_edit/:id', handlers.editSubmit)

    app.get('/todo_view/:id', handlers.show)

    app.post('/todo_view/:id', handlers.showPost)

    app.get('/delete/:id', handlers.deleteForm)
}

module.exports = handlers;
//module.exports = todoList;