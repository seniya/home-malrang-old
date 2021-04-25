<template>
  <div>
    home
    <Button />
    <Checkbox />
    <Password />
    <Divider />
    <InputText />
    <Dialog />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Password from 'primevue/password'
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'

export default defineComponent({
  name: 'Home',
  components: {
    Button,
    Checkbox,
    Password,
    Divider,
    InputText,
    Dialog
  },

  setup () {
    const state = reactive({
      name: '',
      email: '',
      password: '',
      accept: null
    })
    const rules = {
      name: { required },
      email: { required, email },
      password: { required },
      accept: { required }
    }

    const submitted = ref(false)
    const countries = ref()
    const showMessage = ref(false)
    const date = ref()
    const country = ref()

    const v$ = useVuelidate(rules, state)

    const handleSubmit = (isFormValid: any) => {
      submitted.value = true

      if (!isFormValid) {
        return
      }

      toggleDialog()
    }
    const toggleDialog = () => {
      showMessage.value = !showMessage.value

      if (!showMessage.value) {
        resetForm()
      }
    }
    const resetForm = () => {
      state.name = ''
      state.email = ''
      state.password = ''
      state.accept = null
      submitted.value = false
    }

    return { state, v$, handleSubmit, toggleDialog, submitted, countries, showMessage, date, country }
  }
})
</script>

<style lang="scss" scoped>
</style>
