import {projectList} from '@/api/index';
import axios from 'axios';
const Home = {
  state: {
    coinList: [
      {
        name: 'BTC/USD',
        url: 'BTC',
        data: {}
      },
      {
        name: 'ETH/USD',
        url: 'ETH',
        data: {}
      },
      {
        name: 'LTC/USD',
        url: 'LTC',
        data: {}
      },
      {
        name: 'EOS/USD',
        url: 'EOS',
        data: {}
      },
      {
        name: 'BCH/USD',
        url: 'BCH',
        data: {}
      },
      {
        name: 'ETC/USD',
        url: 'ETC',
        data: {}
      },
      {
        name: 'NEO/USD',
        url: 'NEO',
        data: {}
      },
      {
        name: 'XRP/USD',
        url: 'XRP',
        data: {}
      }
    ],
    blockList: [
      {
        name: '交易所',
        title: '交易所是用户买卖虚拟货币的网站，相当于股票市场。大部分交易所国内都无法直接访问',
        content: []
      },
      {
        name: '数字钱包',
        title: '数字钱包是个人用于存放自己虚拟货币资产的工具，相当于银行或者支付宝。不同钱包支持的虚拟货币种类有所不同',
        content: []
      },
      {
        name: '行情资讯',
        title: '区块链行情资讯等内容的聚合类网站',
        content: []
      },
      {
        name: '公众号',
        title: '通过关注公众号可随时随地了解到各类行情分析，事件分析以及交易教程等干货内容',
        content: []
      },
      {
        name: '币种',
        title: '主流虚拟货币的官方网站',
        content: []
      },
      {
        name: '矿池挖矿',
        title: '可购买各类虚拟货币实体矿机或虚拟云矿机。',
        content: []
      }
    ],
    newsList: [],
    transactionApp: [],
    wallet: [],
    information: [],
    other: [],
    coin: [],
    information2: [],
    mine: [],
    noPublic: [],
    recommend: [],
    transactionCenter2: [],
    wallet2: []
  },

  mutations: {
    SET_COIN_LIST: (state, coinList) => {
      state.coinList = coinList;
    },
    SET_APP_CENTER: (state, opt) => {
      state[opt.keyName] = JSON.parse(opt.json);
    },
    SET_WALLET_APP: (state, opt) => {
      state[opt.keyName] = JSON.parse(opt.json);
    },
    SET_INFORMATION_APP: (state, opt) => {
      state[opt.keyName] = JSON.parse(opt.json);
    },
    SET_OTHER_APP: (state, opt) => {
      state[opt.keyName] = JSON.parse(opt.json);
    },
    SET_RECOMMEND_APP: (state, opt) => {
      state[opt.keyName] = JSON.parse(opt.json);
    },
    SET_TRANSACTION_CENTER: (state, opt) => {
      state[opt.keyName] = JSON.parse(opt.json);
    },
    SET_WALLET_WEB: (state, opt) => {
      state[opt.keyName] = JSON.parse(opt.json);
    },
    SET_INFORMATION_WEB: (state, opt) => {
      state[opt.keyName] = JSON.parse(opt.json);
    },
    SET_NO_PUBLIC: (state, opt) => {
      state[opt.keyName] = JSON.parse(opt.json);
    },
    SET_COIN_WEB: (state, opt) => {
      state[opt.keyName] = JSON.parse(opt.json);
    },
    SET_MINE_WEB: (state, opt) => {
      state[opt.keyName] = JSON.parse(opt.json);
    }
  },

  actions: {
    getCointList: ({commit, state}, payload) => {
      let tokenName = [];
      state.coinList.forEach((k, v) => {
        tokenName.push(k.url);
      });
      let url = `https://data.block.cc/api/v1/price?symbol=${tokenName.toString()}`;
      window.fetch(url, {method: 'GET', mode: 'cors'}).then((res) => {
        return res.json();
      }).then((res) => {
        res.data.forEach((v) => {
          state.coinList.forEach((m) => {
            if (m.url === v.symbol) {
              m.data = v;
            }
          });
        });
      }).catch(() => {
      });
    },
    getNews: ({commit, state}, payload) => {
      axios.get('/api/newsv17/index?size=30&client=pc', {
        method: 'GET'
        }).then((res) => {
        console.log(res);
      }).then((res) => {
      }).catch(() => {
      });
      // window.$.ajax({
      //   url: 'http://query.yahooapis.com/v1/public/yql',
      //   data: {
      //     q: `select * from rss where url="http://www.bishijie.com/api/newsv17/index?size=30&client=pc"`
      //   },
      //   success: function (d) {
      //     console.log(JSON.stringify(d));
      //   }
      // });
    },
    getList: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        projectList(payload.str).then(res => {
          commit(payload.title, res.data);
          resolve(res.data.json);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default Home;
