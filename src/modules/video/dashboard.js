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
        'video-uploader': vueUploader.VueVideoUploader
    },
    data() {
        const config = this.$options.module.config
        return {
            imageUrl: '',
            showDialog: false,
            serverUrl: config.url,
            uploadConfig: config.uploadConfig
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
            const urlAr = []
            files.forEach((item) => {
                urlAr.push({
                    url: item[returnUrl],
                    videoUrl: item.video_path
                })
            })

            self.$parent.dashboard = null
            this.insertImg(urlAr)
        },
        insertImg(urlAr) {
            this.$parent.execCommand(Command.INSERT_VIDEO, urlAr)
        }
    }
}