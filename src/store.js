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
      links: [
        {
          text: 'Visit',
          href: 'http://camillealena.com/'
        }
      ]
    }, {
      text: 'Dinamo Standards',
      href: '/projects/dinamo-standards',
      preview: 'https://www.youtube.com/embed/V2dQfmUt4s4?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=V2dQfmUt4s4',
      links: [
        {
          text: 'Visit',
          href: 'http://dinamostandards.com/'
        }
      ]
    }, {
      text: 'onlinebusiness.lol',
      href: '/projects/onlinebusiness-lol',
      preview: 'https://www.youtube.com/embed/Ct7g-P-pwlQ?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=Ct7g-P-pwlQ',
      links: [
        {
          text: 'Visit',
          href: 'http://onlinebusiness.lol/'
        }
      ]
    }, {
      text: 'Souvenir',
      href: '/projects/souvenir',
      preview: 'https://www.youtube.com/embed/_ymJStaS7Nk?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=_ymJStaS7Nk',
      links: [
        {
          text: 'Visit',
          href: 'https://www.souvenirofficial.com/'
        }
      ]
    }, {
      text: 'Kiën',
      href: '/projects/kien',
      preview: 'https://www.youtube.com/embed/xFET7Pj6FQ8?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=xFET7Pj6FQ8',
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
      links: [
        {
          text: 'Visit',
          href: 'http://georggat.cyon.link/'
        }
      ]
    }, {
      text: 'Good Spread',
      href: '/projects/good-spread',
      preview: '/images/good-spread-website.gif',
      links: [
        {
          text: 'Visit',
          href: 'https://helpgoodspread.com/'
        }
      ]
    }, {
      text: 'Talk Talk Talk',
      href: '/projects/talk-talk-talk',
      preview: 'https://www.youtube.com/embed/F5eCBt_-uhU?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=F5eCBt_-uhU'
    }, {
      text: 'Lexicon Labs',
      href: '/projects/lexicon-labs',
      preview: 'https://www.youtube.com/embed/NKWI-bUtVmc?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=F5eCBt_-uhU',
      links: [
        {
          text: 'Visit',
          href: 'http://lexiconlabs.nyc'
        }
      ]
    }, {
      text: 'SumAll',
      href: '/projects/sumall',
      preview: 'https://www.youtube.com/embed/z2JyoYCg5G4?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=z2JyoYCg5G4',
      links: [
        {
          text: 'Visit',
          href: 'https://sumall.com'
        }
      ]
    }, {
      text: 'LinkedIn',
      href: '/projects/linked-in',
      preview: '/images/linkedin.jpg',
      links: [
        {
          text: 'Visit',
          href: 'https://linkedin.com'
        }
      ]
    }, {
      text: 'Apple, Inc.',
      href: '/projects/apple',
      preview: '/images/apple.jpg',
      links: [
        {
          text: 'Visit',
          href: 'https://apple.com'
        }
      ]
    }, {
      text: 'Tones',
      href: '/projects/tones',
      preview: 'https://tones.mhgbrown.is/?hack=youtube.com',
      links: [
        {
          text: 'Visit',
          href: 'https://tones.mhgbrown.is/'
        }
      ]
    }, {
      text: 'Witchifier',
      href: '/projects/witchifier',
      preview: 'https://witchifier.mhgbrown.is/?hack=youtube.com',
      links: [
        {
          text: 'Visit',
          href: 'https://witchifier.mhgbrown.is/'
        }
      ]
    }, {
      text: 'Just A Grid',
      href: '/projects/just-a-grid',
      preview: 'https://justagrid.mhgbrown.is/?hack=youtube.com',
      links: [
        {
          text: 'Visit',
          href: 'https://justagrid.mhgbrown.is/'
        }
      ]
    }, {
      text: 'image2html',
      href: '/projects/image-2-html',
      preview: 'https://www.youtube.com/embed/u4ENL5-NQZU?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=u4ENL5-NQZU',
      links: [
        {
          text: 'Visit',
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
      links: [
        {
          text: 'Visit',
          href: 'https://void.mhgbrown.is/'
        }
      ]
    }, {
      text: 'Why You Leave Me?',
      href: 'https://github.com/mhgbrown/why-you-leave-me',
      target: '_blank'
    }, {
      text: 'Let Me Tweet That For You',
      href: 'https://twitter.com/lmttfy',
      target: '_blank'
    }, {
      text: 'Firstmate - Life Coaching',
      href: '/projects/firstmate-life-coaching',
      preview: 'https://www.youtube.com/embed/2xurCa3OR5M?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=2xurCa3OR5M',
      links: [
        {
          text: 'Visit',
          href: 'http://www.staging.getfirstmate.com/'
        }
      ]
    }, {
      text: 'BVG Train Schedule Display',
      href: '/projects/bvg-train-schedule-display',
      preview: 'https://www.youtube.com/embed/IW8mCi2zInM?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=IW8mCi2zInM',
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
      links: [
        {
          text: 'Visit',
          href: 'http://www.josephkadow.com/'
        }
      ]
    }, {
      text: 'Dan Solbach',
      href: '/projects/dan-solbach',
      preview: 'https://www.youtube.com/embed/hCxKHsfJ69E?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=hCxKHsfJ69E',
      links: [
        {
          text: 'Visit',
          href: 'http://dansolbach.ch/'
        }
      ]
    }, {
      text: 'kpiReady',
      href: 'https://kpiready.com/',
      target: '_blank'
    }, {
      text: 'Body Of Us',
      href: 'http://bodyofus.ch/',
      target: '_blank'
    }, {
      text: 'Markus Mai',
      href: '/projects/markus-mai',
      preview: 'https://www.youtube.com/embed/wkrm4ITGbto?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0&mute=1&loop=1&playlist=wkrm4ITGbto',
      links: [
        {
          text: 'Visit',
          href: 'http://maimarkus.com/'
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
      const tumblrs = response.data.response.liked_posts.reduce((memo, post) => {
        if (!post.photos || !post.photos.length) {
          return memo
        }

        memo.push(post)
        return memo
      }, [])

      if (!tumblrs.length) {
        throw new Error('Tumblr post does not include photos')
      }

      store.commit('ADD_TUMBLRS', { tumblrs })
      return response
    }
  }
})
