'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user/:id', controller.user.info);

  // 登录接口
  router.post('/login', controller.user.login);

  // 类别 增删改查
  router.get('/categorylist', controller.category.categoryList);
  router.post('/createcategory', controller.category.createCategory);
  router.post('/updatecategory', controller.category.updateCategory);
  router.post('/deletecategory', controller.category.deleteCategory);
  router.post('/bathdeletecategory', controller.category.bathDeleteCategory);

  // 链接地址列表  增删改查
  router.get('/linksalllist', controller.links.linksAllList);
  router.post('/linkslist', controller.links.linksList);
  router.post('/createlinks', controller.links.createLinks);
  router.post('/updatelinks', controller.links.updateLinks);
  router.post('/deletelinks', controller.links.deleteLinks);
  router.post('/bathdeletelinks', controller.links.bathdeleteLinks);
  /**
   * 单独某一个接口效验
   */
  const checkParam = app.middleware.checkParam();
  router.post('/user', checkParam, controller.user.create);

  router.get('/download', controller.downFiles.download);
  router.get('/downloadImage', controller.downFiles.downloadImage);

  router.get('/readJson1000', controller.readJson.read1000);
  router.get('/readJson10000', controller.readJson.read10000);
};
