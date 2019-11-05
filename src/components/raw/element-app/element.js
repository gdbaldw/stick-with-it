export { }

class Element extends HTMLElement {
  constructor() {
    super();
    console.log('constructed!');
  }

  connectedCallback() {
    console.log('connected!');
  }

  disconnectedCallback() {
    console.log('disconnected!');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log(`Attribute: ${name} changed!`);
  }

  adoptedCallback() {
    console.log('adopted!');
  }
}

customElements.define('my-element', Element);

