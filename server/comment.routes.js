var commentCounter = 0;

const handlers = {

    createPost: function (req, res) {

        var comment, todo, count = 0;
        todoList.forEach(element => {
            if (element.id == req.params.id) {
                todo = element
                // todo.comment = req.body.comment
                //console.log(element)
            }
        })
        todo.comments.push({ id: req.params.id, commentId: commentCounter, text: req.body.comment, time: Date() })
        commentCounter += 1
        res.redirect('/todo_view/' + todo.id)
    },

    deleteForm: function (req, res) {
        var index, todo;
        todoList.forEach(element => {
            //console.log(element.comments)
            if (element.id == req.params.id) {
                todo = element;
                view = element.comments
            }
        })
        //console.log(todo)
        //todo.forEach(element => {
        //console.log(todo)
        //     //console.log(todo.comments)
        //     //console.log(element)
        //     //console.log(todo.comments)
        view.forEach(element => {
            if (element.commentId == req.params.commentId) {
                //console.log(element)
                index = view.indexOf(element)
                view.splice(index, 1)
                //console.log(index)
            }
        })
        res.redirect('/todo_view/' + todo.id)
    },
}

handlers.setup = function (app) {

    app.post('/comments/:id', handlers.createPost)
    app.get('/commentDelete/:id/:commentId', handlers.deleteForm)
}

module.exports = handlers;