<template>
  <div class="card">
    <div class="header">
      <p class="title">{{ fileName }}</p>
    </div>
    <div class="content">
      <ActionButton :gid="task.gid" :type="task.status" />
      <!-- <div class="down-speed">
        {{ task.downloadSpeed }}
      </div> -->
      <div class="tag-area">
        <Tag :text="downloadSpeed" />
        <Tag :text="timeLeft + 's'" />
      </div>
    </div>
    <div class="footer">
      <vue-simple-progress
        class="progress"
        size="small"
        :val="currentProgress"
        bg-color="#fcfcff"
        bar-color="#7d71db"
      >
      </vue-simple-progress>
    </div>
  </div>
</template>

<script>
import ActionButton from '@/components/ActionButton'
import Tag from '@/components/TextTag'
import VueSimpleProgress from 'vue-simple-progress'
var filesize = require('filesize')

export default {
  data () {
    return {

    }
  },
  computed: {
    fileName () {
      var s = this.task.files[0].path
      return s.substring(s.lastIndexOf('/') + 1, s.length)
    },
    currentProgress () {
      var totalLen = parseInt(this.task.totalLength)
      var completedLen = parseInt(this.task.completedLength)
      return completedLen / totalLen * 100
    },
    downloadSpeed () {
      return `${filesize(parseInt(this.task.downloadSpeed))}/s`
    },
    timeLeft () {
      var totalLen = parseInt(this.task.totalLength)
      var speed = parseInt(this.task.downloadSpeed)
      return parseInt(totalLen / speed)
    }
  },
  components: {
    VueSimpleProgress,
    ActionButton,
    Tag
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  name: 'ItemCard'
}
</script>

<style scoped>
.card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #fcfcff;
  width: 100%;
  height: 130px;
  margin: 15px 0;
  box-shadow: 0 1px 10px #e0e0ff;
}

.header {
  position: relative;
  height: 25px;
  /* background-color: red; */
}

.content {
  position: relative;
  height: 90px;
  /* background-color: green; */
}

.tag-area {
  padding: 15px;
  margin-left: 80px;
}

.down-speed {
  position: absolute;
  margin: 15px 15px 15px 85px;
  color: #7d71db;
  width: 50px;
  height: 50px;
  font-size: 18px;
  user-select: none;
}

.footer {
  position: relative;
  height: 15px;
  /* background-color: gold; */
  overflow: hidden;
}

.right {
  float: right;
}

.left {
  float: left;
}

.title {
  font-size: 18px;
  margin: 0;
  padding: 2px 5px;
  color: #7d71db;
  overflow: hidden;
  /* 7266ca */
}

.progress {
  transform: translateY(1px);
  position: relative;
}
</style>
