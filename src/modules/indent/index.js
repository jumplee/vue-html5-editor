/**
 * undo
 * Created by peak on 16/8/20.
 */
export default {
    name: 'indent',
    icon: 'fa-indent fa',
    i18n: 'indent',
    handler(editor) {
        editor.execCommand('indent')
    }
}
