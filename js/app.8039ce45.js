(function(e){function t(t){for(var i,a,s=t[0],l=t[1],c=t[2],u=0,d=[];u<s.length;u++)a=s[u],r[a]&&d.push(r[a][0]),r[a]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);p&&p(t);while(d.length)d.shift()();return n.push.apply(n,c||[]),o()}function o(){for(var e,t=0;t<n.length;t++){for(var o=n[t],i=!0,s=1;s<o.length;s++){var l=o[s];0!==r[l]&&(i=!1)}i&&(n.splice(t--,1),e=a(a.s=o[0]))}return e}var i={},r={app:0},n=[];function a(t){if(i[t])return i[t].exports;var o=i[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=e,a.c=i,a.d=function(e,t,o){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(o,i,function(t){return e[t]}.bind(null,i));return o},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var p=l;n.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},"079b":function(e,t,o){},2632:function(e,t,o){"use strict";var i=o("4eb6"),r=o.n(i);r.a},"4e74":function(e,t,o){},"4eb6":function(e,t,o){},"56d7":function(e,t,o){"use strict";o.r(t);o("cadf"),o("551c"),o("097d"),o("4e74");var i=o("2b0e"),r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"app"}},[o("router-view",{key:e.$route.path})],1)},n=[],a={created:function(){window.addEventListener("resize",this.onResize,!0),this.onResize()},destroyed:function(){window.removeEventListener("resize",this.onResizeDebounced,!0)},methods:{onResize:function(){var e=window.innerWidth||document.documentElement.clientWidth||document.getElementsByTagName("body")[0].clientWidth;this.$store.commit("UPDATE_APP",{field:"tablet",value:e<=960}),this.$store.commit("UPDATE_APP",{field:"phone",value:e<=480})}}},s=a,l=o("2877"),c=Object(l["a"])(s,r,n,!1,null,null,null);c.options.__file="App.vue";var p=c.exports,u=o("8c4f"),d=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("application-layout",{staticClass:"home"},[o("slide-show")],1)},h=[],m=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"slide-show"},[o("div",{ref:"inner",staticClass:"slide-show-inner"},e._l(e.tumblrs,function(t,i){return o("figure",{key:t.id},[t.photos&&t.photos[e.randomIndicies[i]]?[o("img",{attrs:{src:t.photos[e.randomIndicies[i]].alt_sizes[0].url},on:{load:e.onLoad,error:e.onLoad}})]:t.video_url?[o("video",{attrs:{src:t.video_url,muted:"",autoplay:"",loop:"",playsinline:""},domProps:{muted:!0},on:{canplay:e.onLoad,error:e.onLoad}})]:e._e()],2)}))])},f=[],y=(o("96cf"),o("3040")),b=(o("1c4c"),o("c93e")),w=o("2f62"),g=o("e0d5"),v=o.n(g),_={name:"slide-show",data:function(){return{maxOffset:1e3,offsets:[],maxTumblrs:5,loadPromise:Promise.resolve(),randomIndicies:[]}},computed:Object(b["a"])({},Object(w["b"])(["tumblrs"]),{timeout:function(){return 3e3}}),mounted:function(){this.doSlideShow()},beforeDestroy:function(){this.loadPromise=null},methods:{generateOffsets:function(){this.offsets=v()(Array.from({length:this.maxOffset},function(e,t){return t}))},loadTumblr:function(){var e=Object(y["a"])(regeneratorRuntime.mark(function e(){var t,o,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.loadPromise){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,this.offsets.length||this.generateOffsets(),t=this.offsets.shift(),e.next=7,this.$store.dispatch("loadTumblr",{offset:t});case 7:o=e.sent,i=o.photos?Math.floor(Math.random()*o.photos.length):0,this.randomIndicies.push(i),e.next=17;break;case 12:if(e.prev=12,e.t0=e["catch"](2),"Tumblr post does not include photos"!==e.t0.message){e.next=16;break}return e.abrupt("return",this.loadTumblr());case 16:throw e.t0;case 17:case"end":return e.stop()}},e,this,[[2,12]])}));return function(){return e.apply(this,arguments)}}(),doSlideShow:function(){var e=Object(y["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.loadPromise){e.next=2;break}return e.abrupt("return");case 2:if(!(this.tumblrs.length>this.maxTumblrs)){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,this.loadTumblr();case 6:this.$nextTick(function(){t.doSlideShow()});case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),onLoad:function(){var e=this;this.loadPromise&&(this.loadPromise=this.loadPromise.then(function(){return new Promise(function(t,o){setTimeout(function(){e.$store.commit("REMOVE_TUMBLR"),e.randomIndicies.shift(),e.doSlideShow(),t()},e.timeout)})}))}}},k=_,x=(o("8e23"),Object(l["a"])(k,m,f,!1,null,null,null));x.options.__file="slide-show.vue";var j=x.exports,S=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"application-layout"},[o("div",{staticClass:"application-container"},[o("div",{staticClass:"content-container"},[o("h1",[o("router-link",{attrs:{to:{name:"home"}}},[e._v("Morgan Brown")]),e._v(" is a Software Engineer based in Berlin, Germany")],1),e._m(0)]),o("div",{staticClass:"content-container"},[e._t("default")],2),o("div",{staticClass:"content-container"},[o("p",[e._v("Some work")]),o("ul",{staticClass:"projects-list"},e._l(e.projects,function(t){return o("li",{key:t.title},[0===t.href.indexOf("/")?o("router-link",{attrs:{to:{name:"project",params:{id:t.id}}}},[e._v(e._s(t.text))]):o("a",{attrs:{target:t.target,href:t.href}},[e._v(e._s(t.text))])],1)}))])])])},C=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ul",[o("li",[o("a",{attrs:{target:"_blank",href:"http://github.com/mhgbrown"}},[e._v("Code")])]),o("li",[o("a",{attrs:{target:"_blank",href:"http://instagram.com/mhgbrown"}},[e._v("Photos")])]),o("li",[o("a",{attrs:{target:"_blank",href:"http://soundcloud.com/mhgbrown/likes"}},[e._v("Music")])]),o("li",[o("a",{attrs:{href:"https://blog.mhgbrown.is"}},[e._v("Writing")])]),o("li",[o("a",{attrs:{target:"_blank",href:"http://www.linkedin.com/in/mhgbrown"}},[e._v("Resume")])]),o("li",[o("a",{attrs:{target:"_blank",href:"mailto:inbox@email.mhgbrown.is"}},[e._v("Contact")])])])}],M={name:"home",computed:Object(b["a"])({},Object(w["b"])(["projects"])),components:{SlideShow:j}},P=M,T=(o("2632"),Object(l["a"])(P,S,C,!1,null,null,null));T.options.__file="application.vue";var W=T.exports,O={name:"home",components:{SlideShow:j,ApplicationLayout:W}},A=O,R=Object(l["a"])(A,d,h,!1,null,null,null);R.options.__file="home.vue";var L=R.exports,D=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("application-layout",{staticClass:"project-id"},[o("div",{staticClass:"project"},[o("div",{staticClass:"project-media"},[o("div",{staticClass:"project-inner"},[e.project.preview.indexOf("youtube.com")>=0?o("iframe",{attrs:{width:"560",height:"315",src:e.project.preview,frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}}):e.project.preview.indexOf(".mp4")>=0?o("video",{ref:"media",attrs:{src:e.project.preview,alt:e.project.text,loop:"",autoplay:"",muted:"",preload:"",playsinline:"","webkit-playsinline":"",controls:""},domProps:{muted:!0}},[o("source",{attrs:{src:e.project.preview,type:"video/mp4"}})]):o("img",{ref:"media",attrs:{src:e.project.preview,alt:e.project.text}})])]),o("div",{staticClass:"project-information"},[e.project.description?o("p",[e._v(e._s(e.project.description))]):e._e(),e.project.technology?o("p",[e._v(e._s(e.project.technology))]):e._e(),e.project.website?o("a",{attrs:{href:e.project.website,target:"_blank"}},[e._v("Visit")]):o("ul",{staticClass:"inline"},e._l(e.project.links,function(t){return o("li",{key:t.href},[o("a",{attrs:{href:t.href,target:"_blank"}},[e._v(e._s(t.text))])])}))])])])},E=[],G={name:"project",props:{id:{required:!0,type:String}},data:function(){return{}},computed:{project:function(){return this.$store.getters.findProjectById(this.id)}},components:{ApplicationLayout:W},beforeDestroy:function(){this.$refs.media&&this.$refs.media.remove()}},I=G,U=(o("92f4"),Object(l["a"])(I,D,E,!1,null,null,null));U.options.__file="project.vue";var V=U.exports;i["a"].use(u["a"]);var z=new u["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:L},{path:"/projects/:id",name:"project",component:V,props:!0},{path:"*",redirect:"/"}]}),Q=(o("7514"),o("8afe")),J=(o("55dd"),o("bc3a")),F=o.n(J),K=o("3385"),B=o.n(K);i["a"].use(w["a"]);var N=new w["a"].Store({state:{app:{tablet:!1,phone:!1},tumblrApiKey:"ok1dCktUCXTyOgG0vlyhxcW7oQ4lxUZl0QfZkoEiwwjvU2ZKAv",tumblrs:[],projects:[{text:"Camille Aleña",href:"/projects/camille-alena",preview:"https://www.youtube.com/embed/cDVcOjzam7E?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=cDVcOjzam7E",description:"Website for artist Camille Aleña.",technology:"Kirby CMS, jQuery, Digital Ocean",links:[{text:"Website",href:"http://camillealena.com/"}]},{text:"Dinamo Standards",href:"/projects/dinamo-standards",preview:"https://www.youtube.com/embed/V2dQfmUt4s4?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=V2dQfmUt4s4",description:"Typeface demonstration via karaoke.",technology:"React, Contentful, Github, WebVTT",links:[{text:"Website",href:"http://dinamostandards.com/"}]},{text:"onlinebusiness.lol",href:"/projects/onlinebusiness-lol",preview:"https://www.youtube.com/embed/Ct7g-P-pwlQ?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=Ct7g-P-pwlQ",description:"Landing page for theoretical online business.",technology:"jQuery, Github",links:[{text:"Website",href:"http://onlinebusiness.lol/"}]},{text:"Souvenir",href:"/projects/souvenir",preview:"https://www.youtube.com/embed/_ymJStaS7Nk?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=_ymJStaS7Nk",description:"Webstore for Berlin-based clothing brand.",technology:"Shopify (Slate), jQuery",links:[{text:"Website",href:"https://www.souvenirofficial.com/"}]},{text:"Kiën",href:"/projects/kien",preview:"https://www.youtube.com/embed/xFET7Pj6FQ8?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=xFET7Pj6FQ8",description:"Marketing page and unfinished configurator and webstore for discontinued smart lamp.",technology:"Angular, Shopify, jQuery",links:[{text:"Website",href:"http://kien.com"},{text:"Kickstarter",href:"https://www.kickstarter.com/projects/85280086/kien-light-intelligent-daylight-at-your-fingertips"}]},{text:"Georg Gatsas",href:"/projects/georg-gatsas",preview:"https://www.youtube.com/embed/L2dSbRh_eJ8?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=L2dSbRh_eJ8",description:"Portfolio website for Swiss photographer.",technology:"Kirby CMS, Vue"},{text:"Good Spread",href:"/projects/good-spread",preview:"/images/good-spread-website.gif",description:"Website for charity-based peanut butter retailer.",technology:"Shopify, jQuery",links:[{text:"Website",href:"https://helpgoodspread.com/"}]},{text:"Talk Talk Talk",href:"/projects/talk-talk-talk",preview:"https://www.youtube.com/embed/F5eCBt_-uhU?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=F5eCBt_-uhU",description:"Conversation series.",technology:"Kirby CMS"},{text:"Lexicon Labs",href:"/projects/lexicon-labs",preview:"https://www.youtube.com/embed/NKWI-bUtVmc?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=F5eCBt_-uhU",description:"Marketing page for startup attempting to facilitate communication via increased understanding.",technology:"jQuery",links:[{text:"Website",href:"http://lexiconlabs.nyc"}]},{text:"SumAll",href:"/projects/sumall",preview:"https://www.youtube.com/embed/z2JyoYCg5G4?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=z2JyoYCg5G4",description:"Frontend and middletier service development for social media analytics startup. Integration with various third-party APIs.",technology:"Java, DropWizard, Vue, Node, D3, Phantom",links:[{text:"Website",href:"https://sumall.com"}]},{text:"LinkedIn",href:"/projects/linked-in",preview:"/images/linkedin.jpg",description:"Implementation of new profile redesign.",technology:"Java, jQuery, Raphaël",links:[{text:"Website",href:"https://linkedin.com"}]},{text:"Apple, Inc.",href:"/projects/apple",preview:"/images/apple.jpg",description:"Internal tools to facilitate the operations of Apple's marketing communications department. Appearance in 4th Gen iPod Touch marketing images (above).",technology:"Ruby, Rails, PHP, jQuery",links:[{text:"Website",href:"https://apple.com"}]},{text:"Tones",href:"/projects/tones",preview:"https://tones.mhgbrown.is/?hack=youtube.com",description:"Instrument created using random tones encoded via data URI.",technology:"jQuery, Github",links:[{text:"Website",href:"https://tones.mhgbrown.is/"}]},{text:"Witchifier",href:"/projects/witchifier",preview:"https://witchifier.mhgbrown.is/?hack=youtube.com",description:'Character by character random translation to make funny text. Inspired by the music genre "Witch House".',technology:"jQuery, Github",links:[{text:"Website",href:"https://witchifier.mhgbrown.is/"}]},{text:"Just A Grid",href:"/projects/just-a-grid",preview:"https://justagrid.mhgbrown.is/?hack=youtube.com",description:"Just an interactive grid.",technology:"jQuery, Github",links:[{text:"Website",href:"https://justagrid.mhgbrown.is/"}]},{text:"image2html",href:"/projects/image-2-html",preview:"https://www.youtube.com/embed/u4ENL5-NQZU?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=u4ENL5-NQZU",description:'Convert images into a HTML "pixel" reproduction.',technology:"jQuery, Web Workers, Github",links:[{text:"Website",href:"https://image2html.mhgbrown.is"}]},{text:"Fuck My Dom",href:"javascript:(function fmd(o,t){var c;o.FuckMyDom?FuckMyDom.slowly():(c=t.createElement('script'),c.setAttribute('src','https://mhgbrown.is/fuck-my-dom/fuck-my-dom.js'),c.onload=function(){FuckMyDom.slowly()},t.body.appendChild(c))})(window,document);"},{text:"Void",href:"/projects/void",preview:"https://www.youtube.com/embed/lMuTwL10RSA?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=lMuTwL10RSA",description:"Android application and backend to share and receive random photos from other users.",technology:"Java, Android, AWS, Ruby, Rails"},{text:"Why You Leave Me?",href:"/projects/why-you-leave-me-",preview:"/images/why-you-leave-me.png",description:"Twitter bot that asks unfollowers why they unfollowed and collects any responses.",technology:"Node, Heroku, Twitter, Google Docs",links:[{text:"Github",href:"https://github.com/mhgbrown/why-you-leave-me"},{text:"Responses",href:"https://docs.google.com/spreadsheets/d/1sa7rdQANt8wzMdLJDFUL9cFLQ9o8ZfJzLQ4Vj53MigU/edit#gid=0"}]},{text:"Let Me Tweet That For You",href:"/projects/let-me-tweet-that-for-you",preview:"/images/lmtty.png",description:"Twitter bot that tweets what you direct message it.",technology:"Node, Heroku, Twitter",links:[{text:"Twitter",href:"https://twitter.com/lmttfy"},{text:"Github",href:"https://github.com/mhgbrown/letmetweetthatforyou"}]},{text:"Firstmate - Life Coaching",href:"/projects/firstmate-life-coaching",preview:"https://www.youtube.com/embed/2xurCa3OR5M?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=2xurCa3OR5M",description:"Web and iOS application to to help users achieve their goals with either a Life Coach or friend.",technology:"Python, Django, iOS, Swift, Vue, Heroku"},{text:"BVG Train Schedule Display",href:"/projects/bvg-train-schedule-display",preview:"https://www.youtube.com/embed/IW8mCi2zInM?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=IW8mCi2zInM",description:"LED screen replica of local Berlin train departure times.",technology:"Raspberry Pi, Python, Django, Heroku",links:[{text:"Instagram",href:"https://www.instagram.com/p/6sGenzL2Gu/"}]},{text:"Joseph Kadow",href:"/projects/joseph-kadow",preview:"https://www.youtube.com/embed/HwtptvA5px4?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=HwtptvA5px4",description:"Portfolio for Berlin-based photographer Joseph Kadow.",technology:"Kirby CMS",links:[{text:"Website",href:"http://www.josephkadow.com/"}]},{text:"Dan Solbach",href:"/projects/dan-solbach",preview:"https://www.youtube.com/embed/hCxKHsfJ69E?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=hCxKHsfJ69E",description:"Portfolio for Swiss graphic designer Dan Solbach.",technology:"Kirby CMS, Vue",links:[{text:"Website",href:"http://dansolbach.ch/"}]},{text:"kpiReady",href:"/projects/kpiready",preview:"https://www.youtube.com/embed/0NXzsaw8S_c?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=0NXzsaw8S_c",description:"Web application and backend architecture for company data reporting and analytics platform. Image rendering services for email based around Vue SSR.",technology:"Node, Vue, Nuxt, AWS, Apexcharts",links:[{text:"Website",href:"https://kpiready.com/"}]},{text:"Body Of Us",href:"/projects/body-of-us",preview:"https://www.youtube.com/embed/yqdf1Rhgg3c?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=yqdf1Rhgg3c",description:"Website for the Swiss entry into the 2018 London Design Biennale.",technology:"Kirby CMS, Vue, Vuetify, Digital Ocean",links:[{text:"Website",href:"http://bodyofus.ch/"}]},{text:"Markus Mai",href:"/projects/markus-mai",preview:"https://www.youtube.com/embed/wkrm4ITGbto?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=wkrm4ITGbto",description:"Website for industrial designer and artist Markus Mai.",technology:"Kirby CMS, Vue",links:[{text:"Website",href:"http://maimarkus.com/"}]},{text:"Wordtelligence",href:"/projects/wordtelligence",description:"Backend and Gmail-integrated Chrome extension to help users craft more understandable emails based on the recipients of the message.",technology:"Django (+ Channels), Websocket, Python, React, Chrome, Heroku",preview:"https://www.youtube.com/embed/sJsNJKO0kHE?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=sJsNJKO0kHE"},{text:"Inside Motion",href:"/projects/inside-motion",description:"Website for exhibition at the Pharmacy Museum in Basel, Switzerland in collaboration with Swiss design gurus Common Interest",technology:"Kirby CMS, Vue, Vuetify, Digital Ocean",preview:"https://www.youtube.com/embed/CgzUgg9nXzU?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=CgzUgg9nXzU",links:[{text:"Website",href:"https://inside-motion.ch/"}]},{text:"Futuress",href:"/projects/futuress",description:"Multilingual submission platform for stories of underrepresented viewpoints in the design community. In collaboration with Swiss designers commoninterest.",technology:"Kirby CMS, Vue, Vuetify, CSS 3D",preview:"https://www.youtube.com/embed/aag45VG47yU?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=aag45VG47yU"},{text:"Futuress Magazine",href:"/projects/futuress-magazine",description:'"An online magazine on the politics of design. A community space for transnational solidarity."',technology:"Ghost CMS, SCSS",preview:"https://www.youtube.com/embed/b4HNdr8CXXk?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=b4HNdr8CXXk",links:[{text:"Website",href:"https://futuress.org/"}]},{text:"Capture Translate",href:"/projects/capture-translate",description:"An exploratory project to determine the feasibility of creating a language learning flashcard app using machine-detected objects as source material.",technology:"Vue, Google Cloud Functions, Google Translate, TensorFlow JS, Media Devices API, Firebase",preview:"https://www.youtube.com/embed/O8P3vrdab4E?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=O8P3vrdab4E",links:[{text:"Website",href:"http://capture-translate.web.app"}]}].map(function(e){return e.id=B()(e.text),e}).sort(function(e,t){return e.text.localeCompare(t.text)})},mutations:{ADD_TUMBLRS:function(e,t){var o=t.tumblrs;i["a"].set(e,"tumblrs",Object(Q["a"])(e.tumblrs).concat(Object(Q["a"])(o)))},REMOVE_TUMBLR:function(e){e.tumblrs.shift()},UPDATE_APP:function(e,t){var o=t.field,r=t.value;i["a"].set(e.app,o,r)}},getters:{findProjectById:function(e){return function(t){return e.projects.find(function(e){return e.id===t})}}},actions:{loadTumblr:function(){var e=Object(y["a"])(regeneratorRuntime.mark(function e(t,o){var i,r,n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return i=o.offset,r="https://api.tumblr.com/v2/blog/mhgbrown.tumblr.com/likes?api_key=".concat(t.state.tumblrApiKey,"&offset=").concat(i,"&limit=1"),e.next=4,F.a.get(r);case 4:if(n=e.sent,a=n.data.response.liked_posts.find(function(e){return e.photos&&e.photos.length})||n.data.response.liked_posts.find(function(e){return!!e.video_url}),a){e.next=8;break}throw new Error("Tumblr post does not include photos");case 8:return t.commit("ADD_TUMBLRS",{tumblrs:[a]}),e.abrupt("return",a);case 10:case"end":return e.stop()}},e,this)}));return function(t,o){return e.apply(this,arguments)}}()}});i["a"].config.productionTip=!1,new i["a"]({router:z,store:N,render:function(e){return e(p)}}).$mount("#app")},"73bb":function(e,t,o){},"8e23":function(e,t,o){"use strict";var i=o("73bb"),r=o.n(i);r.a},"92f4":function(e,t,o){"use strict";var i=o("079b"),r=o.n(i);r.a}});
//# sourceMappingURL=app.8039ce45.js.map