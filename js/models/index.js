class Todo {
  constructor(title) {
    this.id = Todo.randomId()
    this.title = title
    this.done = false
  }

  static randomId() {
    const chars = 'abcdefgh01234567¡¿!?'
    let id = ''
    for (let i = 0; i < 8; i++) {
      id += chars[Math.floor(Math.random() * chars.length)]
    }
    return id
  }
}

class Model {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
  }

  bindDataChanged(callback) {
    this.onDataChanged = callback
  }

  _commit() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
    this.onDataChanged(this.todos)
  }

  addTodo(title) {
    this.todos.push(new Todo(title))
    this._commit()
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id)
    this._commit()
  }

  toggleTodo(id) {
    this.todos.forEach(todo => {
      todo.id === id ? todo.done = !todo.done : null
    })
    this._commit()
  }

  editTodo(id, title) {
    this.todos.forEach(todo => {
      todo.id === id ? todo.title = title : null
    })
    this._commit()
  }

}