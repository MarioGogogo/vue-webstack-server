module.exports = {
  getIP(param) {
    // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
    console.log('%c Line:6 ❤️‍🔥❤️‍🔥 this.request;', 'font-size:18px;color:#ffffff;background:#10ac84', this.request);
    return this.request;
  },
};
