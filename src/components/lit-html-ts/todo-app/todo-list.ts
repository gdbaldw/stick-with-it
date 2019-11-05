import { html, render } from "../../../../web_modules/lit-html.js";
import { repeat } from "../../../../web_modules/lit-html/directives/repeat.js";
import { ItemTemplate } from "lit-html/directives/repeat";

const template = (todos: Todos) => html`
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
    <button
      @click=${((e: CustomEvent) => todos._submitTodo(e)) as EventListener}
    >
      ✅
    </button>
  </form>
  <ul>
    ${repeat(todos._state, ({ id }: { id: number }) => id, ((
      { title, completed }: { title: string; completed: boolean },
      index: number
    ) => html`
      <todo-item
        title=${title}
        ?completed=${completed}
        @onRemove=${() => todos._remove(index)}
        @onToggleCompleted=${() => todos._toggleCompleted(index)}
      ></todo-item>
    `) as ItemTemplate<{}>)}
  </ul>
`;

class Todos extends HTMLElement {
  _shadow: ShadowRoot;
  _id: number;
  $input: HTMLInputElement;
  _state: { title: string; completed: boolean; id: number }[];
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
    this._state = [
      { title: "Make a to-do list", completed: false, id: 0 },
      { title: "Finish blog post", completed: true, id: 1 }
    ];
    render(template(this), this._shadow, {});
    this._id = 2;
    this.$input = this._shadow.querySelector("input")!;
  }

  _submitTodo(e: Event) {
    e.preventDefault();
    if (this.$input.value.length > 0) {
      this._state.push({
        title: this.$input.value,
        completed: false,
        id: this._id++
      });
      this.$input.value = "";
      render(template(this), this._shadow, {});
    }
  }

  _remove(index: number) {
    this._state.splice(index, 1);
    render(template(this), this._shadow, {});
  }

  _toggleCompleted(index: number) {
    this._state[index].completed = !this._state[index].completed;
    render(template(this), this._shadow, {});
  }
}

customElements.define("todo-list", Todos);
