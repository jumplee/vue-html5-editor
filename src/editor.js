import RangeHandler from './range/handler'
import './style.css'
import template from './editor.html'
import onPaste from './event/onPaste'
import Command from './range/command'
import {
    getSelection, getParentBlockNode
} from './range/util'
import {log} from './util/log'
import plugins from './plugins/index'

const {draft} = plugins
/**
 * Created by peak on 2017/2/9.
 */
export default {
    template,
    components: {
        'draft-panel': {
            template: 'hhh'
        }
    },
    props: {
        plainTextPaste: {
            type: Boolean,
            default: false
        },
        content: {
            type: String,
            required: true,
            default: ''
        },
        height: {
            type: Number,
            default: 300,
            validator(val) {
                return val >= 100
            }
        },
        zIndex: {
            type: Number,
            default: 1000
        },
        autoHeight: {
            type: Boolean,
            default: true
        },
        showModuleName: {
            type: Boolean,
            default: false
        },
        toolbars: {
            type: Array,
            default() {
                return []
            }
        },
        draft: {
            type: Boolean,
            default: false
        },
        draftTime: {
            type: Number,
            default: 2000
        },
        // 草稿箱自定义字段，可以让多个编辑器同时使用不同的草稿
        draftStoreKey: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            // defaultShowModuleName:false
            // locale: {},
            // modules:{},
            fullScreen: false,
            dashboard: null,
            showDraft: false
        }
    },
    watch: {
        /**
         * 监听外部改变了content
         * @param {string} val
         */
        content(val) {
            this.setContent(val)
        },
        fullScreen(val) {
            const component = this
            if (val) {
                component.parentEl = component.$el.parentNode
                component.nextEl = component.$el.nextSibling
                document.body.appendChild(component.$el)
                return
            }
            if (component.nextEl) {
                component.parentEl.insertBefore(component.$el, component.nextEl)
                return
            }
            component.parentEl.appendChild(component.$el)
        }
    },
    computed: {
        contentStyle() {
            const style = {}
            if (this.fullScreen) {
                style.height = `${window.innerHeight - this.$refs.toolbar.clientHeight - 1}px`
                return style
            }
            if (!this.autoHeight) {
                style.height = `${this.height}px`
                return style
            }
            style['min-height'] = `${this.height}px`
            return style
        }
    },
    methods: {
        // updateContent(val) {
        //     const content = this.$refs.content.innerHTML
        //     const convertVal = this.convertToInnerHtml(val)
        //     if (convertVal !== content) {
        //         this.$refs.content.innerHTML = convertVal
        //     }
        // },
        stopDraft(){
            draft.stop()
        },
        toggleFullScreen() {
            this.fullScreen = !this.fullScreen
        },
        enableFullScreen() {
            this.fullScreen = true
        },
        exitFullScreen() {
            this.fullScreen = false
        },
        focus() {
            this.$refs.content.focus()
        },
        toggleDashboard(dashboard) {
            this.dashboard = this.dashboard === dashboard ? null : dashboard
        },
        execCommand(command, ...arg) {
            this.restoreSelection()
            if (this.range) {
                const handler = new RangeHandler(this.range, this)
                handler.execCommand(command, ...arg)
            }
            this.toggleDashboard()
            const newConent = this.convertToContent(this.$refs.content.innerHTML)
            this.$emit('change', newConent)
        },
        getCurrentRange() {
            return this.range
        },
        /**
         * 获取当前的光标对象并赋值给this.range
         */
        saveCurrentRange() {
            const selection = getSelection()
            if (!selection.rangeCount) {
                return
            }
            const content = this.$refs.content
            for (let i = 0; i < selection.rangeCount; i++) {
                const range = selection.getRangeAt(0)
                let start = range.startContainer
                let end = range.endContainer
                // for IE11 : node.contains(textNode) always return false
                start = start.nodeType === Node.TEXT_NODE ? start.parentNode : start
                end = end.nodeType === Node.TEXT_NODE ? end.parentNode : end
                if (content.contains(start) && content.contains(end)) {
                    this.range = range
                    break
                }
            }
        },
        getContent(){
            const newConent = this.convertToContent(this.$refs.content.innerHTML)
            return newConent
        },
        setContent(val){
            const content = this.$refs.content.innerHTML
            const convertVal = this.convertToInnerHtml(val)
            if (convertVal !== content) {
                this.$refs.content.innerHTML = convertVal
            }
        },
        restoreSelection() {
            const selection = getSelection()
            selection.removeAllRanges()
            if (this.range) {
                selection.addRange(this.range)
            } else {
                const content = this.$refs.content
                const div = document.createElement('p')
                const range = document.createRange()
                content.appendChild(div)
                range.setStart(div, 0)
                range.setEnd(div, 0)
                selection.removeAllRanges()
                selection.addRange(range)
                this.range = range
            }
        },
        activeModule(module) {
            if (typeof module.handler === 'function') {
                module.handler(this)
                return
            }
            if (module.hasDashboard) {
                this.toggleDashboard(`dashboard-${module.name}`)
            }
        },
        convertToInnerHtml(content) {
            // 为空返回一个br保证所有的文字都在div中
            if (content === '') {
                return '<p><br/></p>'
            }
            // 当是纯文本的时候包括在div中
            if (content.indexOf('<') === -1) {
                return `<p>${content}</p>`
            }
            const str = content.replace(/<video .*?poster="(.*?)".*?src="(.*?)".*?>.*?<\/video>/ig, ($0, $1, $2) => `<img data-url="${$2}" class="video-poster" src="${$1}">`)
            return str
        },
        convertToContent(html) {
            const ar = html.match(/<img .*?>/ig)
            const videoPreviewArray = []
            if (ar) {
                ar.forEach((item) => {
                    if (item.indexOf('class="video-poster"') >= 0) {
                        const str = item.replace(/<img .*?data-url="(.*?)".*?class="video-poster".*?src="(.*?)">/ig, ($0, $1, $2) =>
                            `<video poster="${$2}" src="${$1}" controls></video>`)
                        videoPreviewArray.push({
                            replaceStr: item,
                            newStr: str
                        })
                    }
                })
                let returnStr = ''
                videoPreviewArray.forEach((item) => {
                    if (returnStr) {
                        returnStr = returnStr.replace(item.replaceStr, item.newStr)
                    } else {
                        returnStr = html.replace(item.replaceStr, item.newStr)
                    }
                })
                if (returnStr){
                    html = returnStr
                }
            }
            return html
        }
    },
    created() {
        const newModules = []
        const toolbars = this.toolbars
        const editor = this
        const editorDom = editor.$refs.content
        if (toolbars.length > 0) {
            this.modules.forEach((item) => {
                const index = toolbars.indexOf(item.name)
                if (index > -1) {
                    newModules[index] = item
                }
            })
            this.modules = newModules
        }

        this.modules.forEach((module) => {
            if (typeof module.init === 'function') {
                module.init(this)
            }
        })
    },
    mounted() {
        const editor = this
        const content = this.$refs.content
        content.innerHTML = this.convertToInnerHtml(this.content)
        content.addEventListener('mouseup', () => {
            editor.saveCurrentRange()
        }, false)
        content.addEventListener('keyup', (e) => {
            const key = e.which
            editor.$emit('change', this.convertToContent(content.innerHTML))
            // 需要在前面执行
            editor.saveCurrentRange()
            const startContainer = this.range.startContainer
            const endContainer = this.range.endContainer
            const pNode = getParentBlockNode(startContainer)
            if (key === 9) {
                log('tab')
                e.preventDefault()
            }
            // 回车
            if (key === 13) {
                // console.log('enter')
                // editor.execCommand('insertHTML','<p></p>')
                // e.preventDefault()
            }
            // 删除键
            if (key === 8) {
                if (content.innerHTML === '' || content.innerHTML === '<br>') {
                    content.innerHTML = '<p><br></p>'
                } else {
                    // if(startContainer==endContainer && startContainer.length===0){

                    //     pNode.parentNode.removeChild(pNode)
                    // }
                }
            }
        },false)
        content.addEventListener('mouseout', (e) => {
            if (e.target === content) {
                this.saveCurrentRange()
            }
        }, false)
        content.addEventListener('paste', (...args) => {
            // const e = args[0]
            // 注册paste方法，粘贴的都是纯文本
            // 代码来自http://www.zhangxinxu.com/wordpress/2016/01/contenteditable-plaintext-only/
            if (editor.plainTextPaste) {
                onPaste.apply(this, args)
            }
            // } else {
            //      // 阻止默认的粘贴行为
            //     e.preventDefault()
            //     // 过滤script等安全问题代码
            //     let text = ''
            //     if (window.clipboardData && window.clipboardData.setData) {
            //         // IE
            //         text = window.clipboardData.getData('text/html')
            //     } else {
            //         text = (e.originalEvent || e).clipboardData.getData('text/html')
            //     }

            //     editor.execCommand(Command.INSERT_HTML,false,editor.safeHtml(text))
            // }
        })


        // 执行插件安装
        draft.install(editor)
    },
    // /**
    // * 将不安全的标签去除
    //  * @param text
    //  * @returns {*}
    //  */
    // safeHtml(text){
    // 	// 还不是很完整，待续
    // 	if (text){
    // 		return	text.replace(/<script.*>.*<\/script>/ig,'')
    // 			.replace(/<style.*>.*<\/style>/ig,'')
    // 	}
    //         return text
    // },
    updated() {
        // update dashboard style
        if (this.$refs.dashboard) {
            this.$refs.dashboard.style.maxHeight = `${this.$refs.content.clientHeight}px`
        }
    },
    beforeDestroy() {
        this.modules.forEach((module) => {
            if (typeof module.destroyed === 'function') {
                module.destroyed(this)
            }
        })
        // 卸载插件
        draft.uninstall(this)
    }
}