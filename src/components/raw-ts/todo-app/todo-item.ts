const template = document.createElement("template");

template.innerHTML = `
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
<li>
    <input type="checkbox">
    <label>a todo item</label>
    <button>❌</button>
</li>
`;

export default class TodoItem extends HTMLElement {
  _shadow: ShadowRoot;
  $item: any;
  $removeButton: any;
  $text: any;
  $checkbox: any;
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.appendChild(template.content.cloneNode(true));

    this.$item = this._shadow.querySelector("li");
    this.$removeButton = this._shadow.querySelector("button");
    this.$text = this._shadow.querySelector("label");
    this.$checkbox = this._shadow.querySelector("input");

    this.$checkbox.addEventListener("click", this.toggleCompleted.bind(this));
    this.$removeButton.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("onRemove", { detail: this }));
    });
  }

  toggleCompleted() {
    if (this.$item.classList.contains("completed")) {
      this.$item.classList.remove("completed");
    } else {
      this.$item.classList.add("completed");
    }
  }

  check() {
    this.$checkbox.setAttribute("checked", "");
  }

  static get observedAttributes() {
    return ["text"];
  }

  attributeChangedCallback(
    _name: string,
    _oldValue: string | null,
    newValue: string | null
  ) {
    this.$text.textContent = newValue;
  }
}

customElements.define("todo-item", TodoItem);
