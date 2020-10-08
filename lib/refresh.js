const fs = require("fs");
const handlebars = require("handlebars");
const chalk = require("chalk");
module.exports = async () => {
  // 获取⻚⾯列表
  const list = fs
    .readdirSync("./src/views")
    .filter((v) => v !== "Home.vue")
    .map((v) => ({
      name: v.replace(".vue", "").toLowerCase(),
      file: v,
    }));
  // ⽣成路由定义
  compile(
    {
      list,
    },
    "./src/router.js",
    "./template/router.js.hbs"
  );
  // ⽣成菜单
  compile(
    {
      list,
    },
    "./src/App.vue",
    "./template/App.vue.hbs"
  );
  /**
   * 编译模板⽂件
   * @param meta 数据定义
   * @param filePath ⽬标⽂件路径
   * @param templatePath 模板⽂件路径
   */
  function compile(meta, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
      const content = fs.readFileSync(templatePath).toString();
      const result = handlebars.compile(content)(meta);
      fs.writeFileSync(filePath, result);
    }
    console.log(
      chalk.green(` !
  ${filePath} 创建成功`)
    );
  }
};
