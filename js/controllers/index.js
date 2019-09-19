class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.model.bindDataChanged(this.onDataChanged)
    this.view.bindAddTodo(this.handleAddTodo)
    this.view.bindDeleteTodo(this.handleDeleteTodo)
    this.view.bindToggleTodo(this.handleToggleTodo)
    this.view.bindEditTodo(this.handleEditTodo)

    this.onDataChanged(this.model.todos)
  }

  onDataChanged = todos => {
    this.view.render(todos)
  }

  handleAddTodo = (title) => {
    this.model.addTodo(title)
  }

  handleDeleteTodo = (id) => {
    this.model.deleteTodo(id)
  }

  handleToggleTodo = (id) => {
    this.model.toggleTodo(id)
  }

  handleEditTodo = (id, title) => {
    this.model.editTodo(id, title)
  }

}