import TodoItem from "./todo-item.js";

const template = document.createElement("template");
template.innerHTML = `
<style>
    :host {
    display: block;
    font-family: sans-serif;
    text-align: center;
    }

    button {
    border: none;
    cursor: pointer;
    background-color: transparent;
    }

    ul {
    padding: 0;
    }
</style>
<h1>To do</h1>
<form>
  <input type="text" placeholder="Add a new to do"></input>
  <button>✅</button>
</form>
<ul id="todos"></ul>
`;

class TodoList extends HTMLElement {
  _shadow: ShadowRoot;
  $todoList: HTMLUListElement;
  $input: HTMLInputElement;
  $submitButton: HTMLButtonElement;
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.appendChild(template.content.cloneNode(true));

    this.$todoList = this._shadow.querySelector("ul")!;
    this.$input = this._shadow.querySelector("input")!;

    this.$submitButton = this._shadow.querySelector("button")!;
    this.$submitButton.addEventListener("click", this._submitTodo.bind(this));

    for (const { title, completed } of [
      { title: "Make a to-do list", completed: false },
      { title: "Finish blog post", completed: true }
    ]) {
      const $todoItem = this._addTodo(title);
      if (completed) {
        $todoItem.toggleCompleted();
        $todoItem.check();
      }
    }
  }

  _addTodo(text: string) {
    const $todoItem = document.createElement("todo-item") as TodoItem;
    $todoItem.setAttribute("text", text);
    $todoItem.addEventListener("onRemove", ((e: CustomEvent) =>
      this._removeTodo.bind(this)(e)) as EventListener);
    this.$todoList.append($todoItem);
    return $todoItem;
  }

  _submitTodo(e: Event) {
    e.preventDefault();
    if (this.$input.value.length > 0) {
      this._addTodo(this.$input.value);
      this.$input.value = "";
    }
  }

  _removeTodo(e: CustomEvent) {
    this.$todoList.removeChild(e.detail);
  }
}

customElements.define("todo-list", TodoList);
