1. npm install -g yo
2. npm install -g generator-react-webpack
3.

4. git clone https://github.com/lwl7788344/React-picture.git
5. cd workname工程名
6. yo react-webpack

# Start for development
npm start # or
npm run serve

# Start the dev-server with the dist version
npm run serve:dist

# Just build the dist version and copy static files
npm run dist

# Run unit tests
npm test

# Lint all files in src (also automatically done AFTER tests are run)
npm run lint

# Clean up the dist directory
npm run clean

# Just copy the static assets
npm run copy

7 加载json文件
  npm install -g json-loader --save-dev

下载git工程后,可以进入工程目录后运行命令npm install 会自动下载依赖的node模块

////////////////////////////git/////////////////////////////////////////
// 查看本地文件修改状态
git status
// 添加文件,包括为check的
git add -A
// 提交代码
git commit -m "代码提交说明"
// 把代码push带github上
git push
