<template>
  <div class="flex">
    <div>
      <p style="margin-bottom: 20px">拖动图片到下面的灰色框</p>
      <img src="/favicon.svg" alt="Drop me">

      <div ref="dropZoneRef" style="background:gainsboro;height: 400px;width: 400px;margin-top: 20px">
          <div v-for="(file, index) in filesData" :key="index" style="padding: 20px">
            <p>文件名: {{ file.name }}</p>
            <p>文件大小: {{ file.size }}</p>
            <p>文件类型: {{ file.type }}</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "useDropZone"
}
</script>
<script setup>
import { ref } from 'vue'
import { useDropZone } from '@vueuse/core'

const filesData = ref([])
function onDrop(files) {
  filesData.value = []
  if (files) {
    filesData.value = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }))
  }
}

const dropZoneRef = ref(null)

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

</script>

<style scoped>

</style>