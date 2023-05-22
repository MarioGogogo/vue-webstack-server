module.exports = {
  getIP(param) {
    // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
    console.log('%c Line:6 ❤️‍🔥❤️‍🔥 this.request;', 'font-size:18px;color:#ffffff;background:#10ac84', this.request);
    return this.request;
  },
  today_now() {
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = new Date().getDate();
    let hh = new Date().getHours();
    let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
    let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
    return `${yy}-${mm}-${dd} ${hh}:${mf}:${ss}`;
  },
};
