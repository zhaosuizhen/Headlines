import navList from './home/navList'
import Header from './home/header'
import Bread from './bread/bread-crumb'
import PublishImg from './publishImg/publishImg'
import ChoiceImg from './publishImg/choiceImg'

import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install (Vue) {
    Vue.component('navList', navList)
    Vue.component('Header', Header)
    Vue.component('Bread', Bread)
    Vue.component('PublishImg', PublishImg)
    Vue.component('quill-editor', quillEditor)
    Vue.component('ChoiceImg', ChoiceImg)
  }
}
