<template>
  <div 
    class="status"
    @mouseover="handleMouseOver()"
    @mouseout="handleMouseOut()"
    @click.right="forceRemoveAction()"
    @click="handleClick()"
  >
    <!-- <transition name="fade"> -->
      <ion-icon v-show="!hover" :name="getIcon()" class="status-icon"></ion-icon>
    <!-- </transition> -->
    <!-- <transition name="slide-fade"> -->
      <ion-icon v-show="hover && !forceRemove" :name="getNextIcon()" class="status-icon"></ion-icon>
      <!-- <ion-icon 
        @keypress.ctrl="forceRemove = true" 
        @keyup.ctrl="forceRemove = false" 
        v-show="hover && forceRemove" 
        name="trash" 
        class="status-icon"
      ></ion-icon> -->
    <!-- </transition> -->
  </div>
</template>

<script>
import Aria2 from '@/components/util/Aria2.js'

export default {
  data () {
    return {
      hover: false,
      forceRemove: false
    }
  },
  methods: {
    handleClick () {
      this.doTaskAction(this.type)
    },
    forceRemoveAction () {
      Aria2.send('aria2.remove',
        [this.gid],
        this.$http,
        this.$store.getters['Aria2/connObject']
      )
    },
    doTaskAction (type) {
      if (this.forceRemove) {
        this.forceRemoveAction()
        return
      }
      var methodName = 'aria2.'
      if (this.type === 'paused') {
        methodName += 'unpause'
      } else if (this.type === 'error') {
        methodName += 'removeDownloadResult'
      } else if (this.type === 'complete') {
        methodName += 'removeDownloadResult'
      } else if (this.type === 'active') {
        methodName += 'pause'
      } else if (this.type === 'removed') {
        methodName += 'removeDownloadResult'
      } else {
        return
      }
      Aria2.send(methodName,
        [this.gid],
        this.$http,
        this.$store.getters['Aria2/connObject']
      )
    },
    handleMouseOver () {
      this.hover = true
      // var self = this
      // ;(function () {
      //   setTimeout(self.forceRemove = true, 20000)
      // })()
      // setTimeout(() => { this.forceRemove = true }, 2000)
    },
    handleMouseOut () {
      this.hover = false
      this.forceRemove = false
    },
    getIcon () {
      switch (this.type) {
        case 'waiting':
          return 'logo-ionic'
        case 'paused':
          return 'pause'
        case 'error':
          return 'close'
        case 'complete':
          return 'checkmark'
        case 'removed':
          return 'trash'
        case 'active':
          return 'download'
        default:
          return 'bug'
      }
    },
    getNextIcon () {
      switch (this.type) {
        case 'waiting':
          return 'logo-ionic'
        case 'paused':
          return 'play'
        case 'error':
          return 'remove-circle-outline'
        case 'complete':
          return 'trash'
        case 'removed':
          return 'remove-circle-outline'
        case 'active':
          return 'pause'
        default:
          return 'bug'
      }
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    gid: {
      type: String,
      required: true
    }
  },
  name: 'ActionButton'
}
</script>

<style scoped>
.status {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  margin: 15px;
  background-color: #7d71db;
  cursor: pointer;
  box-shadow: 0 1px 10px #8d81e6; 
  transition: background-color 0.2s linear;
}

.status-icon {
  position: absolute;
  font-size: 30px;
  top: 50%;
  left: 50%;
  height: 50%;
  transform: translate(-50%, -50%);
  display: block;
  color: #f9f9ff;
}

.status:hover {
  background-color: #6c5fd3;
  /* transform: rotate(360deg)  translate(-50%, -50%); */
}

.status:active {
  width: 58px;
  height: 58px;
  top: 1px;
  left: 1px;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
