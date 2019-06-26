import {upload} from '../../util/xhr2'
import Command from '../../range/command'
import {uuid} from '../../util/func'
import {loadingPath} from '../../util/string'

export default {
    uninstall(){
        // 移除适合
        document.removeEventListener('paste', this.pasteListener)
        document.removeEventListener('dragleave',this.dragleaveListener)
        document.removeEventListener('drop',this.dropListener)
        document.removeEventListener('dragenter',this.dragenterListener)
        document.removeEventListener('dragover',this.dragoverListener)
        document.removeEventListener('paste',this.pasteListener)
    },
    insertHolder(){
        const uid = `temp_img_${uuid()}`
        this.editor.execCommand(Command.INSERT_HTML, `
                    <p id="${uid}" class="img-holder contenteditable="false""> 
                    <img style="border: none;margin: 0 auto;width:40px;" src="${loadingPath}" alt="">
</p>
                `)
        return uid
    },
    insertError(msg){
        const uid = `temp_img_${uuid()}`
        this.editor.execCommand(Command.INSERT_HTML, `
                    <p id="${uid}" class="img-holder"  contenteditable="false">
                    上传失败：${msg},<span id="${uid}_cancel" class="img-btn-cancel">取消</span>
</p>
                `)
        document.getElementById(`${uid}_cancel`).onclick = function () {
            document.getElementById(uid).remove()
        }
        return uid
    },
    install(editor){
        const me = this
        me.editor = editor
        // 粘贴上传
        this.pasteListener = function (event){
            const items = event.clipboardData && event.clipboardData.items
            const images = []
            if (items && items.length) {
                // 检索剪切板items
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf('image') !== -1) {
                        images.push(items[i].getAsFile())
                        break
                    }
                }
            }
            // 如果是图片，禁用默认操作，否则执行默认操作
            if (images.length > 0){
                // 浏览器右键复制图片粘贴会出现乱码，禁用默认操作
                event.preventDefault()
            }
            // 此时file就是剪切板中的图片文件
            images.forEach((file) => {
                const uid = me.insertHolder()

                upload(editor.uploadUrl,file,{},(json) => {
                    document.getElementById(uid).remove()
                    editor.execCommand(Command.INSERT_IMAGE, json.path)
                })
            })
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
        this.editorDropListener = function (e){
            e.preventDefault() // 取消默认浏览器拖拽效果
            const fileList = e.dataTransfer.files // 获取文件对象
            // 检测是否是拖拽文件到页面的操作
            if (fileList.length === 0) {
                return
            }
            const images = []
            for (let i = 0; i < fileList.length; i++){
                const file = fileList.item(i)
                if (file.type.indexOf('image') !== -1){
                    images.push(file)
                }
            }

            images.forEach((file) => {
                const uid = me.insertHolder()

                upload(editor.uploadUrl,file,{},(json) => {
                    document.getElementById(uid).remove()
                    if (json.success){
                        editor.execCommand(Command.INSERT_IMAGE, json.path)
                    } else {
                        me.insertError(json.errMsg)
                    }
                },(xhr) => {
                    document.getElementById(uid).remove()
                    me.insertError(xhr.responseText)
                })
            })
        }
        if (editor.uploadUrl){
            document.addEventListener('paste', this.pasteListener)
            document.addEventListener('dragleave',this.dragleaveListener)
            document.addEventListener('drop',this.dropListener)
            document.addEventListener('dragenter',this.dragenterListener)
            document.addEventListener('dragover',this.dragoverListener)
            editor.$el.addEventListener('drop',this.editorDropListener)
        }
    }
}