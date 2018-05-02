<template>
  <div class="home">
    <nav class="nav">
      <div class="nav-name">TTBTC</div>
      <div class="nav-button">
        <span>区块链导航</span>
        <span>丨</span>
        <span @click="saveToDesktop('区块导航.html', 's')">保存到桌面</span>
        <span @click="collection">收藏本站</span>
      </div>
    </nav>
    <div class="home-search contain-style">
      <div class="home-search-name">
        <img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png">
      </div>
      <div class="home-search-input">
        <input type="text" v-model="searchTxt">
      </div>
      <div>
        <span class="search-baidu" @click="searchFun">百度一下</span>
        <span class="search-zn" @click="innerSearchFun(true)">站内搜索</span>
      </div>
    </div>
    <div class="home-coin-list contain-style">
      <div id="listItem" :class="showFlag && 'list-item'" ref="listItem" class="home-coin-content">
        <div class="home-coin-item"
             v-for="(v, k) in coinList" :key="k">
          <span class="home-coin-item-name">{{v.name}}</span>
          <span class="home-coin-item-price"
                :class="v.data.change_daily > 0 ? 'mag-up' : 'mag-down'">${{v.data.price | priceFilter}}</span>
          <span class="home-coin-item-mag" :class="v.data.change_daily > 0 ? 'mag-up' : 'mag-down'">{{(v.data.change_daily * 100).toFixed(2)}}%</span>
        </div>
      </div>
    </div>
    <div class="home-coin-list contain-style">
      <div class="recommend-style">
        <p>推</p>
        <p>荐</p>
      </div>
      <div class="recommend-item" v-for="(v,k) in recommendList" :key="k">
        <a target="_blank" :href="v.url">{{v.name}}</a>
      </div>
    </div>
    <section class="section contain-style">
      <div v-if="!searchFlag" class="section-left">
        <div class="section-container" v-for="(v, k) in blockList" :key="k">
          <div class="section-container-title">{{v.name}}</div>
          <div class="section-container-content">
            <a  v-if="j < 24" target="_blank" :href="i.url?i.url:'javascript:void(0);'" v-for="(i, j) in v.content" :key="j" :title="i.name">
              {{i.name}}
            </a>
            <a  v-if="j >= 24 && showMore === k" target="_blank" :href="i.url?i.url:'javascript:void(0);'" v-for="(i, j) in v.content" :key="j" :title="i.name">
              {{i.name}}
            </a>
          </div>
          <div class="section-container-more">
            <el-button v-show="v.content.length >= 24" style="padding:4px 20px;" @click="moreHandler(k)">{{showMore === k ? '收起' : '更多'}}<i :class="showMore === k ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" class="el-icon--down"></i></el-button>
          </div>
        </div>
      </div>
      <div v-else class="section-left">
        <div class="section-container">
          <div class="section-container-title search-title">搜索【<span style="color: #1ca0f0">{{searchTxt}}</span>】结果：
          </div>
          <div class="section-container-content">
            <a target="_blank" :href="i.url?i.url:'javascript:void(0);'" v-for="(i, j) in searchResult" :key="j" :title="i.name" v-show="searchResult.length !== 0">{{i.name}}</a>
            <p style="margin: 0 auto;" v-show="searchResult.length === 0">未找到</p>
          </div>
        </div>
      </div>
      <div class="section-right">
        <div class="section-right-item">
          <div class="section-right-title">App推荐
            <el-button v-popover:popover1 style="color:#909090;padding:0;border:0;" class="el-icon-question">
              <i class=""></i>
            </el-button>
            <el-popover
              ref="popover1"
              placement="bottom-start"
              width="200"
              trigger="hover"
              content="本站点暂不提供App下载,点击App可跳转至对应官网进行下载">
            </el-popover>
          </div>
          <div class="section-right-name">
          <span @click="appIndex = k" :class="appIndex === k && 'active'" v-for="(v,k) in appList"
                :key="k">{{v.name}}</span>
          </div>
          <div v-for="(v,k) in appList" :key="k" class="section-right-context" v-show="appIndex === k">
            <div v-for="(i, j) in v.list" :key="j" class="section-right-context-item">
              <div class="section-right-context-img">
                <img :src="i.src" alt="">
              </div>
              <div class="section-right-context-text" :title="i.des">
                <p>
                  <a target="_blank" :href="i.url">{{i.title}}</a>
                </p>
                <p >{{i.des}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="section-right-item section-right-news" v-if="newsList">
          <div class="section-right-title">快讯</div>
          <div class="section-right-title2">
            <div  class="section-right-name" v-for="(v, k) in newsList.buttom" :key="k">
              <h2  class="section-right-new-title" :title="v.title">{{v.title | titleFilter}}</h2>
              <p  class="section-right-new-context">
                {{v.content}}
              </p>
              <div  class="section-right-new-date">{{newsList.date}}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'Home',
    data() {
      return {
        popover1: false,
        appList: [
          {
            name: '交易所',
            list: [
              {
                title: '币安',
                url: 'https://www.binance.com/clientDownloads.html',
                des: '国内交易量最大的平台，币种丰富。',
                src: 'https://s7.postimg.cc/76gyjiad7/bian.png'
              },
              {
                title: '火币pro',
                url: 'https://huobiglobal.zendesk.com/hc/zh-cn/articles/360002190292',
                des: '通过C2C渠道完成 人民币入金出金，新币多。',
                src: 'https://s14.postimg.cc/4offviztt/-_pro.png'
              },
              {
                title: 'Gate.io',
                url: 'https://gateio.io/mobileapp',
                des: '比特儿的海外版，通过C2C渠道完成法币入金出金，币种丰富',
                src: 'https://s14.postimg.cc/d6ovzve29/gateio.io.png'
              },
              {
                title: 'OKEX',
                url: 'https://www.okex.com/',
                des: '通过C2C渠道完成 人民币入金出金',
                src: 'https://s7.postimg.cc/tiercy6x7/okex.png'
              },
              {
                title: 'CoinEgg',
                url: 'https://www.coinegg.com/',
                des: '聚币网的海外版站点',
                src: 'https://s7.postimg.cc/qbk7t91vv/coinegg.png'
              },
              {
                title: 'CoinCola',
                url: 'https://www.coincola.com/',
                des: '一个不涉及第三方的P2P交易平台，交易过程方便快捷',
                src: 'https://s7.postimg.cc/gr0l6d4u3/coincola.png'
              }
            ]
          },
          {
            name: '数字钱包',
            list: [
              {
                title: '比特派',
                url: 'http://bitpie.com/',
                des: '多币种钱包，支持主流币种，内置OTC及交易所',
                src: 'https://s7.postimg.cc/646s0x1tn/bitepai.png'
              },
              {
                title: 'imToken',
                url: 'https://token.im/',
                des: '最好用的以太系钱包之一，支持ETH、ERC20代币。',
                src: 'https://s7.postimg.cc/9b1bkmmaj/imtoken.png'
              },
              {
                title: '火币钱包',
                url: 'https://www.huobi.io/',
                des: '火币官方钱包，支持各大主流币种。',
                src: 'https://s7.postimg.cc/ivky7i3wr/huobiwallet.png'
              },
              {
                title: '币信',
                url: 'https://bixin.com/',
                des: '集钱包、社交、行情、交易于一身的数字货币钱包',
                src: 'https://s7.postimg.cc/xrjhf0uq3/bixin.png'
              },
              {
                title: 'SafeWallet ',
                url: 'https://www.cmcmbc.com/zh-cn/safe-wallet/',
                des: '猎豹移动出品的数字货币钱包，支持主流数字货币',
                src: 'https://s7.postimg.cc/va7q7uxzv/safewallet.png'
              },
              {
                title: 'Copay ',
                url: 'https://copay.io/',
                des: '支持多重签名的开源数字钱包',
                src: 'https://s14.postimg.cc/hftm211w1/image.png'
              },
              {
                title: 'Jaxx ',
                url: 'https://jaxx.io/',
                des: '支持全平台的多币种数字资产钱包应用',
                src: 'https://s14.postimg.cc/wojjftqfl/-jaxx.png'
              },
              {
                title: 'BlockChain',
                url: 'https://blockchain.info/wallet/#/',
                des: '全球最早且受欢迎的数字钱包之一',
                src: 'https://s7.postimg.cc/x20p2o9m3/blockchain.png'
              },
              {
                title: 'BitPay',
                url: 'https://bitpay.com/',
                des: '最大的数字货币支付钱包软件之一',
                src: 'https://s14.postimg.cc/6g8eqf3r5/bitepai.png'
              },
              {
                title: 'CoinMeet',
                url: 'https://coinmeet.io/',
                des: '集多资产轻钱包，区块链护照，数字社交等功能的软件',
                src: 'https://s7.postimg.cc/6gy673ziz/Cion_Meet.png'
              }
            ]
          },
          {
            name: '行情资讯',
            list: [
              {
                title: 'AICoin ',
                url: 'https://www.aicoin.net.cn/app',
                des: '专业的全球数字资产行情数据应用',
                src: 'https://s7.postimg.cc/i625v1g6z/aicoin.png'
              },
              {
                title: '非小号',
                url: 'https://www.feixiaohao.com/app/',
                des: '专业的数字货币行业大数据平台',
                src: 'https://s7.postimg.cc/646s0z6zf/feixiaohao.png'
              },
              {
                title: 'MyToken',
                url: 'https://mytoken.io/',
                des: '数字资产行情应用',
                src: 'https://s7.postimg.cc/i625v5qij/mytoken.png'
              },
              {
                title: 'BITKAN',
                url: 'http://www.bitkan.com/app',
                des: '提供价格监控、新闻资讯、挖矿监控、股票监控、钱包等服务',
                src: 'https://s7.postimg.cc/l05b8hxsr/bikan.png'
              },
              {
                title: '金色财经',
                url: 'https://www.jinse.com/',
                des: '专注于区块链产业的服务平台，通过深度报道，传递行业声音。',
                src: 'https://s7.postimg.cc/mf6vxabrf/gold.png'
              },
              {
                title: '巴比特',
                url: 'http://download.8btc.com/',
                des: '国内最早的区块链资讯社区门户',
                src: 'https://s7.postimg.cc/qoblzduff/babite.png'
              },
              {
                title: '未来财经',
                url: 'http://www.weilaicaijing.com/',
                des: '领先的区块链垂直网络媒体平台',
                src: 'https://s7.postimg.cc/lcwpetdjf/weilai.png'
              }
            ]
          },
          {
            name: '其他',
            list: [
              {
                title: 'Dapp',
                url: 'https://www.cmcmbc.com/zh-cn/dapp-browser/',
                des: '在线区块链应用专用浏览器',
                src: 'https://s7.postimg.cc/88r521lgr/dappbrowser.png'
              },
              {
                title: '蓝灯',
                url: 'https://github.com/getlantern/lantern/releases/tag/latest',
                des: '你可能很需要它',
                src: 'https://s7.postimg.cc/5rfduutvf/VPN.png'
              },
              {
                title: 'Telegram ',
                url: 'https://telegram.org/',
                des: '全球最安全的社交即时通讯软件',
                src: 'https://s14.postimg.cc/4offvjf9d/telegram.png'
              },
              {
                title: 'BeeChat ',
                url: 'http://beechat.io/',
                des: '专注于区块链的即时通讯软件',
                src: 'https://s18.postimg.cc/6e14frd7d/beechat.png'
              }
            ]
          }
        ],
        appIndex: 0,
        recommendList: [
          {
            name: '币安',
            url: 'https://www.binance.com/clientDownloads.html'
          },
          {
            name: '火币pro',
            url: 'https://huobiglobal.zendesk.com/hc/zh-cn/articles/360002190292'
          },
          {
            name: 'Gate.io',
            url: 'https://gateio.io/mobileapp'
          },
          {
            name: 'OKEX',
            url: 'https://www.okex.com/'
          },
          {
            name: '比特派',
            url: 'http://bitpie.com/'
          },
          {
            name: 'imToken',
            url: 'https://token.im/'
          },
          {
            name: 'AICoin',
            url: 'https://www.aicoin.net.cn/app'
          },
          {
            name: '非小号',
            url: 'https://www.feixiaohao.com/app/'
          },
          {
            name: '巴比特',
            url: 'http://download.8btc.com/'
          }
        ],
        nextNum: 10,
        showFlag: false,
        searchTxt: '',
        searchResult: [],
        searchFlag: false,
        showMore: ''
      };
    },
    computed: {
      ...mapGetters({
        coinList: 'coinList',
        blockList: 'blockList',
        newsList: 'newsList'
      })
    },
    mounted() {
      setInterval(this.scroll, 3000);
      this.$store.dispatch('getNews');
    },
    watch: {
      searchTxt: 'innerSearchFun'
    },
    methods: {
      moreHandler(k) {
        console.log(k, this.showMore);
        if (this.showMore !== '') {
          this.showMore = '';
        } else {
          this.showMore = k;
        }
      },
      scroll() {
        let con1 = this.$refs.listItem;
        let that = this;
        con1.style.transform = 'translateY(-48px)';
        this.showFlag = !this.showFlag;
        setTimeout(function () {
          let arr = that.coinList.concat(that.coinList.splice(0, 4));
          that.$store.commit('SET_COIN_LIST', arr);
          con1.style.transform = 'translateY(0)';
          that.showFlag = !that.showFlag;
        }, 500);
      },
      searchFun() {
        window.open(`https://www.baidu.com/s?wd=${this.searchTxt}`);
      },
      collection() {
        let title = '区块链导航';
        let url = location.href;
        try {
          window.external.addFavorite(url, title);
        } catch (e) {
          try {
            window.sidebar.addPanel(title, url, '');
          } catch (e) {
            alert('抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加');
          }
        }
      },
      saveToDesktop(fileName, data) {
        let explorer = navigator.userAgent.toLowerCase();
        if (explorer.indexOf('trident') > 0) { // IE 5+
          // let wss = new ActiveXObject('WScript.Shell');
          // let desktopUrl = wss.SpecialFolders('Desktop');
          // let fso = new ActiveXObject('Scripting.FileSystemObject');
          // let tf = fso.CreateTextFile(desktopUrl + '\\' + fileName, true);
          // tf.Write(data);
          // tf.Close();
        } else { // fireFox chrome
          alert('抱歉，您所使用的浏览器无法完成此操作,请手动添加快捷方式至桌面');
        }
      },
      innerSearchFun(b) {
        if (b === true) {
          let n = 0;
          if (this.searchTxt.replace(/\s/ig, '')) {
            this.blockList.forEach((v, k) => {
              if (v.content && v.content.length !== 0) {
                v.content.forEach((i, j) => {
                  if (i.name.indexOf(this.searchTxt) !== -1) {
                    this.searchResult.push(i);
                    n++;
                  }
                });
              }
            });
            if (n === 0) {
              this.searchResult = [];
            }
            this.searchFlag = true;
          } else {
            this.searchResult = [];
            this.searchFlag = false;
          }
        } else {
          if (!(this.searchTxt.replace(/\s/ig, ''))) {
            this.searchResult = [];
            this.searchFlag = false;
          }
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "./Home..styl"
  .list-item
    transition: all 0.5s;
</style>
