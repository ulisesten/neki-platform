class Handler{
    constructor(){
        this.userInfo = {}
    }

    setUserInfo(info){
        this.userInfo = info;
    }

    getJWT(){
        return this.userInfo;
    }
}

export default Handler;