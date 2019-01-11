import template from './dashboard.html'
import Command from '../../range/command'
export default {
    template,
    data(){
        return {
            url: null,
            title: ''
        }
    },
    methods: {
        createLink(){
            if (!this.url || !this.title) {
                return
            }

            const str =
            ' <div>&nbsp;</div>' +
            '<a href="'+this.url+'" style="display: block;margin: 10px 0;color: #333;' +
            'background: #f4f4f4;' +
            'text-decoration: none!important;' +
            'text-decoration-color: #f4f4f4;' +
            'padding: 5px;' +
            'overflow: hidden;' +
            'border-radius: 8px;' +
            'border: 1px solid #f0f0f0;' +
            'line-height: 28px;">' +
            '<div style=" color: #157EFB;"><i class="icon-link2"></i>网页链接:</div>'+
            this.title+'</a>'  +
            '<div>&nbsp;</div>'

            this.$parent.execCommand(Command.CREATE_LINK, str)
            this.url = null
            this.title = null
        }
    }
}
