import vueUploader from 'vue-image-uploader'
import template from './dashboard.html'
import Command from '../../range/command'

// uploader.upload()

/**
 * Created by peak on 2017/2/10.
 */
export default {
    template,
    components: {
        'image-uploader': vueUploader.default.VueImageUploader
    },
    data() {
        const config = this.$options.module.config
        return {
            imageUrl: '',
            showDialog: false,
            serverUrl: config.url
        }
    },
    methods: {
        insertImageUrl() {
            if (!this.imageUrl) {
                return
            }
            this.insertImg(this.imageUrl)
            this.imageUrl = null
        },
        onFinish(files) {
            const self = this
            const config = self.$options.module.config
            let returnUrl = 'path'
            if (config.returnUrl){
                returnUrl = config.returnUrl
            }
            self.$parent.dashboard = null
            const urlAr = []
            files.forEach((item) => {
                urlAr.push(item[returnUrl])
            })

            if (urlAr.length > 0){
                this.insertImg(urlAr)
            }
        },
        insertImg(url) {
            this.$parent.execCommand(Command.INSERT_IMAGE, url)
        }
    }
}