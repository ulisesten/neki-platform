/**Ulisesten at Jan 24, 2019*/

class Populate{
    constructor(){
        this.cookieString = ''
    }

    setCookie(data){
        this.cookieString = data; 
    }

    getCookie(){
        return this.cookieString;
    }
}

module.exports = Populate;