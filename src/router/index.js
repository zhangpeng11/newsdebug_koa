import Vue from 'vue'
import Router from 'vue-router'
import NewsListServer from '@/components/NewsListServer'
import NewsDetailServer from '@/components/NewsDetailServer'
import NewsSearchServer from '@/components/NewsSearchServer'
import NewsDataServer from '@/components/NewsDataServer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/webnewsdev/news_list_server',
      name: 'NewsListServer',
      component: NewsListServer
    },
    {
      path: '/webnewsdev/news_detail_server',
      name: 'NewsDetailServer',
      component: NewsDetailServer
    },
    {
      path: '/webnewsdev/news_search_server',
      name: 'NewsSearchServer',
      component: NewsSearchServer
    },
    {
      path: '/webnewsdev/news_data_server',
      name: 'NewsDataServer',
      component: NewsDataServer
    }
  ]
})
