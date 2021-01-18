import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import kebabCase from 'lodash.kebabcase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    app: {
      tablet: false,
      phone: false
    },
    tumblrApiKey: 'ok1dCktUCXTyOgG0vlyhxcW7oQ4lxUZl0QfZkoEiwwjvU2ZKAv',
    tumblrs: [],
    projects: [{
      text: 'Camille Aleña',
      href: '/projects/camille-alena',
      preview: 'https://www.youtube.com/embed/cDVcOjzam7E?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=cDVcOjzam7E',
      description: 'Website for artist Camille Aleña.',
      technology: 'Kirby CMS, jQuery, Digital Ocean',
      links: [
        {
          text: 'Website',
          href: 'http://camillealena.com/'
        }
      ]
    }, {
      text: 'Dinamo Standards',
      href: '/projects/dinamo-standards',
      preview: 'https://www.youtube.com/embed/V2dQfmUt4s4?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=V2dQfmUt4s4',
      description: 'Typeface demonstration via karaoke.',
      technology: 'React, Contentful, Github, WebVTT',
      links: [
        {
          text: 'Website',
          href: 'http://dinamostandards.com/'
        }
      ]
    }, {
      text: 'onlinebusiness.lol',
      href: '/projects/onlinebusiness-lol',
      preview: 'https://www.youtube.com/embed/Ct7g-P-pwlQ?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=Ct7g-P-pwlQ',
      description: 'Landing page for theoretical online business.',
      technology: 'jQuery, Github',
      links: [
        {
          text: 'Website',
          href: 'http://onlinebusiness.lol/'
        }
      ]
    }, {
      text: 'Souvenir',
      href: '/projects/souvenir',
      preview: 'https://www.youtube.com/embed/_ymJStaS7Nk?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=_ymJStaS7Nk',
      description: 'Webstore for Berlin-based clothing brand.',
      technology: 'Shopify (Slate), jQuery',
      links: [
        {
          text: 'Website',
          href: 'https://www.souvenirofficial.com/'
        }
      ]
    }, {
      text: 'Kiën',
      href: '/projects/kien',
      preview: 'https://www.youtube.com/embed/xFET7Pj6FQ8?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=xFET7Pj6FQ8',
      description: 'Marketing page and unfinished configurator and webstore for discontinued smart lamp.',
      technology: 'Angular, Shopify, jQuery',
      links: [
        {
          text: 'Website',
          href: 'http://kien.com'
        },
        {
          text: 'Configurator',
          href: 'http://kien.com/configurator'
        },
        {
          text: 'Kickstarter',
          href: 'https://www.kickstarter.com/projects/85280086/kien-light-intelligent-daylight-at-your-fingertips'
        }
      ]
    }, {
      text: 'Georg Gatsas',
      href: '/projects/georg-gatsas',
      preview: 'https://www.youtube.com/embed/L2dSbRh_eJ8?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=L2dSbRh_eJ8',
      description: 'Portfolio website for Swiss photographer.',
      technology: 'Kirby CMS, Vue'
    }, {
      text: 'Good Spread',
      href: '/projects/good-spread',
      preview: '/images/good-spread-website.gif',
      description: 'Website for charity-based peanut butter retailer.',
      technology: 'Shopify, jQuery',
      links: [
        {
          text: 'Website',
          href: 'https://helpgoodspread.com/'
        }
      ]
    }, {
      text: 'Talk Talk Talk',
      href: '/projects/talk-talk-talk',
      preview: 'https://www.youtube.com/embed/F5eCBt_-uhU?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=F5eCBt_-uhU',
      description: 'Conversation series.',
      technology: 'Kirby CMS'
    }, {
      text: 'Lexicon Labs',
      href: '/projects/lexicon-labs',
      preview: 'https://www.youtube.com/embed/NKWI-bUtVmc?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=F5eCBt_-uhU',
      description: 'Marketing page for startup attempting to facilitate communication via increased understanding.',
      technology: 'jQuery',
      links: [
        {
          text: 'Website',
          href: 'http://lexiconlabs.nyc'
        }
      ]
    }, {
      text: 'SumAll',
      href: '/projects/sumall',
      preview: 'https://www.youtube.com/embed/z2JyoYCg5G4?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=z2JyoYCg5G4',
      description: 'Frontend and middletier service development for social media analytics startup. Integration with various third-party APIs.',
      technology: 'Java, DropWizard, Vue, Node, D3, Phantom',
      links: [
        {
          text: 'Website',
          href: 'https://sumall.com'
        }
      ]
    }, {
      text: 'LinkedIn',
      href: '/projects/linked-in',
      preview: '/images/linkedin.jpg',
      description: 'Implementation of new profile redesign.',
      technology: 'Java, jQuery, Raphaël',
      links: [
        {
          text: 'Website',
          href: 'https://linkedin.com'
        }
      ]
    }, {
      text: 'Apple, Inc.',
      href: '/projects/apple',
      preview: '/images/apple.jpg',
      description: 'Internal tools to facilitate the operations of Apple\'s marketing communications department. Appearance in 4th Gen iPod Touch marketing images (above).',
      technology: 'Ruby, Rails, PHP, jQuery',
      links: [
        {
          text: 'Website',
          href: 'https://apple.com'
        }
      ]
    }, {
      text: 'Tones',
      href: '/projects/tones',
      preview: 'https://tones.mhgbrown.is/?hack=youtube.com',
      description: 'Instrument created using random tones encoded via data URI.',
      technology: 'jQuery, Github',
      links: [
        {
          text: 'Website',
          href: 'https://tones.mhgbrown.is/'
        }
      ]
    }, {
      text: 'Witchifier',
      href: '/projects/witchifier',
      preview: 'https://witchifier.mhgbrown.is/?hack=youtube.com',
      description: 'Character by character random translation to make funny text. Inspired by the music genre "Witch House".',
      technology: 'jQuery, Github',
      links: [
        {
          text: 'Website',
          href: 'https://witchifier.mhgbrown.is/'
        }
      ]
    }, {
      text: 'Just A Grid',
      href: '/projects/just-a-grid',
      preview: 'https://justagrid.mhgbrown.is/?hack=youtube.com',
      description: 'Just an interactive grid.',
      technology: 'jQuery, Github',
      links: [
        {
          text: 'Website',
          href: 'https://justagrid.mhgbrown.is/'
        }
      ]
    }, {
      text: 'image2html',
      href: '/projects/image-2-html',
      preview: 'https://www.youtube.com/embed/u4ENL5-NQZU?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=u4ENL5-NQZU',
      description: 'Convert images into a HTML "pixel" reproduction.',
      technology: 'jQuery, Web Workers, Github',
      links: [
        {
          text: 'Website',
          href: 'https://image2html.mhgbrown.is'
        }
      ]
    }, {
      text: 'Fuck My Dom',
      href: `javascript:(function fmd(o,t){var c;o.FuckMyDom?FuckMyDom.slowly():(c=t.createElement('script'),c.setAttribute('src','https://mhgbrown.is/fuck-my-dom/fuck-my-dom.js'),c.onload=function(){FuckMyDom.slowly()},t.body.appendChild(c))})(window,document);`
    }, {
      text: 'Void',
      href: '/projects/void',
      preview: 'https://www.youtube.com/embed/lMuTwL10RSA?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=lMuTwL10RSA',
      description: 'Android application and backend to share and receive random photos from other users.',
      technology: 'Java, Android, AWS, Ruby, Rails',
      links: [
        {
          text: 'Website',
          href: 'https://void.mhgbrown.is/'
        }
      ]
    }, {
      text: 'Why You Leave Me?',
      href: '/projects/why-you-leave-me-',
      preview: '/images/why-you-leave-me.png',
      description: 'Twitter bot that asks unfollowers why they unfollowed and collects any responses.',
      technology: 'Node, Heroku, Twitter, Google Docs',
      links: [
        {
          text: 'Github',
          href: 'https://github.com/mhgbrown/why-you-leave-me'
        },
        {
          text: 'Responses',
          href: 'https://docs.google.com/spreadsheets/d/1sa7rdQANt8wzMdLJDFUL9cFLQ9o8ZfJzLQ4Vj53MigU/edit#gid=0'
        }
      ]
    }, {
      text: 'Let Me Tweet That For You',
      href: '/projects/let-me-tweet-that-for-you',
      preview: '/images/lmtty.png',
      description: 'Twitter bot that tweets what you direct message it.',
      technology: 'Node, Heroku, Twitter',
      links: [
        {
          text: 'Twitter',
          href: 'https://twitter.com/lmttfy'
        },
        {
          text: 'Github',
          href: 'https://github.com/mhgbrown/letmetweetthatforyou'
        }
      ]
    }, {
      text: 'Firstmate - Life Coaching',
      href: '/projects/firstmate-life-coaching',
      preview: 'https://www.youtube.com/embed/2xurCa3OR5M?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=2xurCa3OR5M',
      description: 'Web and iOS application to to help users achieve their goals with either a Life Coach or friend.',
      technology: 'Python, Django, iOS, Swift, Vue, Heroku',
      links: [
        {
          text: 'Website',
          href: 'http://www.staging.getfirstmate.com/'
        }
      ]
    }, {
      text: 'BVG Train Schedule Display',
      href: '/projects/bvg-train-schedule-display',
      preview: 'https://www.youtube.com/embed/IW8mCi2zInM?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=IW8mCi2zInM',
      description: 'LED screen replica of local Berlin train departure times.',
      technology: 'Raspberry Pi, Python, Django, Heroku',
      links: [
        {
          text: 'Instagram',
          href: 'https://www.instagram.com/p/6sGenzL2Gu/'
        }
      ]
    }, {
      text: 'Joseph Kadow',
      href: '/projects/joseph-kadow',
      preview: 'https://www.youtube.com/embed/HwtptvA5px4?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=HwtptvA5px4',
      description: 'Portfolio for Berlin-based photographer Joseph Kadow.',
      technology: 'Kirby CMS',
      links: [
        {
          text: 'Website',
          href: 'http://www.josephkadow.com/'
        }
      ]
    }, {
      text: 'Dan Solbach',
      href: '/projects/dan-solbach',
      preview: 'https://www.youtube.com/embed/hCxKHsfJ69E?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=hCxKHsfJ69E',
      description: 'Portfolio for Swiss graphic designer Dan Solbach.',
      technology: 'Kirby CMS, Vue',
      links: [
        {
          text: 'Website',
          href: 'http://dansolbach.ch/'
        }
      ]
    }, {
      text: 'kpiReady',
      href: '/projects/kpiready',
      preview: 'https://www.youtube.com/embed/0NXzsaw8S_c?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=0NXzsaw8S_c',
      description: 'Web application and backend architecture for company data reporting and analytics platform. Image rendering services for email based around Vue SSR.',
      technology: 'Node, Vue, Nuxt, AWS, Apexcharts',
      links: [
        {
          text: 'Website',
          href: 'https://kpiready.com/'
        }
      ]
    }, {
      text: 'Body Of Us',
      href: '/projects/body-of-us',
      preview: 'https://www.youtube.com/embed/yqdf1Rhgg3c?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=yqdf1Rhgg3c',
      description: 'Website for the Swiss entry into the 2018 London Design Biennale.',
      technology: 'Kirby CMS, Vue, Vuetify, Digital Ocean',
      links: [
        {
          text: 'Website',
          href: 'http://bodyofus.ch/'
        }
      ]
    }, {
      text: 'Markus Mai',
      href: '/projects/markus-mai',
      preview: 'https://www.youtube.com/embed/wkrm4ITGbto?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=wkrm4ITGbto',
      description: 'Website for industrial designer and artist Markus Mai.',
      technology: 'Kirby CMS, Vue',
      links: [
        {
          text: 'Website',
          href: 'http://maimarkus.com/'
        }
      ]
    }, {
      text: 'Wordtelligence',
      href: '/projects/wordtelligence',
      description: 'Backend and Gmail-integrated Chrome extension to help users craft more understandable emails based on the recipients of the message.',
      technology: 'Django (+ Channels), Websocket, Python, React, Chrome, Heroku',
      preview: 'https://www.youtube.com/embed/sJsNJKO0kHE?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=sJsNJKO0kHE'
    }, {
      text: 'Inside Motion',
      href: '/projects/inside-motion',
      description: 'Website for exhibition at the Pharmacy Museum in Basel, Switzerland in collaboration with Swiss design gurus Common Interest',
      technology: 'Kirby CMS, Vue, Vuetify, Digital Ocean',
      preview: 'https://www.youtube.com/embed/CgzUgg9nXzU?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=CgzUgg9nXzU',
      links: [
        {
          text: 'Website',
          href: 'https://inside-motion.ch/'
        }
      ]
    }, {
      text: 'Futuress',
      href: '/projects/futuress',
      description: 'Multilingual submission platform for stories of underrepresented viewpoints in the design community. In collaboration with Swiss designers commoninterest.',
      technology: 'Kirby CMS, Vue, Vuetify, CSS 3D',
      preview: 'https://www.youtube.com/embed/aag45VG47yU?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=aag45VG47yU'
    }, {
      text: 'Futuress Magazine',
      href: '/projects/futuress-magazine',
      description: '"An online magazine on the politics of design. A community space for transnational solidarity."',
      technology: 'Ghost CMS, SCSS',
      preview: 'https://www.youtube.com/embed/b4HNdr8CXXk?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=b4HNdr8CXXk',
      links: [
        {
          text: 'Website',
          href: 'https://futuress.org/'
        }
      ]
    }, {
      text: 'Capture Translate',
      href: '/projects/capture-translate',
      description: 'An exploratory project to determine the feasibility of creating a language learning flashcard app using machine-detected objects as source material.',
      technology: 'Vue, Google Cloud Functions, Google Translate, TensorFlow JS, Media Devices API, Firebase',
      preview: 'https://www.youtube.com/embed/O8P3vrdab4E?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=O8P3vrdab4E',
      links: [
        {
          text: 'Website',
          href: 'http://capture-translate.web.app'
        }
      ]
    }].map(project => {
      project.id = kebabCase(project.text)
      return project
    }).sort((a, b) => {
      return a.text.localeCompare(b.text)
    })
  },
  mutations: {
    ADD_TUMBLRS (state, { tumblrs }) {
      Vue.set(state, 'tumblrs', [...state.tumblrs, ...tumblrs])
    },
    REMOVE_TUMBLR (state) {
      state.tumblrs.shift()
    },
    UPDATE_APP (state, { field, value }) {
      Vue.set(state.app, field, value)
    }
  },
  getters: {
    findProjectById (state) {
      return id => state.projects.find(project => project.id === id)
    }
  },
  actions: {
    async loadTumblr (store, { offset }) {
      const url = `https://api.tumblr.com/v2/blog/mhgbrown.tumblr.com/likes?api_key=${store.state.tumblrApiKey}&offset=${offset}&limit=1`
      const response = await axios.get(url)
      const tumblr = response.data.response.liked_posts.find(post => post.photos && post.photos.length)
      if (!tumblr) {
        throw new Error('Tumblr post does not include photos')
      }

      store.commit('ADD_TUMBLRS', { tumblrs: [tumblr] })
      return tumblr
    }
  }
})
