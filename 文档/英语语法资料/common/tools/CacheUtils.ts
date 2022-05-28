
import cv from "../../components/lobby/cv";

//文件类型
enum TYPE { 
  JPG = "jpg",
  JPEG = "jpeg",
  PNG = "png",
  MP3 = "mp3",
  MP4 = "mp4",
  AVI = "avi",
  WMV = "wmv",
}

//错误
export enum ERROR {
  LOAD_ERROR = 0,
  DOWNLOAD_FAILED = 1,
  DOWNLOAD_ERROR = 2,
  DOWNLOAD_TIMEOUT = 3,
}

/**
 * 文件缓存工具类
 */
export class CacheUtils {
  private static instance: CacheUtils;
  _cacheDir: string;

  
  public static getInstance(): CacheUtils {
      if (!this.instance) {
          this.instance = new CacheUtils();
      }
      return this.instance;
  }

  /**
   * 初始化缓存
   */
  initCache() {
    if (!cc.sys.isNative) return;

    console.log(`初始化开始`);
    this._cacheDir = `${jsb.fileUtils.getWritablePath()}PKWFilesCache`;
    jsb.fileUtils.createDirectory(this._cacheDir);
    console.log(`初始化结束,缓存目录:${this._cacheDir}`);
  }

  /**
   * 获取缓存大小
   */
  getCacheSize() {
    if (!cc.sys.isNative) return 0;

    console.log(`开始获取缓存大小`);
    let size = 0;    
    let paths: Array<string> = jsb.fileUtils.listFiles(this._cacheDir);
    paths.forEach(path => {
      if (jsb.fileUtils.isDirectoryExist(path)) return;
      size += jsb.fileUtils.getFileSize(path);
    });
    console.log(`缓存大小:${size}`);
    return size;
  }

  /**
   * 缓存是否存在
   * @param url 网络地址
   */
  isCacheExist(url: string) {
    if (!cc.sys.isNative) return true;

    return jsb.fileUtils.isFileExist(this.convertUrlToCachePath(url));
  }

  /**
   * 清除缓存
   */
  clearCache() {
    if (!cc.sys.isNative) return;

    console.log(`清理开始`);
    jsb.fileUtils.removeDirectory(this._cacheDir);
    console.log(`清理结束,缓存目录:${this._cacheDir}`);

    this.initCache();
  }

  /**
   * 删除缓存
   * @param url 缓存的网络地址
   */
  deleteCache(url: string) {
    if (!cc.sys.isNative) return;

    jsb.fileUtils.removeFile(this.convertUrlToCachePath(url));
    console.log(`删除缓存成功:${url}`);
  }

  /**
   * 加载
   * @param url 网络地址
   * @param successCallback 成功(资源)
   * @param errorCallback 失败(code)
   */
  load(url: string, successCallback: Function, errorCallback?: Function) {

    let nameType = this._getTypeByUrl(url);  //资源后缀
    console.log(`加载开始:${url},类型:${nameType}`);

    if (!cc.sys.isNative) {
      console.log(`使用Web加载:${url}`);
      this._loadRemoteResource(url, nameType, successCallback, errorCallback);
      return;
    }
    
    if (this.isCacheExist(url)) {
      console.log(`使用缓存:${url}`);
      this._loadRemoteResource(this.convertUrlToCachePath(url), nameType, successCallback, (code: any) => {
        this.deleteCache(url);
        errorCallback && errorCallback(code);
      });
      return;
    }

    console.log(`使用网络下载:${url}`);
    this.cache(url, (path: string) => {
      this._loadRemoteResource(path, nameType, successCallback, errorCallback);
    }, errorCallback);
  }

  /**
   * 加载视频中加载音频资源
   * @param url  视频网络地址
   * @param successCallback 成功(资源)
   * @param errorCallback 失败(code) 
   */
  loadAudioclipByVideo(url: string, successCallback: Function, errorCallback?: Function) {
    if (this.isCacheExist(url)) {
      console.log(`使用缓存:${url}`);
      this._loadRemoteResource(this.convertUrlToCachePath(url), "mp3", successCallback, (code: any) => {
        errorCallback && errorCallback(code);
      });
    }
  }


  /**
   * 缓存
   * @param url 网络地址
   * @param successCallback 成功(本地路径)
   * @param errorCallback 失败(code)
   */
  cache(url: string, successCallback?: Function, errorCallback?: Function) {
    if (!cc.sys.isNative) return;

    console.log(`缓存开始:${url}`);
    let path = this.convertUrlToCachePath(url);
    if (this.isCacheExist(url)) {
      console.log(`缓存已存在:${url}`);
      successCallback && successCallback(path);
      return;
    }

    this._download(url, path, () => {
      successCallback && successCallback(path);
    }, errorCallback);
  }

  /**
   * 将url转换成本地路径
   * @param url 网络地址
   */
  convertUrlToCachePath(url: string) {
    let path = `${this._cacheDir}/${cv.md5.md5(url)}`;
    let _type = this._getTypeByUrl(url);
    if(_type == TYPE.PNG){
      path += `.${TYPE.PNG}`;
    }else if(_type == TYPE.JPG){
      path += `.${TYPE.JPEG}`;
    }else if (_type == TYPE.MP4) { 
      path += `.${TYPE.MP4}`;
    } else if (_type == TYPE.AVI) { 
      path += `.${TYPE.AVI}`;
    }else if (_type == TYPE.WMV) { 
      path += `.${TYPE.WMV}`;
    }else if (_type == TYPE.MP3) { 
      path += `.${TYPE.MP3}`;
    }else if (_type == TYPE.JPEG) { 
      path += `.${TYPE.JPEG}`;
    }

    return path;
  }

  /**
   * 下载
   * @param url 网络地址
   * @param path 保存路径
   * @param successCallback 成功()
   * @param errorCallback 失败(code)
   */
  _download(url: string, path: string, successCallback?: Function, errorCallback?: Function) {
    if (!cc.sys.isNative) return;

    console.log(`下载开始:${url},路径:${path}`);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 && xhr.response) {
          let byte :Uint8Array= new Uint8Array(xhr.response);
          if(byte.byteLength == 0){
            console.log("下载的图片没有实际数据 url:" + url);
            return;
          }
          jsb.fileUtils.writeDataToFile(new Uint8Array(xhr.response), path);
          console.log(`下载成功:${url}`);
          successCallback && successCallback();
        } else {
          console.log(`下载失败:${url}`);
          errorCallback && errorCallback(ERROR.DOWNLOAD_FAILED);
        }
      }
    };
    xhr.ontimeout = () => {
      console.log(`下载超时:${url}`);
      errorCallback && errorCallback(ERROR.DOWNLOAD_TIMEOUT);
    };
    xhr.onerror = () => {
      console.log(`下载错误:${url}`);
      errorCallback && errorCallback(ERROR.DOWNLOAD_ERROR);
    };
    xhr.responseType = "arraybuffer";
    xhr.open("GET", url, true);
    xhr.send();
  }

  /**
   * 加载远程资源
   * @param url 网络地址
   * @param type 文件类型
   * @param successCallback 成功(cc.SpriteFrame||any)
   * @param errorCallback 失败(code)
   */
  _loadRemoteResource(url: string, type: string, successCallback?: Function, errorCallback?: Function) {
    console.log(`加载远程资源开始:${url},类型:${type}`);

    cv.resMgr.loadRemote(url, (error: any, resource: any) => {
        if (error) {
          console.log(`加载资源失败:${url}`);
          errorCallback && errorCallback(ERROR.LOAD_ERROR);
          return;
        }

        console.log(`加载资源成功:${url}`);
        var result = null;
        if (resource instanceof cc.Texture2D) {
          result = new cc.SpriteFrame(resource);
        } else {
          result = resource;
        }
        successCallback && successCallback(result);
    });
  }

  /**
   * 通过url获取文件类型
   * @param url 网络地址
   */
  _getTypeByUrl(url: string) {
    if (url.endsWith(TYPE.JPG) || url.endsWith(TYPE.JPEG)) {
      return TYPE.JPG;
    } else if (url.endsWith(TYPE.MP4)) {
      return TYPE.MP4;
    }else if(url.endsWith(TYPE.AVI)) {
      return TYPE.AVI;
    }else if(url.endsWith(TYPE.WMV)) {
      return TYPE.WMV;
    }else if(url.endsWith(TYPE.MP3)) {
      return TYPE.MP3;
    }

    return TYPE.PNG;
  }

   /**
   * 通过url获取文件类型
   * @param url 网络地址
   */
  _getAssetTypeByUrl(url: string): any {
      if (url.endsWith(TYPE.JPG) || url.endsWith(TYPE.JPEG) || url.endsWith(TYPE.PNG)) {
        return cc.Texture2D;
      } else {
        return cc.AudioClip;
      }
    }
}

