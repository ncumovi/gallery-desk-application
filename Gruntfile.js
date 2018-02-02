var grunt = require('grunt');

//进行配置
grunt.config.init({
  pkg:grunt.file.readJSON('package.json'),
  'create-windows-installer': {
    x64: {
      appDirectory: './beanSprout/beanSprout-win32-x64', //已经打包的electron App目录
      outputDirectory: './beanSprout/beanSproutSetup',
      authors: 'movi',
      exe: 'beanSprout.exe',
      description:"gallery-vue",
      loadingGif:"./src/assets/install.gif",
      setupIcon:"./src/assets/favicon.ico"
    }
  }
})

//加载任务
grunt.loadNpmTasks('grunt-electron-installer')

//设置默认任务
grunt.registerTask('default',['create-windows-installer'])

grunt.tasks()
