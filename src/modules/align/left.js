/**
 * justifyLeft
 * 居中功能
 */
export default {
    name: 'justifyLeft',
    icon: 'fa-align-left fa',
    i18n: 'left justify',
    handler(editor) {
        editor.execCommand('justifyLeft')
    }
}
