import { html, render } from "../../../../web_modules/lit-html.js";
import { repeat } from "../../../../web_modules/lit-html/directives/repeat.js"

const template = (todos) => html`
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
  <input type="text" placeholder="Add a new to do" />
  <button @click=${(e) => todos._submitTodo(e)}>✅</button>
</form>
<ul>
  ${repeat(todos._state, ({ id }) => id, ({ title, completed }, index) => html`
    <todo-item
      title=${title}
      ?completed=${completed}
      @onRemove=${() => todos._remove(index)}
      @onToggleCompleted=${() => todos._toggleCompleted(index)}
    ></todo-item>
  `)}
</ul>
`;

class Todos extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ 'mode': 'open' });
    this._state = [{ title: 'Make a to-do list', completed: false, id: 0 }, { title: 'Finish blog post', completed: true, id: 1 }];
    render(template(this), this._shadow);
    this._id = 2;
    this.$input = this._shadow.querySelector("input");
  }

  _submitTodo(e) {
    e.preventDefault();
    if (this.$input.value.length > 0) {
      this._state.push({ title: this.$input.value, completed: false, id: this._id++ })
      this.$input.value = "";
      render(template(this), this._shadow);
    }
  }

  _remove(index) {
    this._state.splice(index, 1);
    render(template(this), this._shadow);
  }

  _toggleCompleted(index) {
    this._state[index].completed = !this._state[index].completed;
    render(template(this), this._shadow);
  }

}

customElements.define('todo-list', Todos);
