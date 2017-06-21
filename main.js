const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express()

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'))

var todos = []
var done = []

app.get('/', function(req, res){
  res.render('index', {todos: todos, done})
})

app.post('/', function(req, res){
  if (req.body.todos) {
    todos.push(req.body.todos)
  } else if (req.body.done) {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i]===req.body.done){
        todos.splice(i, 1)
      }
    }
    done.push(req.body.done)
  }
  res.redirect('/')
})

app.listen(3000, function(){
  console.log('Node is running');
})
