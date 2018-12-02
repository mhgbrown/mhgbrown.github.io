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
      website: 'http://camillealena.com/',
      href: '/projects/camille-alena',
      preview: '/images/camille-alena.gif'
    }, {
      text: 'Dinamo Standards',
      href: '/projects/dinamo-standards',
      preview: '/videos/dinamostandards.mp4',
      links: [
        {
          text: 'Visit',
          href: 'http://dinamostandards.com/'
        }
      ]
    }, {
      text: 'onlinebusiness.lol',
      href: 'http://onlinebusiness.lol/',
      target: '_blank'
    }, {
      text: 'Souvenir',
      href: '/projects/souvenir',
      preview: '/videos/souvenir.mp4',
      links: [
        {
          text: 'Visit',
          href: 'https://www.souvenirofficial.com/'
        }
      ]
    }, {
      text: 'Kiën',
      href: '/projects/kien',
      preview: '/videos/kien.mp4',
      links: [
        {
          text: 'Kickstarter',
          href: 'https://www.kickstarter.com/projects/85280086/kien-light-intelligent-daylight-at-your-fingertips'
        }
      ]
    }, {
      text: 'Georg Gatsas',
      href: 'http://georggat.cyon.link/',
      target: '_blank'
    }, {
      text: 'Good Spread',
      href: 'https://helpgoodspread.com/',
      target: '_blank'
    }, {
      text: 'Talk Talk Talk',
      href: '/projects/talk-talk-talk',
      preview: '/images/talk-talk-talk.gif'
    }, {
      text: 'Lexicon Labs',
      href: '/projects/lexicon-labs',
      website: 'http://lexiconlabs.nyc',
      preview: '/images/lexicon-labs.gif'
    }, {
      text: 'SumAll',
      href: 'https://sumall.com',
      target: '_blank'
    }, {
      text: 'LinkedIn',
      href: 'https://linkedin.com',
      target: '_blank'
    }, {
      text: 'Apple, Inc.',
      href: 'https://apple.com',
      target: '_blank'
    }, {
      text: 'Tones',
      href: 'http://tones.mhgbrown.is/',
      target: '_blank'
    }, {
      text: 'Witchifier',
      href: '/projects/witchifier',
      website: 'http://witchifier.mhgbrown.is',
      preview: '/images/witchifier.gif'
    }, {
      text: 'Just A Grid',
      href: 'http://justagrid.mhgbrown.is/',
      target: '_blank'
    }, {
      text: 'image2html',
      href: 'http://image2html.mhgbrown.is',
      target: '_blank'
    }, {
      text: 'Fuck My Dom',
      href: `javascript:(function fmd(o,t){var c;o.FuckMyDom?FuckMyDom.slowly():(c=t.createElement('script'),c.setAttribute('src','http://mhgbrown.github.io/fuck-my-dom/fuck-my-dom.js'),c.onload=function(){FuckMyDom.slowly()},t.body.appendChild(c))})(window,document);`
    }, {
      text: 'Void',
      href: '/projects/void',
      preview: '/videos/void.mp4',
      links: [
        {
          text: 'Visit',
          href: 'http://void.mhgbrown.is/'
        },
        {
          text: 'YouTube',
          href: 'https://www.youtube.com/watch?v=lMuTwL10RSA'
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
      href: 'http://www.staging.getfirstmate.com/',
      target: '_blank'
    }, {
      text: 'BVG Train Schedule Display',
      href: '/projects/bvg-train-schedule-display',
      preview: '/videos/bvg-display.mp4',
      links: [
        {
          text: 'Visit',
          href: 'https://www.instagram.com/p/6sGenzL2Gu/'
        }
      ]
    }, {
      text: 'Joseph Kadow',
      href: '/projects/joseph-kadow',
      preview: 'https://www.youtube.com/embed/HwtptvA5px4?ecver=1&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0&autohide=1&cc_load_policy=0&iv_load_policy=0',
      links: [
        {
          text: 'Visit',
          href: 'http://www.josephkadow.com/'
        }
      ]
    }, {
      text: 'Dan Solbach',
      href: 'http://dansolbach.ch/',
      target: '_blank'
    }, {
      text: 'kpiReady',
      href: 'https://kpiready.com/',
      target: '_blank'
    }, {
      text: 'Body Of Us',
      href: 'http://bodyofus.ch/',
      target: '_blank'
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
