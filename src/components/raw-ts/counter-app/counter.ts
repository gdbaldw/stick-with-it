export {};

const template = document.createElement("template");

template.innerHTML = `
<style>
    :host {
    display: block;
    font-family: sans-serif;
    text-align: center;
    }
</style>
<p>Counter</p>
<h1></h1>
`;

class Counter extends HTMLElement {
  _shadow: ShadowRoot;
  $counter: HTMLHeadingElement;
  _count: number;
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.appendChild(template.content.cloneNode(true));

    this.$counter = this._shadow.querySelector("h1")!;
    this.$counter.textContent = "0";
    this._count = 0;
    setInterval(this.increment.bind(this), 1000);
  }

  increment() {
    this._count++;
    this.$counter.textContent = this._count.toString();
  }
}

customElements.define("counter-app", Counter);
