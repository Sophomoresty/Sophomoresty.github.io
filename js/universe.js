function dark() {window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;var n,e,i,h,t=.05,s=document.getElementById("universe"),o=!0,a="180,184,240",r="226,225,142",d="226,225,224",c=[];function f(){n=window.innerWidth,e=window.innerHeight,i=.216*n,s.setAttribute("width",n),s.setAttribute("height",e)}function u(){h.clearRect(0,0,n,e);for(var t=c.length,i=0;i<t;i++){var s=c[i];s.move(),s.fadeIn(),s.fadeOut(),s.draw()}}function y(){this.reset=function(){this.giant=m(3),this.comet=!this.giant&&!o&&m(10),this.x=l(0,n-10),this.y=l(0,e),this.r=l(1.1,2.6),this.dx=l(t,6*t)+(this.comet+1-1)*t*l(50,120)+2*t,this.dy=-l(t,6*t)-(this.comet+1-1)*t*l(50,120),this.fadingOut=null,this.fadingIn=!0,this.opacity=0,this.opacityTresh=l(.2,1-.4*(this.comet+1-1)),this.do=l(5e-4,.002)+.001*(this.comet+1-1)},this.fadeIn=function(){this.fadingIn&&(this.fadingIn=!(this.opacity>this.opacityTresh),this.opacity+=this.do)},this.fadeOut=function(){this.fadingOut&&(this.fadingOut=!(this.opacity<0),this.opacity-=this.do/2,(this.x>n||this.y<0)&&(this.fadingOut=!1,this.reset()))},this.draw=function(){if(h.beginPath(),this.giant)h.fillStyle="rgba("+a+","+this.opacity+")",h.arc(this.x,this.y,2,0,2*Math.PI,!1);else if(this.comet){h.fillStyle="rgba("+d+","+this.opacity+")",h.arc(this.x,this.y,1.5,0,2*Math.PI,!1);for(var t=0;t<30;t++)h.fillStyle="rgba("+d+","+(this.opacity-this.opacity/20*t)+")",h.rect(this.x-this.dx/4*t,this.y-this.dy/4*t-2,2,2),h.fill()}else h.fillStyle="rgba("+r+","+this.opacity+")",h.rect(this.x,this.y,this.r,this.r);h.closePath(),h.fill()},this.move=function(){this.x+=this.dx,this.y+=this.dy,!1===this.fadingOut&&this.reset(),(this.x>n-n/4||this.y<0)&&(this.fadingOut=!0)},setTimeout(function(){o=!1},50)}function m(t){return Math.floor(1e3*Math.random())+1<10*t}function l(t,i){return Math.random()*(i-t)+t}f(),window.addEventListener("resize",f,!1),function(){h=s.getContext("2d");for(var t=0;t<i;t++)c[t]=new y,c[t].reset();u()}(),function t(){document.getElementsByTagName('html')[0].getAttribute('data-theme')=='dark'&&u(),window.requestAnimationFrame(t)}()};
dark()


if(document.getElementById('history-container')){
    function append(parent, text) {
        if (typeof text === 'string') {
            var temp = document.createElement('div');
            temp.innerHTML = text;
            // 防止元素太多 进行提速
            var frag = document.createDocumentFragment();
            while (temp.firstChild) {
                frag.appendChild(temp.firstChild);
            }
            parent.appendChild(frag);
        }
        else {
            parent.appendChild(text);
        }
    }

    function history_get_data(){
        var myDate = new Date();
        var myMonth = myDate.getMonth() + 1;
        if (myMonth < 10) {
            getMonth = "0" + String(myMonth);
        } else {
            getMonth = String(myMonth);
        }
        var getDate = String(myDate.getDate());
        if (getDate < 10) {
            getDate = "0" + String(getDate);
        } else {
            getDate = String(getDate);
        }
        var getMonthDate = "S" + getMonth + getDate;
        return ["https://gcore.jsdelivr.net/gh/Zfour/Butterfly-card-history@latest/baiduhistory/json/" + getMonth + ".json",getMonthDate]
    }
    var history_data = history_get_data()
    fetch(history_data[0]).then(data=>data.json()).then(data=>{
        console.log(data[history_data[1]])
        html_item =''
        for (var item of data[history_data[1]]){
            html_item += '<div class="swiper-slide history_slide"><span class="history_slide_time">A.D.' +
                item.year +'</span>' + '<span class="history_slide_link">'+ item.title +'</span></div>'

        }
        var history_container_wrapper = document.getElementById('history_container_wrapper')
        append(history_container_wrapper, html_item);
        var swiper_history = new Swiper('.history_swiper-container', {
            passiveListeners:true,
            spaceBetween: 30,
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 30,
                slideShadows: false,
            },
            loop: true,
            direction: 'vertical',
            autoplay: {
                disableOnInteraction: true,
                delay:5000
            },

            mousewheel:false,
            // autoHeight: true,

        });

        var history_comtainer = document.getElementById('history-container');
        history_comtainer.onmouseenter = function () {
            swiper_history.autoplay.stop();
        };
        history_comtainer.onmouseleave = function () {
            swiper_history.autoplay.start();
        }
    })}