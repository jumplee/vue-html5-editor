const express = require('express')
const multiparty = require('multiparty')
const util = require('util')
const fs = require('fs')

const app = express()
app.use(express.static('.'))

app.use(express.static('server'))
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

/* 上传*/
app.post('/file/uploading', (req, res, next) => {
  // 生成multiparty对象，并配置上传目标路径
  const form = new multiparty.Form({
    uploadDir: './server/temp/'
  })
  // 上传完成后处理
  form.parse(req, (err, fields, files) => {
    const filesTmp = JSON.stringify(files, null, 2)

    if (err) {
      console.log(`parse error: ${err}`)
    } else {
      console.log(`parse files: ${filesTmp}`)
      const inputFile = files.file[0]
      const uploadedPath = inputFile.path
      var dstPath = `./server/files/${inputFile.originalFilename}`
      // 重命名为真实文件名
      fs.rename(uploadedPath, dstPath, (err) => {
        if (err) {
          console.log(`rename error: ${err}`)
        } else {
          console.log('rename ok')
        }
      })
    }

    res.writeHead(200, {
      'content-type': 'text/plain;charset=utf-8'
    })
    // 随机生成一个延迟
    const timeout = Math.ceil(Math.random() * 5) + 2
    if (timeout > 5) {
      res.end('{"success":false}')
    } else {
      setTimeout(() => {
        res.end(`{"success":true,"fileUrl":"${dstPath.replace('./server', '')}"}`)
      }, timeout * 1000)
    }
  })
})

var server = app.listen(3000, () => {
  const host = server.address().address
  const port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})
// module.exports = app;