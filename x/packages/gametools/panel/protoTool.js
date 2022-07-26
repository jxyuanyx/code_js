// panel/index.js, this filename needs to match the one registered in package.json
Editor.Panel.extend({
  // css style for panel
  style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

  // html template for panel
  template: `
    <h2>分包工具</h2>
    <hr />
    <div>State: <span id="label">--</span></div>
    <hr />
    <ui-button id="btn">Send To Main</ui-button>
  `,

  // method executed when template and styles are successfully loaded and initialized
  ready () {

    new window.Vue({

      el: this.shadowRoot,

      data: {
        message: 'Hello World',
      },

    });

    this.$btn.addEventListener('confirm', () => {
      Editor.Ipc.sendToMain('gametools:clicked');
    });
  },

  // register your ipc messages here
  messages: {
    'gametools:hello' (event) {
      this.$label.innerText = 'Hello!';
    }
  }
});