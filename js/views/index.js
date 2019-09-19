class View {
  constructor() {

    this.root = document.getElementById('app')

    this.formContainer = document.createElement('div')
    this.formContainer.id = 'form-container'

    this.form = document.createElement('form')

    this.inputTitle = document.createElement('input')
    this.inputTitle.type = 'text'
    this.inputTitle.placeholder = 'Create your next todo...'
    this.inputTitle.className = 'bounceInRight animated delay-1s'

    this.todoListContainer = document.createElement('div')
    this.todoListContainer.id = 'todo-list-container'
    this.todoListContainer.className = 'slideInUp animated'

    this.infoMessage = document.createElement('p')
    this.infoMessage.className = 'info-message bounceInLeft animated delay-1s'

    this.todoList = document.createElement('ul')
    this.todoList.className = 'fadeIn animated delay-1s'

    this.form.append(this.inputTitle)
    this.formContainer.append(this.form)

    this.todoListContainer.append(this.infoMessage, this.todoList)

    this.root.append(this.formContainer, this.todoListContainer)

    this._temporaryTodoText
    this._initLocalListeners()

    this._lastToggledTodoIndex = ''
    this._addTodoEventFired = false

  }

  render(todos) {

    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild)
    }

    if (todos.length === 0) {

      this.infoMessage.textContent = 'You have nothing to do...'

    } else {

      const pendingTodosCount = todos.reduce((acc, todo) => acc + (todo.done ? 0 : 1), 0)
      this.infoMessage.textContent = `You have ${pendingTodosCount} pending todo${pendingTodosCount !== 1 ? 's' : ''}`

      todos.slice().reverse().forEach((todo, index, arr) => {

        const item = document.createElement('li')
        item.setAttribute('value', todo.id)

        if (this._addTodoEventFired) {
          item.classList.add('bounceInLeft', 'animated', 'fast')
          this._addTodoEventFired = false
        }

        const check = document.createElement('span')
        check.className = todo.done ? 'todo-toggle done' : 'todo-toggle'

        if (todo.id === this._lastToggledTodoIndex) {
          check.classList.add('jello', 'animated', 'fast')
          this._lastToggledTodoIndex = ''
        }

        const span = document.createElement('span')
        span.contentEditable = true
        span.textContent = todo.title
        span.className = todo.done ? 'todo-title done' : 'todo-title'

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'borrar'

        item.append(check, span, deleteBtn)

        this.todoList.append(item)

      })

    }

  }

  get _getInputTitle() {
    return this.inputTitle.value.trim()
  }

  _cleanInput() {
    this.inputTitle.value = ''
  }

  bindAddTodo(handler) {

    this.form.addEventListener('submit', event => {
      event.preventDefault();
      if (this._getInputTitle) {
        this._addTodoEventFired = true
        handler(this._getInputTitle)
        this._cleanInput()
      }
    })

  }

  bindDeleteTodo(handler) {

    this.todoList.addEventListener('click', event => {
      if (event.target.tagName == 'BUTTON') {
        const todoId = event.target.parentElement.getAttribute('value')
        event.target.parentElement.className = 'bounceOutLeft animated fast'
        setTimeout(() => {
          handler(todoId)
        }, 800)
      }
    })

  }

  bindToggleTodo(handler) {

    this.todoList.addEventListener('click', event => {
      if (event.target.classList.contains('todo-toggle')) {
        const todoId = event.target.parentElement.getAttribute('value')
        this._lastToggledTodoIndex = todoId
        handler(todoId)
      }
    })

  }

  _initLocalListeners() {

    this.todoList.addEventListener('input', events => {
      if (event.target.classList.contains('todo-title')) {
        this._temporaryTodoText = event.target.innerText
      }
    })

  }

  bindEditTodo(handler) {

    this.todoList.addEventListener('focusout', event => {
      if (this._temporaryTodoText) {
        const todoId = event.target.parentElement.getAttribute('value')
        handler(todoId, this._temporaryTodoText)
        this._temporaryTodoText = ''
      }
    })

  }

}