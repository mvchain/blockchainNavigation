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
                <img :src="i.url" alt="二维码">
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
                <li class="marginsss">5. 登录账号后，进入“安全设置”页面，点击“手机绑定”，填写真实姓名，设置手机号(手机之后登录和交易会用到)</li>
                <li class="marginsss" style="margin-top:12px;padding-left:10px;"><img src="../assets/imgs/ex-vate.png" alt=""></li>
                <li class="marginsss">6. 接着进行实名认证，同样是“安全设置”页面，选择“身份认证”，实名认证时必须填写真实信息，否则将影响之后的交易行为。（购买 USDT 之前，须先进行实名认证！否则无法购买！）
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
            list: []
          },
          {
            name: '数字钱包',
            list: []
          },
          {
            name: '行情资讯',
            list: []
          },
          {
            name: '其他',
            list: []
          }
        ],
        appIndex: 0,
        recommendList: [],
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
        newsList: 'newsList',
        transactionApp: 'transactionApp',
        wallet: 'wallet',
        information: 'information',
        other: 'other',
        coin: 'coin',
        information2: 'information2',
        mine: 'mine',
        noPublic: 'noPublic',
        recommend: 'recommend',
        transactionCenter2: 'transactionCenter2',
        wallet2: 'wallet2'
      })
    },
    mounted() {
      setInterval(this.scroll, 3000);
      this.$store.dispatch('getNews');
      this.$store.dispatch('getList', {title: 'SET_APP_CENTER', str: 'transactionApp'}).then(() => {
        this.appList[0].list = this.transactionApp;
      }).then(() => {
        this.$store.dispatch('getList', {title: 'SET_WALLET_APP', str: 'wallet'}).then(() => {
          this.appList[1].list = this.wallet;
        }).catch();
      }).then(() => {
        this.$store.dispatch('getList', {title: 'SET_INFORMATION_APP', str: 'information'}).then(() => {
          this.appList[2].list = this.information;
        }).catch();
      }).then(() => {
        this.$store.dispatch('getList', {title: 'SET_OTHER_APP', str: 'other'}).then(() => {
          this.appList[3].list = this.other;
        }).catch();
      }).then(() => {
        this.$store.dispatch('getList', {title: 'SET_RECOMMEND_APP', str: 'recommend'}).then(() => {
          this.recommendList = this.recommend;
        }).catch();
      }).then(() => {
        this.$store.dispatch('getList', {title: 'SET_TRANSACTION_CENTER', str: 'transactionCenter2'}).then(() => {
          this.blockList[0].content = this.transactionCenter2;
        }).catch();
      }).then(() => {
        this.$store.dispatch('getList', {title: 'SET_WALLET_WEB', str: 'wallet2'}).then(() => {
          this.blockList[1].content = this.wallet2;
        }).catch();
      }).then(() => {
        this.$store.dispatch('getList', {title: 'SET_INFORMATION_WEB', str: 'information2'}).then(() => {
          this.blockList[2].content = this.information2;
        }).catch();
      }).then(() => {
        this.$store.dispatch('getList', {title: 'SET_NO_PUBLIC', str: 'noPublic'}).then(() => {
          this.blockList[3].content = this.noPublic;
        }).catch();
      }).then(() => {
        this.$store.dispatch('getList', {title: 'SET_COIN_WEB', str: 'coin'}).then(() => {
          this.blockList[4].content = this.coin;
        }).catch();
      }).then(() => {
        this.$store.dispatch('getList', {title: 'SET_MINE_WEB', str: 'mine'}).then(() => {
          this.blockList[5].content = this.mine;
        }).catch();
      }).catch();
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
