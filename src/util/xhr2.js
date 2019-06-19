export default {

}
export function upload(url,file,params,callback,failCallback,option){
    const defaultOption = {
        fileName: 'file'
    }

    const opt = Object.assign({},defaultOption,option)
    const formData = new FormData()
    formData.append(opt.fileName, file)
    if (params){
        Object.keys(params).forEach((key,param) => {
            formData.append('key', param)
        })
    }

    // 其他些参数，例如用户id

    // ajax上传
    const xhr = new XMLHttpRequest()
    // 上传结束
    xhr.onload = function (event) {

    }
    xhr.onreadystatechange = function (){
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                const json = JSON.parse(xhr.responseText)
                // ... 这里处理返回的json数据
                if (typeof callback === 'function'){
                    callback(json)
                }
            } else if (typeof failCallback === 'function'){
                    failCallback(xhr)
                }
        }
    }

    xhr.open('POST', url, true)
    xhr.send(formData)
}