export default function onPaste(e){
    e.preventDefault()
    let text = ''

    if (window.clipboardData && window.clipboardData.setData) {
        // IE
        text = window.clipboardData.getData('text')
    } else {
        text = (e.originalEvent || e).clipboardData.getData('text/plain')
    }
    let textRange
    if (document.body.createTextRange) {
        if (document.selection) {
            textRange = document.selection.createRange()
        } else if (window.getSelection) {
            const sel = window.getSelection()
            const range = sel.getRangeAt(0)

            // 创建临时元素，使得TextRange可以移动到正确的位置
            const tempEl = document.createElement('span')
            tempEl.innerHTML = '&#FEFF;'
            range.deleteContents()
            range.insertNode(tempEl)
            textRange = document.body.createTextRange()
            textRange.moveToElementText(tempEl)
            tempEl.parentNode.removeChild(tempEl)
        }
        textRange.text = text
        textRange.collapse(false)
        textRange.select()
    } else {
        // Chrome之类浏览器
        document.execCommand('insertText', false, text)
    }
}