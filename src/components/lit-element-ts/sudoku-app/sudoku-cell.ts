import {
  html,
  css,
  LitElement,
  customElement,
  property
} from "../../../../web_modules/lit-element.js";

@customElement("sudoku-cell")
export default class extends LitElement {
  @property()
  value = "value";

  render() {
    return html``;
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
}
