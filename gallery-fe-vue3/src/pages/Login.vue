<template>
  <div class="form-demo">
    <Dialog :visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
      <div class="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
        <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: 'var(--green-500)' }"></i>
        <h5>로그인 완료!</h5>
        <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
            Your account is loggined under name <b>{{state.email}}</b>
        </p>
      </div>
      <template #footer>
        <div class="p-d-flex p-jc-center">
            <Button label="OK" @click="toggleDialog" class="p-button-text" />
        </div>
      </template>
    </Dialog>

    <div class="p-d-flex p-jc-center">
      <div class="card">
        <h5 class="p-text-center">로그인</h5>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="p-field">
              <div class="p-float-label p-input-icon-right">
                  <i class="pi pi-envelope" />
                  <InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"/>
                  <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Email*</label>
              </div>
              <span v-if="v$.email.$error && submitted">
                  <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                  <small class="p-error">{{error.$message}}</small>
                  </span>
              </span>
              <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{v$.email.required.$message.replace('Value', 'Email')}}</small>
          </div>
          <div class="p-field">
              <div class="p-float-label">
                  <Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask>
                      <template #header>
                          <h6>Pick a password</h6>
                      </template>
                      <template #footer="sp">
                          {{sp.level}}
                          <Divider />
                          <p class="p-mt-2">Suggestions</p>
                          <ul class="p-pl-2 p-ml-2 p-mt-0" style="line-height: 1.5">
                              <li>At least one lowercase</li>
                              <li>At least one uppercase</li>
                              <li>At least one numeric</li>
                              <li>Minimum 8 characters</li>
                          </ul>
                      </template>
                  </Password>
                  <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Password*</label>
              </div>
              <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
          </div>

          <div class="p-field-checkbox">
            <Checkbox id="accept" name="accept" value="Accept" v-model="v$.accept.$model" :class="{'p-invalid':v$.accept.$invalid && submitted}" />
            <label for="accept" :class="{'p-error': v$.accept.$invalid && submitted}">나다.</label>
          </div>
          <Button type="submit" label="Submit" class="p-mt-2" />
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Password from 'primevue/password'
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'

export default defineComponent({
  name: 'Login',
  components: {
    Button,
    Checkbox,
    Password,
    Divider,
    InputText,
    Dialog
  },

  setup () {
    const store = useStore()
    const router = useRouter()

    const state = reactive({
      email: '',
      password: '',
      accept: null
    })
    const rules = {
      email: { required, email },
      password: { required },
      accept: { required }
    }

    const submitted = ref(false)
    const showMessage = ref(false)
    const v$ = useVuelidate(rules, state)

    const handleSubmit = async (isFormValid: any) => {
      submitted.value = true
      if (!isFormValid) {
        return
      }
      const payload = {
        email: state.email,
        password: state.password
      }
      try {
        // eslint-disable-next-line no-unused-vars
        const resultCondition1 = await store.dispatch('moduleAuth/SIGN_IN', payload)
        const resultCondition = await store.dispatch('moduleAuth/GET_ME', {})
        console.log('resultCondition : ', resultCondition)
        if (resultCondition) {
          toggleDialog()
        }
      } catch (error) {
        alert('Login error')
      }
    }
    const toggleDialog = () => {
      showMessage.value = !showMessage.value
      if (!showMessage.value) {
        moveToHome()
      }
    }
    const moveToHome = () => {
      console.log('moveToHome : ')
      router.push('/home')
    }

    return { state, v$, handleSubmit, toggleDialog, submitted, showMessage, store }
  }
})
</script>

<style lang="scss" scoped>
  .form-demo {
    .card {
      min-width: 450px;
      form {
        margin-top: 2rem;
      }
      .p-field {
        margin-bottom: 1.5rem;
      }
    }

    @media screen and (max-width: 960px) {
      .card {
        width: 80%;
      }
    }
  }
</style>
