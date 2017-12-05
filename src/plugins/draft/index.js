import {log} from '../../util/log'

// 计数器指针
let p
//
export let storeKey = 'vue_editor_draft'
export default {
    stop(){
        localStorage.setItem(storeKey,'')
        this.uninstall()
    },
    uninstall(){
        if (p){
            clearInterval(p)
        }
    },
    install(editor){
        if (editor.draft){
            if (editor.draftStoreKey){
                storeKey = `vue_editor_draft_${editor.draftStoreKey}`
            }
            if (editor.draftTime < 100){
                throw new Error('draft setInterval can not smaller than 100ms')
            }
            const draft = localStorage.getItem(storeKey)
            if (draft && draft !== '<p><br></p>'){
                editor.showDraft = true
            } else {
                editor.showDraft = false
                p = setInterval(() => {
                    localStorage.setItem(storeKey,editor.getContent())
                },editor.draftTime)
            }
        }
    }
}