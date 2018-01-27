<template>
  <div class="m-v-20">
    <mavon-editor
      @change="changeHandle"
      @save="saveHandle"
      v-model="article.codeText"
      :style="{height: editorHeight + 'px'}"
      :toolbars="{
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        undo: true, // 上一步
        save: true, // 保存（触发events中的save事件）
        aligncenter: true, // 居中
        subfield: true, // 单双栏模式
        preview: true // 预览
      }"
    />

    <!-- submit dialog -->
    <vue-dialog title="保存" :show.sync="showSubmitDialog">
      <div style="width: 500px;">
        <!-- 标题 -->
        <vue-input :fullWidth="true" :value.sync="article.title" label="文章标题" placeholder="请输入文章标题" />
        <!-- 分类 -->
        <div class="m-t-18" flex="dir:left cross:center">
          <span class="m-r-4">分类：</span> 
          <el-select v-model="article.category" filterable allow-create size="small" placeholder="请选择分类">
            <el-option
              v-for="item in remoteData.categories"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
        <!-- 标签 -->
        <div class="m-t-18" flex="dir:left cross:center">
          <span class="m-r-4">标签：</span> 
          <el-select v-model="article.tags" multiple filterable allow-create size="small" placeholder="请选择标签" flex-box="1">
            <el-option
              v-for="item in remoteData.tags"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
        <!-- 按钮 -->
        <div class="m-t-18 a-r">
          <el-button type="primary" size="small" @click="checkArticle">提交</el-button>
          <el-button size="small" @click="showSubmitDialog = false">取消</el-button>
        </div>
      </div>
    </vue-dialog>
  </div>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import {saveArticle, getRemoteTagsCate, getArticleById} from '@/actions'
  import Utils from '@/toolkits/Utils'
  import Toast from '@/toolkits/Toast'
  import VueDialog from '@/components/common/VueDialog'
  import VueInput from '@/components/common/form/VueInput'
  import {Select, Option, Button} from 'element-ui'

  export default {
    data () {
      return {
        article: {
          title: '',
          codeText: '',
          tags: [],
          category: []
        },
        remoteData: {
          categories: [],
          tags: []
        },
        showSubmitDialog: false,
        editorHeight: document.documentElement.clientHeight - 40
      }
    },
    methods: {
      saveTemp (content) {
        localStorage.setItem('article_add', content)
      },
      changeHandle (text, code) {
        this.article.codeText = text
        this.saveTemp(text)
      },
      saveHandle () {
        if (Utils.string.isEmpty(this.article.codeText)) {
          Toast.show('请输入文章内容')
          return false
        }
        this.showSubmitDialog = true
      },
      async saveRemote () {
        let result = await saveArticle(this.article)
        if (result) {
          this.article.id = result.id
          this.showSubmitDialog = false
          Toast.show('保存成功')
        }
      },
      checkArticle () {
        if (Utils.string.isEmpty(this.article.codeText)) {
          Toast.show('请输入文章内容')
          return false
        } else if (Utils.string.isEmpty(this.article.title)) {
          Toast.show('请输入正确标题')
          return false
        } else if (this.article.tags.length === 0) {
          Toast.show('请至少选择一个标签')
          return false
        } else if (!this.article.category) {
          Toast.show('请选择一个分类')
          return false
        } else this.saveRemote()
      },
      addTag (tag) {
        const {tags} = this.article

        if (tag && tags.length < 3) {
          let addTag = null

          if (typeof tag === 'string') {
            tag = tag.toLowerCase()
            // 同样的标签
            for (let item of this.remoteData.tags) {
              if (tag === item.name) {
                addTag = item
                break
              }
            }
            // 新增标签
            if (!addTag) addTag = {name: tag, id: -1}
          } else if (Object.prototype.toString.call(tag) === '[object Object]' && tag.name && tag.id !== undefined) {
            addTag = tag
          }
          // 检查是否已存在，没有就增加
          if (tags.some(item => item.name === addTag.name)) Toast.show('已存在相应的标签')
          else tags.push(addTag)
        }
      },
      selectCategory (category) {
        if (category) {
          if (typeof category === 'string') this.article.category = {name: category, id: -1}
          else if (Utils.object.isObject(category)) this.article.category = category
        }
      },
      async fillRemoteData () {
        const {id} = this.$route.params
        if (id && /[0-9]+/.test(id)) {
          let article = await getArticleById(+id, 1)

          if (article.id) {
            let {id, title, category, tags, codeText} = article
            this.article.id = id
            this.article.category = category
            this.article.title = title
            this.article.tags = tags
            this.article.codeText = codeText
          }
        }

        let remoteData = await getRemoteTagsCate()

        if (remoteData) {
          remoteData.categories && (this.remoteData.categories = remoteData.categories)
          remoteData.tags && (this.remoteData.tags = remoteData.tags)
        }
      }
    },
    mounted () {
      let temp = localStorage.getItem('article_add')
      if (temp) this.article.codeText = temp
      this.fillRemoteData()
    },
    components: {mavonEditor, VueDialog, VueInput, 'el-select': Select, 'el-option': Option, 'el-button': Button}
  }
</script>


<style lang="scss" scoped>
  .tag-item {
    display: inline-block;
    margin: 0 4px 0 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 2px 8px;
    cursor: pointer;
  }
</style>
