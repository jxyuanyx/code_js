package platform;

import android.app.Activity;

public interface IPlatformService {

    /**
     * 设置当前游戏
     */
    void setCurrentGame(String gameInfo);

    /**
     * 设置当前的语言
     * @param lang
     */
    void setLang(String lang);

    /**
     * 获取当前的游戏语言
     * @return
     */
    String getLang();

    /**
     * 获取当前的游戏
     * Game{
     *     public int gameId;               //游戏ID
     *     public String gameName;          //游戏名称
     *     public String matchPlayers;      //匹配信息
     * }
     * @return Game2JSON
     */
    String getCurrentGame();

    /**
     * 上传当前游戏结果
     * @param score         游戏分数
     * @param log           游戏日志
     */
    void uploadGameResult(int score,String log);

    /**
     * 设置游戏开始上报后的回调
     * @param target        宿主
     * @param funName       回调函数
     */
    void setStartGameUploadCompelte(String target,String funName);

    /**
     * 设置游戏结束上报后的回调
     * @param target        宿主
     * @param funName       回调函数
     */
    void setGameResultUploadCompelte(String target,String funName);

    /**
     * 设置游戏数据
     * @param userData
     */
    void setUserData(String userData);

    /**
     * 结束当前游戏
     */
    void finishGame();

    /**
     * 设置当前游戏场景
     * @param activity
     */
    void setCurrentGameScene(Activity activity);

    boolean checkAdb(Activity app);
}
