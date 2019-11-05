import { html, render } from "../../../../web_modules/lit-html.js"

const template = (todo) => html`

<style>
    :host {
    display: block;
    font-family: sans-serif;
    text-align: center;
    list-style: none;
    }

    .completed {
    text-decoration: line-through;
    }

    button {
    border: none;
    cursor: pointer;
    background-color: transparent;
    }
</style>

<li class=${todo._completed ? "completed" : ""}>
    <input type="checkbox" ?checked=${todo._completed} @click=${() => {
    todo.dispatchEvent(new CustomEvent('onToggleCompleted'));
  }}>
    <label>${todo._title}</label>
    <button @click=${() => {
    todo.dispatchEvent(new CustomEvent('onRemove'));
  }}>❌</button>
</li>

`;

class TodoItem extends HTMLElement {
  constructor(title = "a todo item", completed = false) {
    super();
    this._title = title;
    this._completed = completed;
    this._shadow = this.attachShadow({ 'mode': 'open' });
    render(template(this), this._shadow);
  }

  static get observedAttributes() {
    return ['title', 'completed'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "title":
        this._title = newValue;
        break;
      case "completed":
        this._completed = newValue === "";
        break;
    }
    render(template(this), this._shadow);
  }
}

customElements.define('todo-item', TodoItem);

