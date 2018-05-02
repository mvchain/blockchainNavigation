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
            name: 'CoinEgg',
            url: 'https://www.coinegg.com'
          },
          {
            name: 'BitMEX',
            url: 'https://www.bitmex.com/'
          },
          {
            name: '币赢网',
            url: 'https://www.coinw.me/'
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
          },
          {
            name: 'B网',
            url: 'https://bittrex.com/'
          },
          {
            name: 'UPbit',
            url: ' https://upbit.com/home'
          },
          {
            name: 'OEX',
            url: 'https://www.oex.top/'
          },
          {
            name: 'DragonEX',
            url: 'https://dragonex.im/'
          },
          {
            name: 'P网',
            url: 'https://www.poloniex.com/'
          },
          {
            name: 'CEX.IO',
            url: 'https://cex.io/'
          },
          {
            name: 'OTCBTC',
            url: 'https://otcbtc.com/'
          },
          {
            name: 'RightBTC',
            url: 'https://www.rightbtc.com'
          },
          {
            name: 'LBANK',
            url: 'https://www.lbank.info/'
          },
          {
            name: 'Coinone',
            url: 'https://coinone.co.kr/'
          },
          {
            name: 'HitBTC',
            url: 'https://hitbtc.com/'
          },
          {
            name: '库币网',
            url: 'https://www.kucoin.com'
          },
          {
            name: 'YoBit',
            url: 'https://yobit.net'
          },
          {
            name: '比特币交易网',
            url: 'https://www.btctrade.tv/'
          },
          {
            name: '酷币',
            url: 'https://www.coolcoin.com/'
          },
          {
            name: 'K网',
            url: 'https://www.kex.com/'
          },
          {
            name: 'COINNEST',
            url: 'https://www.coinnest.co.kr/'
          }
        ]
      },
      {
        name: '数字钱包',
        content: [
          {
            name: '比特派',
            url: 'http://bitpie.com/'
          },
          {
            name: 'imToken',
            url: 'https://token.im/'
          },
          {
            name: '火币钱包',
            url: 'https://www.huobi.io/'
          },
          {
            name: '币信',
            url: 'https://bixin.com/'
          },
          {
            name: 'SafeWallet',
            url: 'https://www.cmcmbc.com/zh-cn/safe-wallet/'
          },
          {
            name: 'Copay ',
            url: 'https://copay.io/'
          },
          {
            name: 'BitPay',
            url: 'https://bitpay.com/'
          },
          {
            name: 'BlockChain',
            url: ' https://blockchain.info/wallet/#/'
          },
          {
            name: 'Jaxx',
            url: 'https://jaxx.io/'
          },
          {
            name: 'mobi',
            url: 'https://www.mobi.me/'
          },
          {
            name: 'CoinMeet',
            url: 'https://coinmeet.io/'
          },
          {
            name: 'AToken',
            url: 'https://www.atoken.com/'
          },
          {
            name: 'KCASH',
            url: 'https://www.kcash.com/'
          },
          {
            name: 'POIM',
            url: 'https://po.im'
          },
          {
            name: 'Mist',
            url: 'https://github.com/ethereum/mist/releases'
          },
          {
            name: 'xapo',
            url: 'https://xapo.com/'
          },
          {
            name: 'EXODUS',
            url: 'https://www.exodus.io/'
          },
          {
            name: 'wirexapp',
            url: 'https://wirexapp.com/'
          },
          {
            name: 'Luno ',
            url: 'https://www.luno.com/'
          },
          {
            name: 'KeepKey ',
            url: 'https://www.keepkey.com/'
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
          },
          {
            name: '区块链之家',
            url: 'http://www.5bite.com/'
          },
          {
            name: '比特快讯',
            url: 'https://www.bitnews.vip/'
          },
          {
            name: 'HKS区块链',
            url: 'http://hkstv.com.cn/qkl/'
          },
          {
            name: '九个亿财经 ',
            url: 'http://jgy.com/'
          },
          {
            name: '链向财经',
            url: 'https://www.chainfor.com/'
          },
          {
            name: '动区动趋',
            url: 'https://www.blocktempo.com/'
          },
          {
            name: '币世界',
            url: 'http://www.bishijie.com/kuaixun/'
          },
          {
            name: '哈希财经',
            url: 'http://www.hashcaijing.com/'
          },
          {
            name: '比特头条',
            url: 'http://www.bitett.com/portal.php'
          },
          {
            name: '果味财经',
            url: 'http://www.guower.com/'
          },
          {
            name: '火讯财经',
            url: 'http://huoxun.com/'
          },
          {
            name: '比特币家园',
            url: 'http://www.btc126.com/'
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
          },
          {
            name: '波场-TRX',
            url: 'https://tron.network/enindex.html'
          },
          {
            name: '量子链-QTUM',
            url: 'https://qtum.org/zh/'
          },
          {
            name: '狗狗币-DOGE',
            url: 'http://dogecoin.com/'
          },
          {
            name: '比原链-BTM',
            url: 'https://bytom.io/'
          },
          {
            name: '路印-LRC',
            url: 'https://loopring.org/en/index.html'
          },
          {
            name: '嫩模币-OMG',
            url: 'https://omg.omise.co/'
          },
          {
            name: 'SNT',
            url: 'https://status.im/'
          }
        ]
      },
      {
        name: '矿池挖矿',
        content: [
          {
            name: '比特大陆',
            url: 'https://www.bitmain.com/'
          },
          {
            name: 'BitFury',
            url: 'http://bitfury.com/'
          },
          {
            name: '币信矿池',
            url: 'https://haopool.com/home#!/poolHome'
          },
          {
            name: 'BTC 矿池',
            url: 'https://pool.btc.com/'
          },
          {
            name: '蚂蚁矿池',
            url: 'https://antpool.com/'
          },
          {
            name: '星火矿池',
            url: 'https://eth.sparkpool.com/'
          },
          {
            name: '国池',
            url: 'https://pool.btcc.com/'
          },
          {
            name: '91pool',
            url: 'http://www.91pool.com/'
          },
          {
            name: 'F2Pool鱼池',
            url: 'https://www.f2pool.com/'
          }
        ]
      }
    ],
    newsList: []
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
        }).then(function (res) {
          if (res.query) {
            if (Array.isArray(res.query.results.json.data)) {
              state.coinList[v].data = res.query.results.json.data[0];
            } else {
              state.coinList[v].data = res.query.results.json.data;
            }
          }
        }).catch();
      });
    },
    getNews: ({commit, state}, payload) => {
      const url = 'http://www.bishijie.com/api/newsv17/index?size=30&client=pc';
      window.$.getJSON('http://query.yahooapis.com/v1/public/yql', {
        q: `select * from json where url="${url}"`,
        format: 'json'
      }).then(function (res) {
        if (res.query) {
          state.newsList = res.query.results.json.data;
        }
      }).catch();
    }
  }
};

export default Home;
