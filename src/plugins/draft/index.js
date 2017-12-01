let p
export const storeKey = 'vue_editor_draft'
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
            const draft = localStorage.getItem(storeKey)
            if (draft){
                editor.showDraft = true
            } else {
                editor.showDraft = false
                p = setInterval(() => {
                    localStorage.setItem(storeKey,editor.getContent())
                },2000)
            }
        }
    }
}