import {
  LitElement,
  customElement
} from "../../../../web_modules/lit-element.js";

@customElement("my-element")
export default class extends LitElement {
  constructor() {
    super();
    console.log("constructed!");
  }

  connectedCallback() {
    console.log("connected!");
  }

  disconnectedCallback() {
    console.log("disconnected!");
  }

  attributeChangedCallback(name: string) {
    console.log(`Attribute: ${name} changed!`);
  }

  adoptedCallback() {
    console.log("adopted!");
  }
}
