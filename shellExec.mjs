import shell from 'shelljs';

export const isUseGit = () => {
    //判定git命令是否可用
    if (!shell.which('git')) {
        //向命令行打印git命令不可用的提示信息
        shell.echo('Sorry, this script requires git');
        //退出当前进程
        shell.exit(1);
    }

    return true
}

export const gitLog = (callback) => {
    if(isUseGit()) {
        shell.exec('git log', { silent: true }, (error, stdout, stderr) => {
            callback(stdout)
        })
    }
}

export const gitLogCommitDetail = (data, callback) => {
  if(isUseGit()) {
    let commit = data[0].split(' ')[1]
    console.log('commit',commit)
    shell.exec(`git show ${commit}`, { silent: true }, (error, stdout, stderr) => {
      // console.log('--------------stdout---', stdout)
        callback(stdout)
    })
  }
}

