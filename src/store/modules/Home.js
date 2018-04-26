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
        content: [
          {
            name: '币安',
            url: 'https://www.binance.com/'
          },
          {
            name: '火币pro',
            url: 'https://www.huobipro.com/'
          },
          {
            name: 'Gate.io',
            url: 'http://www.gateio.io/'
          },
          {
            name: 'OKEX',
            url: 'https://www.okex.com/'
          },
          {
            name: 'ZB.com',
            url: 'https://www.bitkk.com/'
          },
          {
            name: 'CoinBase',
            url: 'https://www.coinbase.com/'
          },
          {
            name: 'Bithumb',
            url: 'https://www.bithumb.com/'
          },
          {
            name: 'Bitfinex',
            url: 'https://www.bitfinex.com/'
          }
        ]
      },
      {
        name: '数字货币',
        content: [
          {
            name: 'BTC 比特币'
          },
          {
            name: 'ETH 以太坊'
          },
          {
            name: 'LTC 莱特币'
          },
          {
            name: 'ETC 以太经典'
          },
          {
            name: 'BCH 比特现金'
          },
          {
            name: 'XRP 瑞波币'
          },
          {
            name: 'EOS 柚子'
          },
          {
            name: 'NEO 小蚁'
          }
        ]
      },
      {
        name: '行情资讯',
        content: [
          {
            name: '巴比特',
            url: 'http://www.8btc.com/'
          },
          {
            name: '金色财经',
            url: 'https://www.jinse.com/'
          },
          {
            name: 'AICoin',
            url: 'https://www.aicoin.net.cn/'
          },
          {
            name: '非小号',
            url: 'https://www.feixiaohao.com/'
          },
          {
            name: '未来财经',
            url: 'http://www.weilaicaijing.com/'
          },
          {
            name: 'BitKan',
            url: 'http://www.bitkan.com/'
          },
          {
            name: '共享财经',
            url: 'http://www.gongxiangcj.com/'
          }
        ]
      },
      {
        name: '公众号',
        content: [
          {
            name: '大炮评级'
          },
          {
            name: '数字货币趋势狂人'
          }
        ]
      },
      {
        name: '币种',
        content: [
          {
            name: '比特币-BTC',
            url: 'https://bitcoin.org/zh_CN/'
          },
          {
            name: '以太坊-ETH',
            url: 'https://www.ethereum.org/'
          },
          {
            name: '瑞波币-XRP',
            url: 'https://ripple.com/'
          },
          {
            name: '莱特币-LTC',
            url: 'https://litecoin.com/'
          },
          {
            name: '比特现金-BCH',
            url: 'https://www.bitcoincash.org/'
          },
          {
            name: '以太经典-ETC',
            url: 'https://ethereumclassic.github.io/'
          },
          {
            name: '柚子-EOS',
            url: 'https://eos.io/'
          },
          {
            name: '小蚁-NEO',
            url: 'https://neo.org/'
          },
          {
            name: '艾达币-ADA',
            url: 'https://www.cardano.org/zh/home-3/'
          },
          {
            name: '恒星币-XLM',
            url: 'https://www.stellar.org/'
          },
          {
            name: '泰达币-USDT',
            url: 'https://tether.to/'
          },
          {
            name: '门罗币-XMR',
            url: 'https://getmonero.org/'
          },
          {
            name: '达世币-DASH',
            url: 'https://www.dash.org/'
          }
        ]
      },
      {
        name: '矿池挖矿',
        content: [
        ]
      }
    ]
  },

  mutations: {
    SET_COIN_LIST: (state, coinList) => {
      state.coinList = coinList;
    }
  },

  actions: {
    getCointList: ({commit, state}, payload) => {
      state.coinList.forEach((k, v) => {
        const url = 'https://data.block.cc/api/v1/price?symbol=' + k.url;
        window.$.getJSON('http://query.yahooapis.com/v1/public/yql', {
        q: `select * from json where url="${url}"`,
        format: 'json'
      }).then(function(res) {
          if (res.query) {
            if (Array.isArray(res.query.results.json.data)) {
              state.coinList[v].data = res.query.results.json.data[0];
            } else {
              state.coinList[v].data = res.query.results.json.data;
            }
          }
      }).catch();
      });
    }
  }
};

export default Home;
