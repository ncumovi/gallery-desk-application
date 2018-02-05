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
  },
  imagemin: {
    /* 压缩图片大小 */
    dist: {
        options: {
            optimizationLevel: 3 //定义 PNG 图片优化水平
        },
        files: [
            {
              expand: true,
              cwd: 'originImg/',
              src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
              dest: 'static/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
            }
        ]
        }
    },
})

//加载任务
grunt.loadNpmTasks('grunt-electron-installer')
grunt.loadNpmTasks('grunt-contrib-imagemin');
//设置默认任务 注册任务
grunt.registerTask('default',['create-windows-installer'])
grunt.registerTask('img', ['imagemin']);


