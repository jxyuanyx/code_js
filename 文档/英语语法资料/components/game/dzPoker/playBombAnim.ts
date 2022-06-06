
import cv from "../../lobby/cv";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    //火动画
    @property(cc.Animation)
    nodeAnimList: cc.Animation[] = [null];

    //粒子效果
    @property(cc.ParticleSystem)
    nodeParticleList: cc.ParticleSystem[] = [null];

    
    // onLoad () {}

    start () {

    }

    //播放暴击动画
    playBombAnim(){
        this.node.active = true;

        this.playAnimation();
        this.playParticles();
    }

    //停止播放暴击动画
    stopBombAnim(){
        this.node.active = false;
    }

    playAnimation() {
        for (let i = 0; i < this.nodeAnimList.length; i++) {
            if (!this.nodeAnimList[i]) return;
            const clips = this.nodeAnimList[i].getClips();

            let index = 0;
            if(i == 0){  //第一个动画需要考虑中英文
                if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
                    index = 0;
                }else{
                    index = 1; //英文动画索引
                }
            }

            if (index >= 0 && index < clips.length) {
                this.nodeAnimList[i].play(clips[index].name);
            }
            
        };
    }

    playParticles() {
        for (let i = 0; i < this.nodeParticleList.length; i++) {
            this.nodeParticleList[i].resetSystem();            
        };
    }


    // update (dt) {}
}
