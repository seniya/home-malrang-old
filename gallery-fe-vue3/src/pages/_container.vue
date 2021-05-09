<template>
  <Suspense>
    <template #default>
      <router-view></router-view>
    </template>
    <template #fallback>
      <div>Loading ...</div>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Container',

  setup () {
    // eslint-disable-next-line no-unused-vars
    const store = useStore()
    const router = useRouter()

    onMounted(async () => {
      // console.log('component mounted', router, store)
      if (localStorage.getItem('MALRANG_TOKEN') === null) {
        router.push('/login')
      } else {
        const resultCondition = await store.dispatch('moduleAuth/GET_ME', {})
        console.log('resultCondition : ', resultCondition)
      }
    })
  }
})

</script>

<style>
</style>
