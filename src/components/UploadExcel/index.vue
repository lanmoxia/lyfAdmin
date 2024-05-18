<template>
  <!-- 账号列表导入组件 -->
  <el-dialog :title="title" :model-value="modelValue" width="30%" align-center draggable @close="onClose">
    <el-upload ref="uploadRef" :limit="1" accept=".xlsx, .xls" :show-file-list="true" :http-request="requestUpload"
      :on-success="handleFileSuccess" :before-upload="handleFileBefore" drag>
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip text-center">
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"
            @click="importTemplate">下载模板
          </el-link>
        </div>
      </template>
    </el-upload>
  </el-dialog>
</template>

<script setup>
import {ref } from 'vue'
import {api} from '@/api'
import {defineEmits } from 'vue'
import {ElMessage } from 'element-plus'



const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: '文件上传'
  }
})

const uploadRef = ref(null)

const emits = defineEmits(['update:modelValue', 'onSuccess', 'onDownTemplate'])

/**文件上传之前 */
const handleFileBefore = async (file) => {
  console.log('上传前')
  const isExcel = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  if (!isExcel) {
    ElMessage.error('上传文件只能是 xls 或 xlsx 格式!')
    return false
  }

  const isLt2M = file.size / 1024 / 1024 < 2; // 文件大小限制为2MB
  if (!isLt2M) {
    ElMessage.error('上传文件大小不能超过 2MB!')
    return false
  }

  return true // 当校验通过时，返回 true
}

/** 覆盖默认上传行为 */
const requestUpload = (options) => {
  const { onSuccess, onError, file } = options
  // 创建 FormData 对象并添加文件
  // let formData = new FormData()
  // formData.append('file', file) // 'file' 后端接口指定的字段名
  onSuccess(file)
  // 这里上传服务器用户模板 已经上传完毕
  // 使用封装的上传接口发起上传请求
  // const [err,res] = api.uploadFile(formData)
  // if(!err){
  //   // 上传成功
  //   onSuccess(res)
  // } else {
  //   // 上传失败
  //   onError(error)
  //   ElMessage.error('文件上传失败')
  // }
}

/** 文件上传成功处理 */
const handleFileSuccess = (response, file) => {
  emits('onSuccess', file)
  ElMessage.success("导入成功") 
  onClose()
 // // 这里上传服务器用户模板 已经上传完毕
//  // 由于response可能是一个数组，其中第一个元素是错误信息（如果有的话），第二个元素是实际的响应数据
//   // 检查response是否为数组，并且长度大于1，然后取第二个元素作为实际的响应数据
//   const res = Array.isArray(response) && response.length > 1 ? response[1] : response;
//   if (res && res.message) {
//     emits('onSuccess', response,file,res)
//     ElMessage.success(res.message) // 显示成功信息
//     onClose()
//   }
  // 清空上传文件列表 (清空下次才能上传)
  if (uploadRef.value) {
    uploadRef.value.clearFiles()
  }
}

/**下载模板 */
const importTemplate = () => {
  emits('onDownTemplate')
}

/**
 * 关闭
 */
const onClose = () => {
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped></style>
