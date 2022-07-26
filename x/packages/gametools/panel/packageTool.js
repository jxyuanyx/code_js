
// panel/index.js, this filename needs to match the one registered in package.json
let fs = require("fs-extra")
let path = require("path")
let exec = require("child_process").execSync;
let execFile = require("child_process").execFileSync;

//let compressing = require('compressing');


const manifestTemplate = {
  packageUrl: '',
  remoteManifestUrl: '',
  remoteVersionUrl: '',
  version: '1.0.0',
  assets: {},
  searchPaths: []
};

const config={
   onlineServer:"",
   testServer:"",
   mainPackage:{
     version:"1.0.0",
     url:""
   },

   subPackages:[],

   channels:[
    {
      floderName:"国内测试",
      channel:"GPID_And_007",
      url:"http://120.78.235.228/media/assets"
    },
    {
      floderName:"印度测试",
      channel: "GPID_And_007",
      url: "http://147.139.76.207/media/assets"
    },
    {
      floderName:"印度线上",
      channel: "GPID_And_007",
      url: "http://static.skill-app.com/media/assets"
    },
    {
      floderName:"印度审核",
      channel: "GPID_And_007",
      url: "http://149.129.187.137/media/assets"
    }
   ],

   localServerPath:""

}

Editor.Panel.extend({
  // css style for panel
  style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
    .title{
      width:100px;
      display:-moz-inline-box;
      display:inline-block;
      
    }
    .line{height:30px;line-height:30px;width:100%;}
    .box{
    }

    .split{
      width:100%;
      height:1px;
      margin:10px;
      border-bottom:1px solid #575757;
    }

    .input{
      width:300px;
      height:25px;
    }

    .black_overlay{ 
      position: absolute; 
      top: 0%; 
      left: 0%; 
      width: 100%; 
      height: 100%; 
      background-color: black; 
      z-index:1001; 
      -moz-opacity: 0.8; 
      opacity:.80; 
      filter: alpha(opacity=88); 
  } 
  .white_content { 
      position: absolute; 
      top: 20%; 
      left: 10%; 
      width: 80%; 
      height: 270px; 
      background-color: white; 
      z-index:1002; 
      color:#000;
  } 
  .addLine{
    padding-left:10px;
    line-height:30px;
  }
  `,

  // html template for panel
  template: `
    <div class="layout vertical" style="margin-top:10px;">
      <div class="line layout horizontal" style="margin-top:10px;">
        <span class="title">正式服务器地址</span>
        <input type="text" placeholder="请填写正式服务器地址" v-model="config.onlineServer" class="input" ></ui-input>
      </div>

      <div ><span style="float:left">渠道列表:</span><span style="float:right;"><a href="#" @click="openChannelDialog">添加</a></span></div>

      <div v-for="(index,item) in config.channels" :key="index" class="line">
        <span class="title">{{item.floderName}}</span>
        <span class="title">{{item.url}}</span>
        <span style="float:right;" @click="editChannelSub(item)"><a href="#">编辑</a></span>
      </div>

      <!--div class="line layout horizontal" style="margin-top:10px;">
        <span class="title">测试服务器地址</span>
        <input type="text" placeholder="请填写测试服务器地址" v-model="config.testServer" class="input" ></ui-input>
      </div-->

      <div class="split"></div>

      <div class="line">
        <span class="title" style="width:100px;" v-model="config.mainPackage.version">主包</span>
      </div>
      <div class="line layout horizontal">
        <span class="title">版本号</span>
        <input type="text" placeholder="请填写主包版本号" v-model="config.mainPackage.version" class="input"></input>
      </div>

      <div class="line layout horizontal">
        <span class="title"  style="width:100px;">远程地址</span>
        <input type="text" placeholder="请填写主包更新地址" v-model="config.mainPackage.url" class="input"></input>
      </div>


      <div class="split"></div>


      <div ><span style="float:left">子包:</span><span style="float:right;"><a href="#" @click="openDialog">添加</a></span></div>
      <div class="line">
        <span class="title">游戏名称</span>
          <span class="title">包名</span>
          <span class="title">版本号</span>
          <span v-model="item.fllowMain""class="title" >跟随主包</input>
      </div>
      <div v-for="(index,item) in config.subPackages" :key="index" class="line">
        <span class="title">{{item.gameName}}</span>
        <span class="title">{{item.packageName}}</span>
        <span class="title">{{item.version}}</span>
        <span v-model="item.fllowMain""class="title" > {{item.fllowMain?"是":"否"}}</input>
        <span style="float:right;" @click="editSub(item)"><a href="#">编辑</a></span>
      </div>

    </div>
    <ui-button class="layout" style="margin-top:20px;width:100%;" @click="onCreateHotPackage" >生成更新包</ui-button>

    <div class="split"></div>


    <div class="layout horizontal" style="margin-top:30px">
      <span class="title">目录</span>
      <input type="text" placeholder="请填写子包更新地址" v-model="config.localServerPath" class="input"></input>
    </div>

    <ui-button class="layout" style="margin-top:20px;width:100%;" @click="onCopyToLocalServer" >布署到本地服务器</ui-button>

    <ui-button class="layout" style="margin-top:20px;width:100%;" @click="onCopyTestServer" >布署到测试服务器</ui-button>

    <ui-button class="layout" style="margin-top:20px;width:100%;" @click="onCopyToServer" >布署到正式服务器</ui-button>

    <ui-loader color="rgba(128,0,0,0.3)" v-if="loadVisible" >{{loadingTip}}</ui-loader>

    <div  class="white_content" v-if="addSubpackVisible">
        <p style="height:25px;background-color:#cccccc;text-align:center;line-height:25px;margin-top:0px;font-size:15px;">添加子包<span style="float:right;width:30px;" @click="closeDialog">X</span></p>
        <p class="addLine">游戏名称<input type="text" placeholder="请填写游戏名称" v-model="addSubPackage.gameName" style="width:100px;height:20px;margin-left:10px;"></input></p>
        <p class="addLine">项目包名<input type="text" placeholder="请填写项目包名" v-model="addSubPackage.packageName" style="width:200px;height:20px;margin-left:10px;"></input></p>
        <p class="addLine">更新地址<input type="text" placeholder="请填写更新地址" v-model="addSubPackage.updateUrl" style="width:200px;height:20px;margin-left:10px;"></input></p>
        <p class="addLine">跟随主包<input type="checkbox" v-model="addSubPackage.fllowMain" style="margin-left:10px;height:20px;vertical-align:middle;"></p>
        <p class="addLine">版本号<input type="text" placeholder="请填写游戏版本号" v-model="addSubPackage.version" style="width:100px;height:20px;margin-left:20px;"></input></p>

        <p style="height:30px;background-color:#cccccc;text-align:center;line-height:30px;font-size:15px;" @click="onAddSub">确 定</p>
    </div> 
    <div  class="black_overlay" v-if="addSubpackVisible" @click="closeDialog"></div> 
  `,

  // method executed when template and styles are successfully loaded and initialized
  ready() {

    new window.Vue({
      
      

      el: this.shadowRoot,

      data: {
        testServer:"",
        _metaBundles: undefined,
        loadVisible: false,
        loadingTip: "",
        //serveFolder: "D:\\projs\\web-server\\public\\update",
        buildPath: "",
        config:null,
        addSubpackVisible:false,

        SUBCONFIG:{
          gameName:"",
          packageName:"",
          updateUrl:"",
          version:"1.0.0",
          fllowMain:true
        },

        addSubPackage:Object.assign({},this.SUBCONFIG)
      },

      created() {
        this.buildPath = path.join(Editor.Project.path, "build", "jsb-default");
        //读取assets目录
        //let assetsPath = path.join(this.buildPath, "remote")
        //this.assetFolder = assetsPath;
        this._loadConfig();
      },

      methods: {

        onAddSub(){
          if(
            !this.addSubPackage.gameName ||
            !this.addSubPackage.packageName ||
            !this.addSubPackage.updateUrl
          ){
            alert("信息配置错误")
          }else{
            let game=this.config.subPackages.filter(info=>info.packageName==this.addSubPackage.packageName)[0];
            if(game){
              Object.assign(game,this.addSubPackage);
              this._saveConfig();
              this.closeDialog();
              alert("更新成功")
            }else{
              let data=Object.assign({},this.addSubPackage);
              this.config.subPackages.push(data);
              this._saveConfig();
              this.closeDialog();
              alert("添加成功")
            }
          }
        },  


        editSub(item){
          this.addSubPackage=Object.assign({},item);
          this.openDialog();
        },

        openDialog(){
          this.addSubpackVisible=true;
        },

        closeDialog(){
          this.addSubpackVisible=false;
          this.addSubPackage=Object.assign({},this.SUBCONFIG)
        },


        _loadConfig(){
          let path=Editor.url("packages://gametools/config.json");
          if(fs.existsSync(path)){
            let data=fs.readFileSync(path);
            this.config=JSON.parse(data);
          }else{
            this.config=config;
          }
        },

        _getRemoteData(url, cb,customData) {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function state_Change() {
            if (xhr.readyState == 4) { // 4 = "loaded"
              if (xhr.status == 200) { // 200 = OK
                cb&&cb(JSON.parse(xhr.responseText),customData)
              } else {
                Editor.error("远程地址错误",url);
                cb&&cb(null,customData);
              }
            }
          };
          xhr.open("GET", url, true);
          xhr.send(null);
        },

        _saveConfig(){
            //保存配置文件
            let configPath=Editor.url("packages://gametools/config.json");
            fs.ensureFileSync(configPath);
            fs.writeFileSync(configPath,JSON.stringify(this.config));
            Editor.success("保存配置成功")
        },


        //压缩图片
        _compressImage(dirName){
          this.loadingTip = "压缩资源中..."
          gulp.src(dirName)
          .pipe(imagemin())
          .pipe(gulp.dest(dirName+"/dist"))
        },

        //加密图片
        _encryptImage(){
          //python encode.py ../build/jsb-default/assets
          let str=path.join(Editor.Project.path,"buildTools","encode.py");
          let assetFolder=path.join(this.buildPath,"assets");
          let exeCmd=`python ${str} ${assetFolder}`
          exec(exeCmd);
        },

        _copyUnityGames(){
          let assetsPath=path.join(this.buildPath, "assets");
          //copy unitygames to ../build/jsb-default/assets
          fs.copySync(path.join(Editor.Project.path,"unityGames"),assetsPath);
        },

        onCreateHotPackage() {
          this.loadVisible = true;
          this.loadingTip = "生成更新包..."
          setTimeout(() => {
            this._copyUnityGames();

            this._encryptImage();

            this._saveConfig();

            let assetsPath=path.join(this.buildPath, "assets");
            fs.ensureDirSync(assetsPath);

            //复制unity闪屏图
            fs.copySync(path.join(Editor.Project.path,"splashs"),path.join(assetsPath,"splashs"));

            
          // this.createEmptyForBundles();
          // Editor.success("子包配置文件生成成功")

            /*
           //生成热更新包目录
          let hotUpdatePath = path.join(Editor.Project.path, "hotpackages", this.config.mainPackage.version,"online");
          fs.removeSync(hotUpdatePath);
          fs.emptyDirSync(hotUpdatePath);
          */
         
           //生成空文件
           let manifest=JSON.parse(JSON.stringify(manifestTemplate));
           fs.writeFileSync(path.join(assetsPath, 'project.manifest'), JSON.stringify(manifest));
           delete manifest.assets;
           delete manifest.searchPaths;
           fs.writeFileSync(path.join(assetsPath,'version.manifest'), JSON.stringify(manifest));
          // this._createPackage(hotUpdatePath);
           

           for(let i=0;i<config.channels.length;i++){
              let channel=config.channels[i];
              //生成测试热更新包目录
              let hotUpdatePath = path.join(Editor.Project.path, "hotpackages", this.config.mainPackage.version,channel.floderName);
              fs.removeSync(hotUpdatePath);
              fs.emptyDirSync(hotUpdatePath);
              this._createPackage(hotUpdatePath,channel);
           }

          this._removeNotFllowPackage();

          this.loadVisible = false;
          Editor.success("生成热更新包成功:"+(new Date()).toLocaleTimeString())
          
          //打开止录

         }, 200);
        },




        _createPackage(packagePath,channelConfig){
          let assetsPath=path.join(this.buildPath, "assets");
          //生成主包
          let mainPackagePathTemp = path.join(packagePath, "main_package_temp");
          fs.ensureDirSync(mainPackagePathTemp);

          let srcPath=path.join(this.buildPath, "src");
          fs.ensureDirSync(srcPath);

          fs.copySync(path.join(assetsPath,"gamecore"), path.join(mainPackagePathTemp,"assets","gamecore"));
          fs.copySync(path.join(assetsPath,"mainpackage"), path.join(mainPackagePathTemp, "assets","mainpackage"));
          fs.copySync(path.join(assetsPath,"internal"), path.join(mainPackagePathTemp, "assets","internal"));
          fs.copySync(path.join(assetsPath,"main"), path.join(mainPackagePathTemp, "assets","main"));
          fs.copySync(path.join(this.buildPath,"src"), path.join(mainPackagePathTemp, "src"));

          //添加后綴 渠道號/版本號/主文件/
          //let packageUrl=this.config.mainPackage.url.replace(this.config.onlineServer,channelConfig.url)
          let packageUrl=`${channelConfig.url}/${channelConfig.channel}/${this.config.mainPackage.version}/main/`
          let floderName=path.join(packagePath,"main");
          this._createManifest(mainPackagePathTemp,floderName, this.config.mainPackage.version, packageUrl)
          fs.removeSync(mainPackagePathTemp);

          //生成压缩包
          /*
          compressing.zip.compressDir(floderName,path.join(packagePath,"main.zip")).then(()=>{
             Editor.success("main.zip 生成成功!")
          })*/
          
          let subPath=path.join(packagePath,"sub");
          fs.removeSync(subPath);
          fs.ensureDirSync(subPath);

          this.config.subPackages.forEach(bundle => {

            let sourceDir=path.join(assetsPath,bundle.packageName);
            if(fs.pathExistsSync(sourceDir)){
                          
              //添加后綴 渠道號/版本號/主文件/ unityCommon要加上unity主文件名
              let packageUrl=`${channelConfig.url}/${channelConfig.channel}/${bundle.version}/`//
              let isUnityCommon=bundle.packageName.indexOf("unityCommon")!=-1
              if(isUnityCommon){
                packageUrl+="unity/"
              }
              packageUrl+=bundle.packageName+"/"
              let floderName=path.join(subPath,bundle.packageName);
              this._createManifest(sourceDir,floderName,bundle.version, packageUrl);

              //跟随主包的游戏,拷贝清单文件到游戏里面去
              if(bundle.fllowMain){
                //unity游戏需要拷贝到包里面去
                let bpath=path.join(assetsPath,bundle.packageName);
                if(!fs.pathExistsSync(bpath)){
                  fs.copySync(floderName,bpath)
                }else{
                  fs.copyFileSync(path.join(floderName,"project.manifest"),path.join(assetsPath,bundle.packageName,"project.manifest"));
                  fs.copyFileSync(path.join(floderName,"version.manifest"),path.join(assetsPath,bundle.packageName,"version.manifest"));
                }
              }

              if(!isUnityCommon){
                 //生成压缩包
                 /*
                compressing.zip.compressDir(floderName,path.join(packagePath,bundle.packageName+".zip")).then(()=>{
                    Editor.success(bundle.packageName+".zip 生成成功!")
                })*/
              }
            }
            //复制清单文件到build目录
            //fs.copyFileSync(path.join(bundlePath,"project.manifest"),path.join(assetsPath,bundle.packageName,"project.manifest"));
            //fs.copyFileSync(path.join(bundlePath,"version.manifest"),path.join(assetsPath,bundle.packageName,"version.manifest"));
          });

        

          //复制unityCommon版本文件
          fs.copyFileSync(path.join(subPath,"unityCommon_arm64-v8a","project.manifest"),path.join(assetsPath,"unityCommon_arm64-v8a.manifest"));
          fs.copyFileSync(path.join(subPath,"unityCommon_armeabi-v7a","project.manifest"),path.join(assetsPath,"unityCommon_armeabi-v7a.manifest"));

          //移動common多cup架構文件到unity目錄
          fs.ensureDirSync("unity");
          fs.moveSync(path.join(subPath,"unityCommon_arm64-v8a"),path.join(subPath,"unity","unityCommon_arm64-v8a"))
          fs.moveSync(path.join(subPath,"unityCommon_armeabi-v7a"),path.join(subPath,"unity","unityCommon_armeabi-v7a"))
          
        },

        _removeNotFllowPackage(){
          
          let assetsPath=path.join(this.buildPath, "assets");

          this.config.subPackages.forEach(bundle => {

            let sourceDir=path.join(assetsPath,bundle.packageName);
            if(fs.pathExistsSync(sourceDir)){
              //如果不跟随主包刚从build目录中移除
              if(!bundle.fllowMain){
                fs.removeSync(sourceDir);
              }
          }});
        },

        _createManifest(sourceDir, destDir, version, updateUrl) {
          let createCmd = `node ${Editor.url("packages://gametools/tools/version_generator.js")} -v ${version} -u ${updateUrl} -s ${sourceDir} -d ${destDir}`;
          exec(createCmd);
        },

        onCopyToLocalServer() {
          this.loadVisible = true;
          this.loadingTip = "同步到本地服务器中..."
          Editor.log(this.config.localServerPath)
 
          fs.removeSync(this.config.localServerPath)
          fs.ensureDirSync(this.config.localServerPath);
          let hotUpdatePath = path.join(Editor.Project.path, "hotpackages", this.config.mainPackage.version);
          fs.copySync(hotUpdatePath, this.config.localServerPath);
          setTimeout(() => {
            this.loadVisible = false;
            Editor.success("同步到本地服务器成功");
          }, 1000);
        },

        onCopyTestServer(){
          this.loadVisible = true;
          this.loadingTip = "上传测试服务器中..."

          let hotUpdatePath = path.join(Editor.Project.path, "hotpackages", this.config.mainPackage.version,"*");

          let config={
              host:"192.168.7.100",
              user:"user_xh",
              password:"user_xh",
              destDir:"/data/download"
          }

          setTimeout(()=>{
            //先写死，后面做成配置
            let createCmd = `scp -r ${hotUpdatePath} ${config.user}@${config.host}:${config.destDir}`;
            Editor.log("createCmd",createCmd);
            exec(createCmd,(error, stdout, stderr)=>{
              Editor.log("error:"+error);
              Editor.log("stdout:"+stdout);
              Editor.log("stderr:"+stderr);
            });
            
            /*
            exec(pwd);
            this.loadVisible = false;
            Editor.success("同步到本地服务器成功");*/
          },200)

        },

        onCopyToServer(){
          this.loadVisible = true;
          this.loadingTip = "上传测试服务器中..."

          let hotUpdatePath = path.join(Editor.Project.path, "hotpackages", this.config.mainPackage.version,"*");

          let config={
              host:"149.129.131.148",
              user:"root",
              password:"Esport2021!",
              destDir:"/root/uploads/hot/cocos"
          }

          setTimeout(()=>{
            //先写死，后面做成配置
            let createCmd = `scp -r ${hotUpdatePath} ${config.user}@${config.host}:${config.destDir}`;
            Editor.log("createCmd",createCmd);
            exec(createCmd,(error, stdout, stderr)=>{
              Editor.log("error:"+error);
              Editor.log("stdout:"+stdout);
              Editor.log("stderr:"+stderr);
            });

          },200)
        }
        

      }
    });
  },

  // register your ipc messages here
  messages: {
    'gametools:hello'(event) {
      this.$label.innerText = 'Hello!';
    }
  }
});