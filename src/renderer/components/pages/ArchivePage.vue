<template>
  <Page :filter="filter"/>
</template>

<script>
import Page from '@/components/Page'

export default {
  methods: {
    filter (task) {
      return task.status === 'complete'
    }
  },
  components: {
    Page
  }
}
</script>

<style scoped>

</style>
