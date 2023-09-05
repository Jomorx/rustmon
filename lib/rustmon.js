import fs from "fs"
import  { spawn } from 'child_process';

// 要监听的文件路径和要执行的Node命令
const filePath = 'todo';
const nodeCommand = 'cargo';

export default ()=>{
    let child; // 保存子进程的引用

// 执行Node命令
const executeCommand = () => {
  if (child) {
    // 如果已经有子进程在运行，先杀死它
    child.kill();
  }

  // 创建新的子进程
  child = spawn(nodeCommand, ['run']);

  child.stdout.on('data', (data) => {
    console.log(`子进程输出：${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`子进程错误：${data}`);
  });
};

// 监听文件变化
fs.watchFile(filePath, (curr, prev) => {
    if (curr.mtime > prev.mtime) {
      console.log(`${filePath} 发生变化，正在执行命令：${nodeCommand}`);
      executeCommand();
    }
  });
  
console.log(`正在监听文件：${filePath}`);
}