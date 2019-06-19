import draftIndex,{storeKey} from './index'

export default {
    name: 'draft-name',
    template: '',
    methods: {
        onOk() {
            const editor = this.$parent
            editor.setContent(localStorage.getItem(storeKey))
            this.run(editor)
        },
        onCancel() {
            const editor = this.$parent
            this.run(editor)
        },
        run(editor) {
            localStorage.setItem(storeKey,'')
            draftIndex.install(editor)
        }
    }
}