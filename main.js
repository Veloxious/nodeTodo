const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const models = require('./models/')
const app = express()

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static('public'))


app.get('/', function(req, res) {
  models.todos.findAll({
      where: {
        completed: false
      },
    })
    .then(function(todos) {
      models.todos.findAll({
          where: {
            completed: true
          }
        })
        .then(function(completed) {
          res.render('index', {
            todos: todos,
            completed: completed
          })
        })
    })
})

app.post('/add', function(req, res) {
  models.todos.create({
    task: req.body.todos,
    completed: false
  }).then(function() {
    res.redirect('/')
  })
})

app.post('/complete', function(req, res) {
  models.todos.update({
      completed: true
    }, {
      where: {
        task: req.body.done
      }
    })
    .then(function() {
      res.redirect('/')
    })
})

app.post('/clear', function(req, res) {
  models.todos.destroy({
    where: {
      completed: true
    }
  })
  .then(function() {
    res.redirect('/')
  })
})

// app.post('/', function(req, res){
//   if (req.body.todos) {
//     todos.push(req.body.todos)
//   } else if (req.body.done) {
//     for (let i = 0; i < todos.length; i++) {
//       if (todos[i]===req.body.done){
//         todos.splice(i, 1)
//       }
//     }
//     done.push(req.body.done)
//   }
//   res.redirect('/')
// })

app.listen(3000, function() {
  console.log('Node is running');
})
