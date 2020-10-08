const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");
const log = (content) => console.log(chalk.green(content));
const { clone } = require("./download");
const open = require("open");

module.exports = async (name) => {
  clear();
  const data = await figlet("KKB Welcome");
  log(data);
  await clone("github:charlesWise/react-simple-source", name);
  await spawn("cnpm", ["install"], { cwd: `./${name}` });
  log(
    chalk.green(`
  安装完成：
  To get Start:
  ===========================
  cd ${name}
  npm run serve
  ===========================
  `)
  );
  // 打开浏览器
  open(`http://localhost:8080`);
  await spawn("npm", ["run", "serve"], { cwd: `./${name}` });
};

const spawn = async (...args) => {
  const { spawn } = require("child_process");
  return new Promise((resolve) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", () => {
      resolve();
    });
  });
};
