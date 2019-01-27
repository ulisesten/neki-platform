class Handler{
    constructor(){
        this.csrfToken = ''
        this.jwtToken = ''
    }

    get(url, req, res){

    }

    post(url, req, res){

    }

    setCsrfToken(csrfToken){
        this.csrfToken = csrfToken;
    }

    getCsrfToken(csrfToken){
        return this.csrfToken;
    }

    setJWT(jwtToken){
        this.jwtToken = jwtToken;
    }

    getJWT(jwtToken){
        return this.jwtToken;
    }
}

/**
  res.cookie = function (name, value, options) {
  var opts = merge({}, options);
  var secret = this.req.secret;
  var signed = opts.signed;

  if (signed && !secret) {
    throw new Error('cookieParser("secret") required for signed cookies');
  }

  var val = typeof value === 'object'
    ? 'j:' + JSON.stringify(value)
    : String(value);

  if (signed) {
    val = 's:' + sign(val, secret);
  }

  if ('maxAge' in opts) {
    opts.expires = new Date(Date.now() + opts.maxAge);
    opts.maxAge /= 1000;
  }

  if (opts.path == null) {
    opts.path = '/';
  }

  this.append('Set-Cookie', cookie.serialize(name, String(val), opts));

  return this;
};

*/

module.exports = Handler;