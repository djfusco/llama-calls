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
    const topic = this.shadowRoot.querySelector('#topicTextBox').value;
    return await fetch(`${base}/api/askgpt?search=${topic}`).then((r) => r.ok ? r.json() : []).then((data) => {
      return data;
    });
  }

  async _askDefine(e) {
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
      const textBlock = this.shadowRoot.querySelector('#textBlock');
      const selection = window.getSelection();
      const selectedText = selection.toString();
      return await fetch(`${base}/api/define?search=${selectedText}`).then((r) => r.ok ? r.json() : []).then((data) => {
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

    const define = this.shadowRoot.querySelector('#textBlock');
    if (define) {
      define.addEventListener('mouseup', async () => {
        const resultsDefine = await this._askDefine();
        const boxDefine = this.shadowRoot.querySelector('#defintionBox');
        if (boxDefine) {
          boxDefine.value = resultsDefine; 
        }
      });
    }

  }
    render() {
      return html`
        <h2>You complete me...</h2>
        <input type="text" style="width: 800px; height: 140px;" id="topicTextBox">
        <br>
        <br>
        <button id="myButton">Finish this sentence</button>
        <br>
        <br>
        <textarea id="myTextBox" rows="10" cols="100" wrap="hard"></textarea>
        <br>
        <br><br>
        <br><br>
        <div id="textBlock">
        This is some text that you can select. Try selecting a part of this text to get
        its definition.

        The Pittsburgh Penguins are a professional ice hockey team based in Pittsburgh. They compete in the National Hockey League as a member of the Metropolitan Division of the Eastern Conference, and have played their home games at PPG Paints Arena, originally known as Consol Energy Center, since 2010.
        </div>
        <br><br>
        <textarea id="defintionBox" rows="10" cols="100" wrap="hard"></textarea>

      `;
    }
}

customElements.define('complete-axios', CompleteAxios);