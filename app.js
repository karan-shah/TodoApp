var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var Handlebars = require('handlebars');
var ta = require('node-time-ago');
var bodyParser = require('body-parser');
var commentRoutes = require('./server/comment.routes')
var todoRoutes = require('./server/todo.routes')

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

Handlebars.registerHelper('timeago', function (time) {
    return ta(time)
})

todoRoutes.setup(app)
commentRoutes.setup(app)

module.exports = function() {
    app.listen(3000, function () {
        console.log("server listening on 3000");
    });

}