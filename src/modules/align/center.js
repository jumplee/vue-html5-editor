/**
 * center
 * 居中功能
 */
export default {
    name: 'justifyCenter',
    icon: 'fa-align-center fa',
    i18n: 'center justify',
    handler(editor) {
        editor.execCommand('justifyCenter')
    }
}
