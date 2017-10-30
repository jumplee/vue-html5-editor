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
        'image-uploader': vueUploader.VueImageUploader
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
            let returnUrl = 'fileUrl'
            if (config.returnUrl){
                returnUrl = config.returnUrl
            }
            self.$parent.dashboard = null
            files.forEach((item) => {
                self.insertImg(item[returnUrl])
            })
        },
        insertImg(url) {
            this.$parent.execCommand(Command.INSERT_IMAGE, url)
        }
    }
}