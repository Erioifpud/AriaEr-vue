<template>
  <div class="page">
    <p class="empty-tips" v-if="taskObjs.length === 0">
      There is nothing here...
    </p>
    <template v-for="task in taskObjs">
      <ItemCard :key="task.gid" :task="task"></ItemCard>
    </template>
  </div>
</template>

<script>
import ItemCard from '@/components/ItemCard'
import Aria2 from '@/components/util/Aria2.js'

export default {
  data () {
    return {
      taskObjs: [],
      timerID: -1
    }
  },
  methods: {
    refreshPage () {
      Aria2.multicall(
        this.$http,
        this.$store.getters['Aria2/connObject']
      ).then(r => {
        var tmpList = []
        for (var i = 0; i < 3; i++) {
          var tasks = r.data.result[i]
          if (tasks.length !== 0) {
            tmpList = tmpList.concat(tasks[0])
          }
        }
        this.taskObjs = this.filter ? tmpList.filter(this.filter) : tmpList
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    ItemCard
  },
  props: {
    filter: {
      type: Function,
      default: undefined
    }
  },
  name: 'Page',
  created () {
    this.refreshPage()
  },
  mounted () {
    this.timerID = setInterval(this.refreshPage, 2000)
  },
  destroyed () {
    clearInterval(this.timerID)
  }
}
</script>

<style scoped>
.page {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  top: 25px;
  width: 100%;
  height: calc(100vh - 25px - 60px);
  background-color: #f9f9ff;
  padding: 0 10px;
  overflow-y: auto;
}

.empty-tips {
  position: absolute;
  color: #acadc7;
  font-size: 18px;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}
</style>
