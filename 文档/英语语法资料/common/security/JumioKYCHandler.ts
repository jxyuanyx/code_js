import cv from "../../components/lobby/cv";

export enum JUMIO_CHECK_TYPE {
    ID = "Id",
    FACIAL = "Selfie"
}

export enum JUMIO_IDENTITY_FAILED_TYPE {
    FAILED_ON_JUMIO_INITIALLY,
    FAILED_ON_IDENTIFICATION
}

/**
 * http://54.179.124.133:9898/
 * https://kyc-pkw-prod.a5-labs-cloud.com/
 * https://api.spicyonion.net/
 * http://usa.qiaohailin.com/
 */
export class JumioKYCHandler {
    private static instance: JumioKYCHandler = null;
    private scanReference: string = null;
    private scanType: JUMIO_CHECK_TYPE = JUMIO_CHECK_TYPE.FACIAL;
    private successHandler: Function = null;
    private failHandler: Function = null;
    private successCustomMsgKey: string = null;

    public static getInstance(): JumioKYCHandler {
        if (!JumioKYCHandler.instance) {
            JumioKYCHandler.instance = new JumioKYCHandler();
        }
        return JumioKYCHandler.instance;
    }

    /**
     * It will basically start the jumio process by fetching api secret and key from server and then it will to native event.
     * @param isFacialScanTypeRequired true represent that identification will include facial also and false represent only document scanning.
     * @param successHandler handler function called on jumio kyc process finish with success
     * @param failHandler handler function called on jumio kyc process fail for any reason
     * @param successCustomMsgKey custom message to be shown in popUp when process finish with success (msg i18n key to be used)
     */
    public startJumioProcess(isFacialScanTypeRequired: boolean, successHandler?: Function, failHandler?: Function, successCustomMsgKey?: string) {
        this.scanType = isFacialScanTypeRequired ? JUMIO_CHECK_TYPE.FACIAL : JUMIO_CHECK_TYPE.ID;
        this.successHandler = successHandler;
        this.failHandler = failHandler;
        this.successCustomMsgKey = successCustomMsgKey;

        let url: string = cv.domainMgr.getJumioKYCUrl() + cv.config.getStringData("WEB_API_GET_JUMIO_CREDENTIAL", true);
        console.log("startJumioProcess..........ppp");
        cv.http.sendRequest(url, {}, this.onFetchingJumioCredentialSuccess.bind(this, isFacialScanTypeRequired), cv.http.HttpRequestType.GET, null, true, true);
    }

    /** Restart Jumio process with same parameters like last time */
    public restartJumioKYCProcess(): void {
        let respMsgKey: string = "";
        if (cc.sys.isNative) {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JumioKYCHandler", "restartNetverify", "()V");
            }
            else if (cc.sys.os === cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NetverifyStartViewController", "restartNetverify", respMsgKey);
            }
        }
    }

    /**
     * Success handler for request jumio credentials from backend server (startJumioProcess)
     * @param isFacialScanRequired Whether is facial scan also required or not
     * @param value This paramenter will contain response from the server along with Jumio Token and Secret.
     */
    onFetchingJumioCredentialSuccess(isFacialScanRequired: boolean, value: any) {
        let apiToken: string = value["token"];
        let apiSecret: string = value["secret"];
        console.log("onFetchingJumioCredentialSuccess.........apiToken：" + apiToken + "  apiSecret: " + apiSecret);
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/JumioKYCHandler", "startNetverify", "(Ljava/lang/String;Ljava/lang/String;Z)V", apiToken, apiSecret, isFacialScanRequired);
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("NetverifyStartViewController", "startNetverify:apiSecret:andFacialRequired:", apiToken, apiSecret, isFacialScanRequired);
        }
    }

    /** This method will post the scanReference reterieved from the Jumio to backend Server */
    public postJumioScanReference() {
        let url: string = cv.domainMgr.getJumioKYCUrl() + cv.config.getStringData("WEB_API_POST_JUMIO_SCAN_REFERENCE", true);
        let obj = {
            "location": cv.native.GetLocation(),
            "deviceUuid": cv.native.GetDeviceUUID(),
            "kycRequestType": cv.dataHandler.getUserData().KYCVerificationStatus == cv.Enum.KYCStatus.INIT_KYC_LOGIN ? "Login" : "Withdrawal",
            "checkType": this.scanType,
            "scanReference": this.scanReference
        };
        cv.tools.logObject(obj, "postJumioScanReference++");
        cv.http.sendRequest(url, obj, this.onScanRefSubmittedSuccess.bind(this), cv.http.HttpRequestType.POST, null, false, true);
    }

    onScanRefSubmittedSuccess(data: any) {
        cv.KYCLoadingView.hide();
        console.log("onScanRefSubmittedSuccess");
        if (data != null) {
            if (data.status == "Succeed") {
                this.scanReference = null;
                this.onJumioIdentificationSuccess();
            }
            else if (data.status == "Pending") {
                this.onJumioIdentificationPending();
            }
            else {
                this.scanReference = null;
                this.onJumioIdentificationFailure(JUMIO_IDENTITY_FAILED_TYPE.FAILED_ON_IDENTIFICATION);
            }
        }
        else {
            this.scanReference = null;
            this.onJumioIdentificationFailure(JUMIO_IDENTITY_FAILED_TYPE.FAILED_ON_IDENTIFICATION);
        }
    }

    /** Fetch current Jumio status from backend server, with a delay because verification can take some more time */
    public getJumioDocumentUpdationStatus() {
        cv.KYCLoadingView.show("");
        setTimeout(this.fetchJumioStatus.bind(this), 8000)
    }

    /** Fetch current Jumio status from backend server */
    public fetchJumioStatus() {
        let queryParameter: string = "?CheckType=" + this.scanType + "&ScanReference=" + this.scanReference;
        let url: string = cv.domainMgr.getJumioKYCUrl() + cv.config.getStringData("WEB_API_GET_JUMIO_STATUS", true) + queryParameter;
        cv.http.sendRequest(url, {}, this.onScanRefSubmittedSuccess.bind(this), cv.http.HttpRequestType.GET, null, false, true);
    }

    /**
     * Handler for Jumio KYC process failed
     * @param failedOn reason why Jumio failed
     */
    onJumioIdentificationFailure(failedOn: JUMIO_IDENTITY_FAILED_TYPE) {
        if (failedOn == JUMIO_IDENTITY_FAILED_TYPE.FAILED_ON_JUMIO_INITIALLY) {
            cv.TP.showMsg(cv.config.getStringData("Jumio_Failed_Response")
                , cv.Enum.ButtonStyle.GRAY_BUTTON
                , this.failHandler);
        }
        else if (failedOn == JUMIO_IDENTITY_FAILED_TYPE.FAILED_ON_IDENTIFICATION) {
            cv.TP.showMsg(cv.config.getStringData("KYC_Verification_Failed")
                , cv.Enum.ButtonStyle.GRAY_BUTTON
                , this.failHandler);
        }
    }

    /** Handler for Jumio KYC process complet successfully */
    onJumioIdentificationSuccess() {
        cv.TP.showMsg(cv.config.getStringData(this.successCustomMsgKey || "KYC_Verification_Success")
            , cv.Enum.ButtonStyle.GOLD_BUTTON
            , this.successHandler);
    }

    /** Handler for Jumio KYC process is still pending */
    onJumioIdentificationPending() {
        cv.TP.showMsg(cv.config.getStringData("KYC_Verification_Pending")
            , cv.Enum.ButtonStyle.TWO_BUTTON
            , this.getJumioDocumentUpdationStatus.bind(this)
            , this.failHandler);
    }


    /**
     * Callback from native plugin
     * this is called after the documents was uploaded to Jumio and verification process starts
     * @param scanReference the reference id for current Jumio verification process
     */
    public static onNativeJumioKYCCallback(scanReference: string): void {
        JumioKYCHandler.getInstance().scanReference = scanReference;
        console.log("onNativeJumioKYCCallback=====:: " + scanReference);
        if (scanReference && scanReference.length > 0) {
            cv.TP.showMsg(cv.config.getStringData("Jumio_Identity_Success")
                , cv.Enum.ButtonStyle.GOLD_BUTTON
                , JumioKYCHandler.getInstance().pushScanIdToDB.bind(JumioKYCHandler.getInstance()));
        }
        else {
            JumioKYCHandler.getInstance().scanReference = null;
            JumioKYCHandler.getInstance().onJumioIdentificationFailure(JUMIO_IDENTITY_FAILED_TYPE.FAILED_ON_JUMIO_INITIALLY);
        }
    }

    /** Push current Jumio verification process reference id to backend server, with a delay because verification can take some more time */
    pushScanIdToDB() {
        cv.KYCLoadingView.show("");
        setTimeout(this.postJumioScanReference.bind(this), 8000);
    }
}

let wnd: any = window;
wnd.NativeJumioKYCCallback = JumioKYCHandler.onNativeJumioKYCCallback;
