import {upload} from '../../util/xhr2'
import Command from '../../range/command'
import {uuid} from '../../util/func'
import {loadingPath} from '../../util/string'

export default {
    uninstall(){
        document.removeEventListener('paste',this.pasteListener)
    },
    install(editor){
        // 粘贴上传
        this.pasteListener = function (event){
            const items = event.clipboardData && event.clipboardData.items
            let file = null
            if (items && items.length) {
                // 检索剪切板items
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf('image') !== -1) {
                        file = items[i].getAsFile()
                        break
                    }
                }
            }
            // 此时file就是剪切板中的图片文件
            if (file){
                // 禁用默认操作，
                // 浏览器右键复制图片粘贴会出现乱码，禁用默认操作
                event.preventDefault()
                const uid = `temp_img_${uuid()}`
                editor.execCommand(Command.INSERT_HTML, `
                    <p id="${uid}" style="text-align: center;border:1px solid #eee;padding:20px;">
                    <img style="border: none;margin: 0 auto;width:40px;" src="${loadingPath}" alt="">
</p>
                `)

                upload(editor.uploadUrl,file,{},(json) => {
                    document.getElementById(uid).remove()
                    editor.execCommand(Command.INSERT_IMAGE, json.path)
                })
            }
        }

        this.dragleaveListener = function (e) {
            e.preventDefault()
        }
        this.dropListener = function (e) {
            e.preventDefault()
        }
        this.dragenterListener = function (e) {
            e.preventDefault()
        }
        this.dragoverListener = function (e) {
            e.preventDefault()
        }
        if (editor.uploadUrl){
            document.addEventListener('paste', this.pasteListener)
            document.addEventListener('dragleave',this.dragleaveListener)
            document.addEventListener('drop',this.dropListener)
            document.addEventListener('dragenter',this.dragenterListener)
            document.addEventListener('dragover',this.dragoverListener)
            debugger
        }
    }
}