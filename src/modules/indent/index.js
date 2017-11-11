/**
 * indent
 * 缩进功能
 */
export default {
    name: 'indent',
    icon: 'fa-indent fa',
    i18n: 'indent',
    handler(editor) {
        editor.execCommand('indent')
    }
}
