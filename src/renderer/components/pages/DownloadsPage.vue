<template>
  <Page :filter="filter"/>
</template>

<script>
import Page from '@/components/Page'

export default {
  methods: {
    filter (task) {
      return task.status === 'active' || task.status === 'paused'
    }
  },
  components: {
    Page
  }
}
</script>

<style scoped>

</style>
