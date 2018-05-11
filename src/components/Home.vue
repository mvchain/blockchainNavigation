<template>
  <div class="home">
    <nav class="nav">
      <div class="nav-name">
        <img style="margin-top:20px;" src="../assets/imgs/TTBTC.png" alt="天天比特币logo logo TTBTC 标志 官网 小牛链 区块链 标识">
      </div>
      <div class="nav-button">
        <span @click="sectionFlag = false">首页</span>
        <span @click="sectionFlag = true">新手入门</span>
        <span>丨</span>
        <span @click="collection">收藏本站</span>
      </div>
    </nav>
    <div class="home-search contain-style">
      <div class="home-search-name">
        <img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png">
      </div>
      <div class="home-search-input">
        <input type="text" v-model="searchTxt" @keydown.13="searchFun">
      </div>
      <div>
        <span class="search-baidu" @click="searchFun" >百度一下</span>
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
    <section v-show="!sectionFlag" class="section contain-style">
      <div v-if="!searchFlag" class="section-left">
        <div class="section-container" v-for="(v, k) in blockList" :key="k">
          <div class="section-container-title">{{v.name}}

            <el-popover
              placement="bottom-start"
              width="200"
              popper-class="popover-style"
              trigger="hover"
              :content="v.title">
              <el-button  slot="reference" style="color:#909090;padding:0;border:0;" class="el-icon-question">
                <i class=""></i>
              </el-button>
            </el-popover>

          </div>
          <div class="section-container-content">
            <p v-if="j < 24 && k !== 3" v-for="(i, j) in v.content" :key="j">
              <a   target="_blank" :href="i.url?i.url:'javascript:void(0);'"  :title="i.name">
                {{i.name}}
              </a>
            </p>
            <p v-if="j >= 24 && showMore === k && k !== 3" v-for="(i, j) in v.content" :key="j">
              <a   target="_blank" :href="i.url?i.url:'javascript:void(0);'"  :title="i.name">
                {{i.name}}
              </a>
            </p>
            <p v-if="k === 3" v-for="(i, j) in v.content" :key="j">
              <el-popover
                placement="bottom-start"
                trigger="hover"
               >
                <img :src="i.hover" alt="二维码">
                <el-button class="code-style" slot="reference"> {{i.name}}</el-button>
              </el-popover>

            </p>
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
            <p v-for="(i, j) in searchResult" :key="j" :title="i.name" v-show="searchResult.length !== 0">
              <a target="_blank" :href="i.url?i.url:'javascript:void(0);'" >{{i.name}}</a>
            </p>
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
              popper-class="popover-style"
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
              <h2  class="section-right-new-title" :title="v.title">{{v.title}}</h2>
              <p  class="section-right-new-context">
                {{v.content}}
              </p>
              <div  class="section-right-new-date">{{v.issue_time | timeFilter}}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-show="sectionFlag" class="section contain-style">
      <div class="new-con">
        <div class="new-container-title">新手入门
        </div>
        <div class="new-container-content">
          <div class="new-container-content-left">
            <ul>
              <li v-for="(v, k) in sectionList" :key="k" :class="sectionNum===k&&'active'" class="new-container-content-btn" @click="sectionNum = k">
                <span>{{v.title}}</span><i style="float:right;" class="el-icon-arrow-right"></i>
              </li>

            </ul>
          </div>
          <div v-show="sectionNum===0" class="new-container-content-right">
            <div class="new-container-content-right-title">如何使用RMB购买数字货币</div>
            <div class="new-container-content-right-content">
              <ul>
                <li class="marginsss">导航交易所板块的前两排都是比较主流的交易所，大部分交易所国内不能直接访问，但Gate.io除外，点击导航首页的Gate.io链接，就可直接进入。
                  因国内政策限制，大部分情况是不能直接用RMB购买数字货币的，现在就以Gate.io为例，教新人如何用RMB在交易所内购买数字货币。用户需先购买 USDT（ USDT 是一种与美元等值的虚拟货币，常用作数字货币和法币之间的交易媒介），再用买到的 USDT 购买其他数字货币。
                </li>
                <li class="marginsss">1.进入Gate.io</li>
                <li>2.点击新用户注册</li>
                <li class="marginsss" style="margin-top:12px;padding-left:10px;">
                  <img src="../assets/imgs/ex-register.png" alt="">
                </li>
                <li>3. 填写信息（资金密码需要牢记，交易时会用到）</li>
                <li class="marginsss" style="margin-top:12px;padding-left:10px;">
                  <img src="../assets/imgs/ex-register2.png" alt="">
                </li>
                <li class="marginsss">4. 点击“立即注册”后，邮箱会收到激活链接，点击邮件里的链接后注册成功</li>
                <li class="marginsss">5. 登录账号后，进入“安全设置”页面，点击“手机绑定”，填写真实姓名，设置手机号（手机之后登录和交易会用到</li>
                <li class="marginsss" style="margin-top:12px;padding-left:10px;"><img src="../assets/imgs/ex-vate.png" alt=""></li>
                <li class="marginsss">6. 接着进行实名认证，同样是“安全设置”页面，选择“身份认证”，实名认证时必须填写真实信息，否则将影响之后的交易
                  行为。（购买 USDT 之前，须先进行实名认证！否则无法购买！）
                </li>
                <li class="marginsss" style="margin-top:12px;padding-left:10px;"><img src="../assets/imgs/ex-id.png" alt=""></li>
                <li class="marginsss">7. 实名认证成功后即可进入 C2C 交易区购买 USDT。在买入USDT区域，输入您希望购买的USDT数量，金额CNY处会显示所
                  需支付的金额。点击买入后，系统会自动匹配USDT的卖家，您给卖家的银行账户/微信/支付宝 转账所需金额（给卖家转账，
                  请务必正确输入付款金额，否则会出现不必要的麻烦或损失！），卖家可能需要几分钟来确认收到的款项，之后平台会释放替
                  您保存的USDT，整个过程由平台方作为第三方担保，交易过程是很安全的。<br/>
                  Gate.io C2C交易操作说明：<a class="marginsss-a"  target="_blank" href="https://gateio.io/help/help_2C2?help_2C2_sm">https://gateio.io/help/help_2C2?help_2C2_sm</a></li>
                <li class="marginsss">
                  <img src="../assets/imgs/ex-buy.png" alt="">
                </li>
                <li class="marginsss">8.  购买 USDT 之后，即可进入“币币交易”购买您喜爱的虚拟货币了。</li>
                <li>如有更多疑问，可以查看Gate.io官方帮助页面： <a class="marginsss-a"  target="_blank" href="https://gateio.io/help">https://gateio.io/help</a></li>
              </ul>
            </div>
          </div>
          <div v-show="sectionNum===1" class="new-container-content-right">常见问题解答链接：
            <a class="marginsss-a"  target="_blank" href="https://www.cmcmbc.com/zh-cn/safe-wallet/support/">https://www.cmcmbc.com/zh-cn/safe-wallet/support/</a>
          </div>
        </div>
        <div class="new-container-footer">
          <p><span>温馨提醒：</span>数字货币的交易存在很大风险，在全球范围内一周7天，一天24小时无休止交易，没有每日涨停跌停限制，受到新闻事</p>
          <p>件，各国政策，市场需求等多种因素影响，价格浮动很大。建议大家在自身所能承受的风险范围内参与交易。</p>
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
        sectionList: [
          {
            title: '如何使用RMB购买数字货币'
          },
          {
            title: '数字钱包常见问题解答'
          }
        ],
        sectionFlag: false,
        sectionNum: 0,
        popoverKey: '',
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
            name: '比特派',
            url: 'http://bitpie.com/'
          },
          {
            name: 'imToken',
            url: 'https://token.im/'
          },
          {
            name: 'AICoin',
            url: 'http://www.aicoin.com/'
          },
          {
            name: '非小号',
            url: 'https://www.feixiaohao.com/'
          },
          {
            name: '巴比特',
            url: 'http://www.8btc.com/'
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
        this.$message({
          showClose: true,
          message: '请按下Ctrl+D来收藏本站'
        });
      },
      innerSearchFun(b) {
        if (b === true) {
          let n = 0;
          if (this.searchTxt.replace(/\s/ig, '')) {
            this.blockList.forEach((v, k) => {
              if (v.content && v.content.length !== 0) {
                v.content.forEach((i, j) => {
                  if ((i.name).toUpperCase().indexOf((this.searchTxt).toUpperCase()) !== -1) {
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
