import {
  css,
  html,
  LitElement,
  customElement,
  property
} from "../../../../web_modules/lit-element.js";

@customElement("counter-app")
export default class extends LitElement {
  @property({ type: Number })
  count = 0;

  constructor() {
    super();
    setInterval(() => this.count++, 1000);
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: sans-serif;
        text-align: center;
      }
    `;
  }

  render() {
    return html`
      <p>Counter</p>
      <h1>${this.count}</h1>
    `;
  }
}
