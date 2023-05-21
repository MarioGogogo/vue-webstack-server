/**
 *  外部可以通过 this调用app方法
 */
module.exports = {
  foo(param) {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    console.log('%c Line:4 🍣 this', 'font-size:18px;color:#ffffff;background:#f368e0', this);
  },
};
