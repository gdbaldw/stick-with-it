import { html, render } from "../../../../web_modules/lit-html.js";

const template = (count: number) => html`
  <style>
    :host {
      display: block;
      font-family: sans-serif;
      text-align: center;
    }
  </style>
  <p>Counter</p>
  <h1>${count}</h1>
`;

class Counter extends HTMLElement {
  _shadow: ShadowRoot;
  _count: number;
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
    this._count = 0;
    const increment = this.increment.bind(this);
    setInterval(increment, 1000);
    increment();
  }

  increment() {
    render(template(this._count), this._shadow, {});
    this._count++;
  }
}

customElements.define("counter-app", Counter);
