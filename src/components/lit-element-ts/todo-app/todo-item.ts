import {
  html,
  css,
  LitElement,
  customElement,
  property
} from "../../../../web_modules/lit-element.js";

@customElement("todo-item")
export default class extends LitElement {
  @property({ type: String })
  title = "a todo item";

  @property({ type: Boolean })
  completed = false;

  render() {
    return html`
      <li class=${this.completed ? "completed" : ""}>
        <input
          type="checkbox"
          ?checked=${this.completed}
          @click=${() => {
            this.completed = !this.completed;
            this.dispatchEvent(new CustomEvent("onToggleCompleted"));
          }}
        />
        <label>${this.title}</label>
        <button
          @click=${() => {
            this.dispatchEvent(new CustomEvent("onRemove"));
          }}
        >
          ❌
        </button>
      </li>
    `;
  }

  static get styles() {
    return css`
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
    `;
  }
}
