import {
  html,
  css,
  LitElement,
  customElement,
  property
} from "../../../../web_modules/lit-element.js";
import { repeat } from "../../../../web_modules/lit-html/directives/repeat.js";
import { ItemTemplate } from "lit-html/directives/repeat";

@customElement("sudoku-grid")
export default class extends LitElement {
  @property({ type: Array })
  state = [
    { title: "Make a to-do list", completed: false, key: 0 },
    { title: "Finish blog post", completed: true, key: 1 }
  ];

  @property({ type: Number })
  key = 2;

  $input: HTMLInputElement;
  firstUpdated() {
    this.$input = this.shadowRoot.querySelector("input");
  }

  _submitTodo(e: Event) {
    e.preventDefault();
    if (this.$input.value.length > 0) {
      this.state.push({
        title: this.$input.value,
        completed: false,
        key: this.key++
      });
      this.$input.value = "";
    }
  }

  _remove(index: number) {
    this.state.splice(index, 1);
    this.requestUpdate(undefined, undefined);
  }

  _toggleCompleted(index: number) {
    this.state[index].completed = !this.state[index].completed;
  }

  render() {
    return html`
      <h1>Sudoku</h1>
      <form>
        <input type="text" placeholder="Add a new to do" />
        <button
          @click=${((e: CustomEvent) => this._submitTodo(e)) as EventListener}
        >
          ✅
        </button>
      </form>
      <ul>
        ${repeat(this.state, ({ key }: { key: number }) => key, ((
          { title, completed }: { title: string; completed: boolean },
          index: number
        ) => html`
          <sudoku-cell
            title=${title}
            ?completed=${completed}
            @onRemove=${() => this._remove(index)}
            @onToggleCompleted=${() => this._toggleCompleted(index)}
          ></sudoku-cell>
        `) as ItemTemplate<{}>)}
      </ul>
    `;
  }

  static get styles() {
    return css`
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
    `;
  }
}
