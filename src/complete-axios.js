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

  async _postxAPIStatement(e) {
    console.log(e.detail);
    let base = ''; 
    if (
      window.location.origin.startsWith("http://127.0.0.1") ||
      window.location.origin.startsWith("http://localhost")
    ) {
      base = window.location.origin
        .replace(/127.0.0.1:8(.*)/, "localhost:3000")
        .replace(/localhost:8(.*)/, "localhost:3000");
    }
    return await fetch(`${base}/api/sheet?search=insert`).then((r) => r.ok ? r.json() : []).then((data) => {
      return data;
    });
  }

  render() {
    return html`
<h2>Hello world</h2>
    `;
  }
}

customElements.define('complete-axios', CompleteAxios);