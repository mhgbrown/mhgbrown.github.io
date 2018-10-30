import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tumblrApiKey: 'ok1dCktUCXTyOgG0vlyhxcW7oQ4lxUZl0QfZkoEiwwjvU2ZKAv',
    tumblrs: [],
    projects: [{
      text: 'Camille Aleña',
      href: 'http://camillealena.com/'
    }, {
      text: 'Dinamo Standards',
      href: 'http://dinamostandards.com/'
    }, {
      text: 'onlinebusiness.lol',
      href: 'http://onlinebusiness.lol/'
    }, {
      text: 'Souvenir',
      href: 'https://www.souvenirofficial.com/'
    }, {
      text: 'Georg Gatsas',
      href: 'https://www.kickstarter.com/projects/85280086/kien-light-intelligent-daylight-at-your-fingertips'
    }, {
      text: 'Good Spread',
      href: 'https://helpgoodspread.com/'
    }, {
      text: 'Talk Talk Talk',
      href: 'http://talk-talk-talk.ch/'
    }, {
      text: 'Lexicon Labs',
      href: 'http://lexiconlabs.nyc'
    }, {
      text: 'SumAll',
      href: 'https://sumall.com'
    }, {
      text: 'LinkedIn',
      href: 'https://linkedin.com'
    }, {
      text: 'Apple, Inc.',
      href: 'https://apple.com'
    }, {
      text: 'Tones',
      href: 'http://tones.mhgbrown.is/'
    }, {
      text: 'Witchifier',
      href: 'http://witchifier.mhgbrown.is'
    }, {
      text: 'Just A Grid',
      href: 'http://justagrid.mhgbrown.is/'
    }, {
      text: 'image2html',
      href: 'http://image2html.mhgbrown.is'
    }, {
      text: 'Fuck My Dom',
      href: `javascript:(function fmd(o,t){var c;o.FuckMyDom?FuckMyDom.slowly():(c=t.createElement('script'),c.setAttribute('src','http://mhgbrown.github.io/fuck-my-dom/fuck-my-dom.js'),c.onload=function(){FuckMyDom.slowly()},t.body.appendChild(c))})(window,document);`
    }, {
      text: 'Void',
      href: 'http://void.mhgbrown.is/'
    }, {
      text: 'Why You Leave Me?',
      href: 'https://github.com/mhgbrown/why-you-leave-me'
    }, {
      text: 'Let Me Tweet That For You',
      href: 'https://twitter.com/lmttfy'
    }, {
      text: 'Firstmate - Life Coaching',
      href: 'https://www.getfirstmate.com/'
    }, {
      text: 'BVG Train Schedule Display',
      href: 'https://github.com/mhgbrown/why-you-leave-me'
    }, {
      text: 'Joseph Kadow',
      href: 'http://www.josephkadow.com/'
    }, {
      text: 'Dan Solbach',
      href: 'http://dansolbach.ch/'
    }, {
      text: 'kpiReady',
      href: 'https://kpiready.com/'
    }, {
      text: 'Body Of Us',
      href: 'http://bodyofus.ch/'
    }]
  },
  mutations: {
    ADD_TUMBLRS (state, { tumblrs }) {
      Vue.set(state, 'tumblrs', [...state.tumblrs, ...tumblrs])
    },
    REMOVE_TUMBLR (state) {
      state.tumblrs.shift()
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
