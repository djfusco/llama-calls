import { LitElement, html, css } from 'lit';

export class CompleteAxios extends LitElement {
  static get properties() {
    return {
      version: { type: String }
    }
  }

  static get styles() {
    return css`
      :host {
        font-size: 2em;
      }
    `;
  }

  constructor() {
    super();
    this.version = null;
  }

  async _askGPT(e) {
    //console.log(e.detail);
    let base = ''; 
    if (
      window.location.origin.startsWith("http://127.0.0.1") ||
      window.location.origin.startsWith("http://localhost")
    ) {
      base = window.location.origin
        .replace(/127.0.0.1:8(.*)/, "localhost:3000")
        .replace(/localhost:8(.*)/, "localhost:3000");
    }
    return await fetch(`${base}/api/askgpt?search=insert`).then((r) => r.ok ? r.json() : []).then((data) => {
      return data;
    });
  }

  firstUpdated() {
    const button = this.shadowRoot.querySelector('#myButton');
    if (button) {
      button.addEventListener('click', async () => {
        const results = await this._askGPT();
        const box = this.shadowRoot.querySelector('#myTextBox');
        if (box) {
         box.value = results; 
        }
      });
    }
  }
    render() {
      return html`
        <h2>Hello world</h2>
        <br>
        <button id="myButton">Get Help</button>
        <br>
        <textarea id="myTextBox" rows="20" cols="100" wrap="hard"></textarea>
        <br>
      `;
    }
}

customElements.define('complete-axios', CompleteAxios);