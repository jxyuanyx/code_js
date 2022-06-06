// panel/index.js, this filename needs to match the one registered in package.json
Editor.Panel.extend({
  // css style for panel
  style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

  // html template for panel
  template: `
    <h2>资源加密</h2>
    <hr />
    <p class="addLine">构建完成自动加密<input type="checkbox" v-model="auto" style="margin-left:10px;height:20px;vertical-align:middle;"></p>
    <hr />
    <p style="height:30px;background-color:#000000;text-align:center;line-height:30px;font-size:15px;" @click="onSureClick">确 定</p>
  `,

  // method executed when template and styles are successfully loaded and initialized
  ready () {

    new window.Vue({

      el: this.shadowRoot,

      data: {
        auto:true
      },

      methods: {
        onSureClick(){

        }
      }

    });
  },

  // register your ipc messages here
  messages: {
    
  }
});