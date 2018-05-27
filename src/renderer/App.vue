<template>
  <div id="app">
    <div class="topbar">

    </div>
    <template v-if="isWaiting">
      <ConnectionPage @confirm="enterMainPage" />
    </template>
    <template v-else>
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <Navigator />
    </template>
  </div>
</template>

<script>
import Navigator from '@/components/NavigatorBar'
import ConnectionPage from '@/components/ConnectionPage'

export default {
  data () {
    return {
      isWaiting: true
    }
  },
  methods: {
    enterMainPage () {
      this.isWaiting = false
    }
  },
  name: 'ariaer-vue',
  components: {
    Navigator,
    ConnectionPage
  },
  created () {
    console.log()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

body { 
  font-family: 'Source Sans Pro', sans-serif; 
  margin: 0;
  background-color: #f9f9ff;
}

#app {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
}

.topbar {
  position: absolute;
  background-color: #fcfcff;
  width: 100vw;
  height: 25px;
  /* border-bottom: solid 1px #bdc3c7; */
  -webkit-app-region: drag;
}

.slide-fade-enter-active {
  transition: all .2s ease;
}

.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
