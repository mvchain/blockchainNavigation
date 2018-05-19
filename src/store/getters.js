const getters = {
  coinList: state => state.Home.coinList,
  blockList: state => state.Home.blockList,
  newsList: state => state.Home.newsList,
  transactionApp: state => state.Home.transactionApp,
  wallet: state => state.Home.wallet,
  information: state => state.Home.information,
  other: state => state.Home.other,
  coin: state => state.Home.coin,
  information2: state => state.Home.information2,
  mine: state => state.Home.mine,
  noPublic: state => state.Home.noPublic,
  recommend: state => state.Home.recommend,
  transactionCenter2: state => state.Home.transactionCenter2,
  wallet2: state => state.Home.wallet2
};
export default getters;
