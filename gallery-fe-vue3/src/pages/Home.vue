<template>
  <div>
    home
    <Button />
    <Checkbox />
    <Password />
    <Divider />
    <InputText />
    <Dialog />

<!-- :customUpload="true" @uploader="myUploader" -->
    <FileUpload
      name="uploadFiles"
      url="/api/file/upload"
      @before-upload="beforeUpload"
      @before-send="beforeSend"
      @upload="onUploaded"
      :withCredentials="true"
      :multiple="true"
      accept="image/*"
      :maxFileSize="1000000">
      <template #empty>
        <p>Drag and drop files to here to upload.</p>
      </template>
    </FileUpload>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useToast } from 'primevue/usetoast'

import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Password from 'primevue/password'
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'
import FileUpload from 'primevue/fileupload'
import { apiFileUpload } from '../api/file.api'

export default defineComponent({
  name: 'Home',
  components: {
    Button,
    Checkbox,
    Password,
    Divider,
    InputText,
    Dialog,
    FileUpload
  },

  setup () {
    const toast = useToast()
    const beforeUpload = (event:any) => {
      console.log('beforeUpload', event)
    }
    const beforeSend = (event:any) => {
      console.log('beforeSend', event)
    }

    const onUploaded = () => {
      toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 })
    }
    const myUploader = async (event:any) => {
      const formData = new FormData()
      formData.append('image', event.files[0])

      await apiFileUpload(formData)
      console.log('myUploader', event)

      return event
    }

    return { onUploaded, myUploader, beforeUpload, beforeSend }
  }
})
</script>

<style lang="scss" scoped>
</style>
