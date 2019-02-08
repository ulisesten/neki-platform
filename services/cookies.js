/**ulisesten at 1 feb 2018 */

var cookie = require('cookie')

function genCookie(toCookie){
    return cookie.serialize('token', String(toCookie), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/'
    })
}

function clearCookie(){
    return cookie.serialize('token', String(''), {
        httpOnly: true,
        expires: new Date(1), // 1 week
        path: '/'
    })
}

function header(cookie){
    return {'Set-Cookie': cookie,'Content-Type': 'application/json; charset=utf-8'}
}

function redirect(){
    return header(clearCookie())
}

module.exports = {
    genCookie,
    clearCookie,
    header,
    redirect
}