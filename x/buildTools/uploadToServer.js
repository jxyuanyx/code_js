var Client=require('ssh2').Client;
var path=require("path")
// var fs=require("fs")
let fs = require("fs-extra")
var readline = require('readline')
var compressing = require('compressing');

var Config=[
    {   
        desc:"国内测试",
        host: '120.78.143.78',
        port: 22,
        username: 'root',
        password: 'Esport2021!',
        floderName:"国内测试",
        remotePath:"/data/hot/pytest/"
    },

    {   
        desc:"印度测试",
        host: '149.129.132.48',
        port: 22,
        username: 'root',
        password: 'Esport2021!',
        floderName:"印度测试",
        remotePath:"/root/nginx/upload/hot/"
    },

    {   
        desc:"审核服",
        host: '120.78.143.78',
        port: 22,
        username: 'root',
        password: 'Esport2021!',
        floderName:"审核服", 
        remotePath:"/data/hot/"
    },

    {   
        desc:"线上",
        host: '149.129.131.148',
        port: 22,
        username: 'root',
        password: 'Esport2021!',
        floderName:"online",
        remotePath:"/root/uploads/hot/gp/"
    }
]

const [node, path0, ...params] = process.argv;

var version=params[0]       //版本号
var serverType=params[1]    //上传到哪台服务器与config对应

if(serverType>=Config.length){
    console.error("服务器配置不存在")
    return
}

const conn=new Client();
let ServerConfig=Config[serverType]
let pathStr=path.join("../hotpackages/",version,ServerConfig.floderName)
let zipFileStr=path.join("../hotpackages/",version,"cocos.zip");
let cocosFloder=path.join("../hotpackages/", version,"cocos");
//复制文件到新目录
if(fs.existsSync(cocosFloder)){
    fs.removeSync(cocosFloder);
}
fs.emptyDirSync(cocosFloder)
fs.copySync(pathStr,cocosFloder)

//正式服二次确认
if(serverType==3){
    const rl = readline.createInterface({
        input:process.stdin,
        output:process.stdout
    })
    let checkCode=(Math.floor(Math.random()*1000)+1000).toString();
    console.error("你确定要上传到正式服务器吗?\n如需要,请输入以下验证码:"+checkCode)
    rl.on('line',function(line) {
        console.log("line>>>>",line)
        if(line==checkCode){
            console.log("验证通过!")
            upload();
        }else{
            console.log("验证失败!")
            process.exit();
        }
    })
}else{
    upload();
}



function upload(){
    console.log("删除旧的压缩包...")
    if(fs.existsSync(zipFileStr)){
        fs.unlinkSync(zipFileStr)
    }
    //开始压缩文件
    console.log("压缩中...")
    compressing.zip.compressDir(cocosFloder,zipFileStr).then(()=>{
        console.log("压缩完成")
        conn.on('ready',()=>{
            console.log("连接服务器成功,开始上传更新文件")
            uploadToServerZipFile(conn);
        }).connect(Config[0])
    })
    
}

async function commandShell(conn){
    return new Promise((resolve,reject)=>{
        return conn.shell((err,stream)=>{
            if(err){
                reject(err)
            }else{
                resolve(stream)
            }
        })
    })
}

async function  uploadToServerZipFile(conn){
    conn.sftp((err,sftp)=>{
        if(!err){
            sftp.fastPut(zipFileStr,Config[0].remotePath+"cocos.zip",async (error)=>{
                if(error){
                    console.log("上传失败>>>>>>>>>")
                }else{
                    console.log("上传跳转服务器成功,执行服务器上传操作...")

                    let stream=await commandShell(conn);
                    stream.on('close', () => {
                        conn.end();
                        if(ServerConfig==Config[0]){
                          console.log('上传成功，请修改版本号');
                          process.exit();
                        }else{
                          conn.on('ready',async ()=>{
                            console.log("连接[ "+ServerConfig.desc+" ]服务器成功,开始解压文件")
                            let stream=await commandShell(conn);
                            stream.on('close', () => {
                                console.log('上传成功，请修改版本号');
                                conn.end();
                                process.exit();
                            }).on('data', (data) => {
                                console.log('OUTPUT: ' + data);
                            });
                            stream.end('unzip -o '+ServerConfig.remotePath+"cocos.zip -d "+ServerConfig.remotePath+"\nexit\n");                            
                          }).connect(ServerConfig)
                        }
                      }).on('data', (data) => {
                        console.log('OUTPUT: ' + data);
                      });
                    if(ServerConfig==Config[0]){
                        stream.end('unzip -o '+ServerConfig.remotePath+"cocos.zip -d "+ServerConfig.remotePath+"\nexit\n");
                    }else{
                        let updateToRemoteServer="sshpass -p Esport2021! scp "+Config[0].remotePath+"cocos.zip root@"+ServerConfig.host+":"+ServerConfig.remotePath+"\n";
                        updateToRemoteServer+="exit\n"
                        stream.end(updateToRemoteServer)
                    }
                }
            })
        }else{
            console.log("上传失败....1.",err)
        }
    })
}

//sshpass -p Esport2021! scp







