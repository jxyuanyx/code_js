
const fs = require("fs-extra")
const path = require("path")
const exec = require("child_process").execSync;
const execFile = require("child_process").execFileSync;

const manifestTemplate = {
    packageUrl: '',
    remoteManifestUrl: '',
    remoteVersionUrl: '',
    version: '1.0.0',
    assets: {},
    searchPaths: []
};

const option_re = {force:true, recursive:true};
const option_unre = {force:true, recursive:false};

const config={
    // onlineServer:"",
    // testServer:"",
    // localServerPath:"",
    mainPackage:{
        version:"1.0.0",
        url:""
    },
    subPackages:[],
    channels:[
        {
          floderName:"国内测试",
          channel:"GPID_And_001",
          url:"http://120.78.235.228/media/assets",
          add:false,
        },
        {
          floderName:"印度测试",
          channel: "GPID_And_001",
          url: "http://147.139.76.207/media/assets",
          add:false,
        },
        {
          floderName:"印度线上",
          channel: "GPID_And_001",
          url: "http://static.skill-app.com/media/assets",
          add:false,
        },
        {
          floderName:"印度审核",
          channel: "GPID_And_001",
          url: "http://149.129.187.137/media/assets",
          add:false,
        }
    ],
};

const SUBCONFIG = {
    gameName:"",
    packageName:"",
    updateUrl:"",
    version:"1.0.0",
    fllowMain:true
};


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
    .line{height:28px;line-height:30px;width:100%;}
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

        //     //压缩图片
        //     // _compressImage(dirName){
        //     //     this.loadingTip = "压缩资源中..."
        //     //     gulp.src(dirName)
        //     //         .pipe(imagemin())
        //     //         .pipe(gulp.dest(dirName+"/dist"))
        //     // },

  // html template for panel
// 、、        <span width="600">{{formatStr(item.url,100)}}</span>
  // / <span class="title">{{item.url}}</span>
  template: `
    <div class="layout vertical" style="margin-top:10px;">
        <div v-for="(index,item) in config.channels" :key="index" class="line">
            <span class="title">{{item.floderName}}</span>
            <input type="text" placeholder="地址" v-model="item.url" class="input"></input>
            <span class="title" style="float:right;">
                生成<input type="checkbox" v-model="item.add">
            </span>
        </div>
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

        <div><span style="float:left">子包:</span><span style="float:right;"><a href="#" @click="openDialog">添加</a></span></div>
        <div class="line">
            <span class="title">游戏名称</span>
            <span class="title">包名</span>
            <span class="title">版本号</span>
            <span class="title" >跟随主包</input>
        </div>
        <div v-for="(index,item) in config.subPackages" :key="index" class="line">
            <span class="title">{{formatStr(item.gameName,10)}}</span>
            <span class="title">{{formatStr(item.packageName,10)}}</span>
            <span class="title">{{item.version}}</span>
            <span class="title"><input type="checkbox" v-model="item.fllowMain" height:40px;></span>
            <!--<span v-model="item.fllowMain""class="title" > {{item.fllowMain?"是":"否"}}</input>-->
            <span style="float:right;">
                <!--<span><a href="#" @click="clearSub(item)">删除</a></span>-->
                <span><a href="#" @click="editSub(item)">编辑</a></span>
            </span>
        </div>
    </div>

    <ui-button style="margin-top:10px; width:100%;" @click="onClickHotPackage" >生成更新包</ui-button>
    <ui-button style="margin:10px 0px 0px 0px;width:32%;" @click="saveConfig" >保存配置</ui-button>
    <ui-button style="margin:10px 0px 0px 0px;width:32%;" @click="changeProject" >替换project</ui-button>
    <ui-button style="margin:10px 0px 0px 0px;width:32%;" @click="openPackFolder" >打开热更文件夹</ui-button>

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
            loadVisible: false,
            loadingTip: "",
            buildPath: "",
            config:null,
            channels:null,
            addSubpackVisible:false,
            first_channel:"",
            addSubPackage:Object.assign({},SUBCONFIG)
        },

        created() {
            this.buildPath = path.join(Editor.Project.path, "build", "jsb-default");
            this.loadConfig();
        },

        methods: {
                formatStr(str, count){
                    str = str.replace("-","一");
                    if(str.length > count){
                        return str.slice(-count);
                    }
                    return str;
                },
                channelUse(index){
                    setTimeout(()=>{
                        this.saveConfig();
                    })
                },
                loadConfig(){
                    let config_path=Editor.url("packages://subpack/subconfig.json");
                    if(fs.existsSync(config_path)){
                        let data=fs.readFileSync(config_path);
                        this.config=JSON.parse(data);
                    }
                    else{
                        this.config=config;
                    }
                },
                saveConfig(){
                    let config_path=Editor.url("packages://subpack/subconfig.json");
                    fs.writeFileSync(config_path, JSON.stringify(this.config));
                    Editor.success("保存配置成功")
                },
                openDialog(){
                    this.addSubpackVisible=true;
                },
                closeDialog(){
                    this.addSubpackVisible=false;
                },
                editSub(item){
                    this.addSubPackage=Object.assign({},item);
                    this.openDialog();
                },
                clearSub(item){
                    let index = this.config.subPackages.indexOf(item);
                    if(index > -1){
                        this.config.subPackages.splice(index, 1);
                        this.saveConfig();
                    }
                    else{
                        Editor.error("没找到对应游戏!!!");
                    }
                },
                onAddSub(){
                    if(!this.addSubPackage.gameName ||!this.addSubPackage.packageName ||!this.addSubPackage.updateUrl){
                        Editor.error("信息配置错误")
                    }
                    else{
                        let game=this.config.subPackages.find(info=>info.packageName==this.addSubPackage.packageName);
                        if(game){
                          Object.assign(game,this.addSubPackage);
                          Editor.log("更新成功");
                        }else{
                          let data=Object.assign({},this.addSubPackage);
                          this.config.subPackages.push(data);
                          Editor.log("添加成功");
                        }
                        this.saveConfig();
                        this.closeDialog();
                    }
                },
                //加密图片
                _encryptImage(){
                    //python encode.py ../build/jsb-default/assets
                    Editor.log("加密图片:"+(new Date()).toLocaleTimeString())
                    let str=path.join(Editor.Project.path,"buildTools","encode.py");
                    let assetFolder=path.join(this.buildPath,"assets");
                    let exeCmd=`python ${str} ${assetFolder}`
                    exec(exeCmd);
                    Editor.log("加密图片end:"+(new Date()).toLocaleTimeString())
                },
                _copyUnityGames(){
                    //copy unitygames to ../build/jsb-default/assets
                    Editor.log("_copyUnityGames:"+(new Date()).toLocaleTimeString())
                    let assets_path=path.join(this.buildPath, "assets");
                    fs.copySync(path.join(Editor.Project.path,"unityGames"),assets_path,option_re);
                    this._removeNotFllowPackage();
                    Editor.log("_copyUnityGames end:"+(new Date()).toLocaleTimeString())
                },
                onClickHotPackage(){
                    this.loadVisible = true;
                    this.loadingTip = "生成更新包...";
                    try {
                        setTimeout(this.onCreateHotPackage.bind(this),100);
                    } 
                    catch(err){
                        this.loadVisible = false;
                        Editor.error(err);
                    }

                },
                onCreateHotPackage() {
                    this.saveConfig();
                    this._copyUnityGames();
                    this._encryptImage();

                    let assets_path = path.join(this.buildPath, "assets");
                    let project_path = Editor.Project.path;

                    //复制unity闪屏图
                    fs.copySync(path.join(project_path,"splashs"),path.join(assets_path,"splashs"),option_re);
                    
                    //生成空文件
                    let manifest=JSON.parse(JSON.stringify(manifestTemplate));
                    fs.writeFileSync(path.join(assets_path, 'project.manifest'), JSON.stringify(manifest));
                    delete manifest.assets;
                    delete manifest.searchPaths;
                    fs.writeFileSync(path.join(assets_path,'version.manifest'), JSON.stringify(manifest));

                    //清空热更新包目录
                    let hot_path = path.join(project_path, "hotpackages", this.config.mainPackage.version);
                    if(fs.pathExistsSync(hot_path)){
                        fs.removeSync(hot_path, option_re);
                    }
                    fs.ensureDirSync(hot_path);

                    this.first_channel = "";
                    for(let i=0 ; i < this.config.channels.length ; i++){
                        let channel=this.config.channels[i];
                        if(!channel.add)continue;
                        Editor.log(channel.floderName+":"+(new Date()).toLocaleTimeString())
                        let channel_path = path.join(hot_path,channel.floderName);
                        fs.ensureDirSync(channel_path);
                        if(this.first_channel == ""){
                            //生成测试热更新包目录
                            this.first_channel = channel.floderName;
                            this._createPackage(channel_path,channel);
                        }
                        else{
                            let first_path = path.join(hot_path,this.first_channel);
                            fs.copySync(first_path, channel_path);
                            this.changeManifest(channel_path,channel);
                        }
                        Editor.log(this.config.channels[i].floderName+"end:"+(new Date()).toLocaleTimeString())
                    }
                    // this._removeNotFllowPackage();
                    this.loadVisible = false;
                    Editor.success("生成热更新包成功:"+(new Date()).toLocaleTimeString())
                },
                _createPackage(packagePath,config){
                    let assets_path = path.join(this.buildPath, "assets");
                    //生成主包
                    let main_path = path.join(packagePath, "main");
                    fs.ensureDirSync(main_path);

                    let srcPath=path.join(this.buildPath, "src");
                    fs.ensureDirSync(srcPath);

                    let folders = ["gamecore","mainpackage","internal","main"];
                    for(let i = 0 ; i < folders.length ; i++){
                         fs.copySync(path.join(assets_path,folders[i]), path.join(main_path,"assets",folders[i]));
                    }
                    fs.copySync(srcPath, path.join(main_path,"src"));
                    let packageUrl=`${config.url}/${config.channel}/${this.config.mainPackage.version}/main/`
                    let floderName=path.join(packagePath,"main");
                    this._createManifest(floderName,floderName,this.config.mainPackage.version, packageUrl);
                    this._createSub(packagePath, assets_path, config);
                },

                _createSub(packagePath,assets_path,config){
                    let subPath = path.join(packagePath,"sub");
                    fs.ensureDirSync(subPath);

                    let subpacks = this.config.subPackages;
                    for(let i = 0 ; i < subpacks.length ; i++){
                        let bundle = subpacks[i];
                        if(!bundle.fllowMain)continue;
                        let sourceDir=path.join(assets_path,bundle.packageName);
                        fs.ensureDirSync(sourceDir);
                        let packageUrl=`${config.url}/${config.channel}/${bundle.version}/`//
                        let isUnityCommon=bundle.packageName.indexOf("unityCommon")!=-1
                        if(isUnityCommon)packageUrl+="unity/";
                        packageUrl+=bundle.packageName+"/";
                        let floderName=path.join(subPath,bundle.packageName);
                        fs.ensureDirSync(floderName);
                        fs.copySync(sourceDir, floderName);
                        this._createManifest(floderName,floderName,bundle.version, packageUrl);
                        // Editor.log("form:" + path.join(floderName,"project.manifest"))
                        // Editor.log("to:" + path.join(assets_path,bundle.packageName,"project.manifest"))
                        fs.copyFileSync(path.join(floderName,"project.manifest"),path.join(assets_path,bundle.packageName,"project.manifest"));
                        fs.copyFileSync(path.join(floderName,"version.manifest"),path.join(assets_path,bundle.packageName,"version.manifest"));
                    }
                    //复制unityCommon版本文件
                    let have_v8 = fs.existsSync(path.join(subPath,"unityCommon_arm64-v8a"));
                    let have_v7 = fs.existsSync(path.join(subPath,"unityCommon_armeabi-v7a"));
                    if(!have_v8 && !have_v7)return;
                    fs.ensureDirSync("unity");
                    if(have_v8){
                        fs.copyFileSync(path.join(subPath,"unityCommon_arm64-v8a","project.manifest"),path.join(assets_path,"unityCommon_arm64-v8a.manifest"));
                        fs.moveSync(path.join(subPath,"unityCommon_arm64-v8a"),path.join(subPath,"unity","unityCommon_arm64-v8a"))
                    }
                    if(have_v7){
                        fs.copyFileSync(path.join(subPath,"unityCommon_armeabi-v7a","project.manifest"),path.join(assets_path,"unityCommon_armeabi-v7a.manifest"));
                        fs.moveSync(path.join(subPath,"unityCommon_armeabi-v7a"),path.join(subPath,"unity","unityCommon_armeabi-v7a"))
                    }
                },

                changeManifest(channel_path,config){
                    let packageUrl=`${config.url}/${config.channel}/${this.config.mainPackage.version}/main/`;
                    let main_path = path.join(channel_path, "main");
                    this.changeOneManifest(main_path, packageUrl);
                    let subpacks = this.config.subPackages;
                    for(let i = 0 ; i < subpacks.length ; i++){
                        let bundle = subpacks[i];
                        if(bundle.fllowMain){
                            let packageUrl=`${config.url}/${config.channel}/${bundle.version}/`;
                            let isUnityCommon=bundle.packageName.indexOf("unityCommon")!=-1
                            if(isUnityCommon)packageUrl+="unity/";
                            packageUrl+=bundle.packageName+"/";
                            let sub_path = path.join(channel_path,"sub",subpacks[i].packageName);
                            this.changeOneManifest(sub_path, packageUrl);
                        }
                    }
                },
                changeOneManifest(cur_path, url){
                    let all = ["project.manifest", "version.manifest"];
                    for(let i = 0 ; i < all.length ; i++){
                        let final_path = path.join(cur_path, all[i]);
                        let str = fs.readFileSync(final_path);
                        let data = JSON.parse(str);
                        data.packageUrl = url;
                        data.remoteManifestUrl = url + 'project.manifest';
                        data.remoteVersionUrl = url + 'version.manifest';
                        fs.writeFileSync(final_path, JSON.stringify(data));
                    }
                },

                _removeNotFllowPackage(){
                    let assets_path=path.join(this.buildPath, "assets");
                    let subs = this.config.subPackages;
                    for(let i = 0; i < subs.length ; i++){
                        let bundle = subs[i];
                        if(bundle.fllowMain)continue;
                        let final_path = path.join(assets_path,bundle.packageName);
                        if(fs.pathExistsSync(final_path)){
                            fs.removeSync(final_path, option_re);
                        }
                    }
                },

                _createManifest(sourceDir, destDir, version, updateUrl) {
                    let createCmd = `node ${Editor.url("packages://subpack/version_generator.js")} -v ${version} -u ${updateUrl} -s ${sourceDir} -d ${destDir}`;
                    exec(createCmd);
                },

                changeProject(){
                    let uuid = Editor.remote.assetdb.urlToUuid("db://assets/welcome/project.manifest");
                    this.buildPath = path.join(Editor.Project.path, "build", "jsb-default");
                    let folder = uuid.slice(0, 2);
                    let target_path = path.join(this.buildPath, "assets" ,"main", "native" ,folder,uuid+".manifest");
                    
                    for(let i=0 ; i < this.config.channels.length ; i++){
                        let channel = this.config.channels[i];
                        if(channel.add){
                            let project_path = Editor.Project.path;
                            let hot_path = path.join(project_path, "hotpackages", this.config.mainPackage.version);
                            let ori_path = path.join(hot_path,channel.floderName,"main","project.manifest");
                            let str = fs.readFileSync(ori_path);
                            fs.writeFileSync(target_path, str);
                            Editor.success("已替换:"+target_path);
                            return;
                        }
                    }
                    Editor.warn("没有渠道!!");
                },

                openPackFolder(){
                    let project_path = Editor.Project.path;
                    for(let i=0 ; i < this.config.channels.length ; i++){
                        let channel=this.config.channels[i];
                        if(!channel.add)continue;
                        let hot_path = path.join(project_path, "hotpackages", this.config.mainPackage.version, channel.floderName);
                        exec("start " + hot_path);
                        return;
                    }
                }

            //methods结束
            }
        //vue结束
        });
    //ready结束
    }
//Editor.Panel.extend结束
});