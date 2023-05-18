// 引入copyFile, statSync, mkdirSync, existSync, readdir
const { copyFile, statSync, mkdirSync, existsSync, readdir } = require('fs');
const path = require('path');
// source为源位置，target为目标地址，需要将源位置的文件复制到目标位置
const sourceFile = path.join(__dirname, './entry.js');
const targetFile = path.join(__dirname, '../../dist/entry.js');
const sourceDir = path.join(__dirname, '../src/style');
const targetDir = path.join(__dirname, '../../dist/style');
const staticSourceDir = path.join(__dirname, '../../static');
const staticTargetDir = path.join(__dirname, '../../dist/static');

const copyFolder = async (src, dst) => {
  /**
   * 试图读取文件夹中的文件
   * 如果没有错误的情况下
   *  如果文件不存在时，同步创建目录
   * 遍历文件夹中的文件
   * 获取源文件夹中的文件
   * 获取目标文件夹中的文件
   * 获取源文件夹中的内容是否为文件信息
   * 如果是文件，就拷贝，有错误就报错误
   * 否则是文件夹，就递归调用
   */
  readdir(src, (err, files) => {
    if (!err) {
      if (!existsSync(dst)) mkdirSync(dst);
      files.forEach(file => {
        const srcPath = path.join(src, file);
        const dstPath = path.join(dst, file);
        const stat = statSync(srcPath);
        if (stat.isFile()) {
          // eslint-disable-next-line no-shadow
          copyFile(srcPath, dstPath, (err) => {
            if (err) {
              console.log(err);
              process.exit(1);
            }
          });
        } else if (stat.isDirectory()) {
          copyFolder(srcPath, dstPath);
        }
      });
    } else {
      console.log(err);
      process.exit(1);
    }
  });
};

copyFile(sourceFile, targetFile, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

copyFolder(sourceDir, targetDir);
copyFolder(staticSourceDir, staticTargetDir);
