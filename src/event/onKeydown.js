import command from '../range/command'

export function onKeydown(editor, content, e){
    const key = e.which
    if (key === 9) {
        e.preventDefault()
        editor.execCommand(command.INSERT_SPACE)
        return true
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
    // ctrl + s 禁用默认事件，激发保存事件，
    if (key === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
        e.preventDefault()
        editor.$emit('key_save')
    }
        return false
}
function docOnKeydown(e){
    const key = e.which
    if (key === 9) {
        e.preventDefault()
    }
    // ctrl + s 禁用默认事件
    if (key === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
        e.preventDefault()
    }
}
export function installKeyBind(){
    document.addEventListener('keydown',docOnKeydown)
}
export function uninstallKeyBind(){
    document.removeEventListener('keyup',docOnKeydown)
}
