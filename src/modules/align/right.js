/**
 * justifyRight
 * 居中功能
 */
export default {
    name: 'justifyRight',
    icon: 'fa-align-right fa',
    i18n: 'right justify',
    handler(editor) {
        editor.execCommand('justifyRight')
    }
}
