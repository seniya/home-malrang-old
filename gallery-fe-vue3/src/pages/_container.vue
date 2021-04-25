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
    const store = useStore()
    const router = useRouter()

    onMounted(() => {
      console.log('component mounted', router, store)
      if (localStorage.getItem('MALRANG_TOKEN') === null) {
        router.push('/login')
      }
    })
  }
})

</script>

<style>
</style>
