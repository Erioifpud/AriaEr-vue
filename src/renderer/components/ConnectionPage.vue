<template>
  <div class="page">
    <transition name="slide-fade">
      <div class="setting" v-show="!dialogOpening">
        <!-- <Dropdown /> -->
        <input type="text" :value="addr" @input="updateAddr" placeholder="Address">
        <input type="text" :value="port" @input="updatePort" placeholder="Port">
        <input type="password" :value="token" @input="updateToken" placeholder="Token">
        <input type="text" :value="path" @input="updatePath" placeholder="Path">
        <input type="checkbox" :value="secure" @change="updateSecure" id="secure">
        <AddButton @showDialog="showDialog" />
        <div class="confirm" @click="handleConfirm">OK</div>
      </div>
    </transition>

    <transition name="slide-fade">
      <div class="dialog" v-show="dialogOpening">
        <input type="text" v-model="connName" placeholder="Name">
        <div class="confirm" @click="handleAddConfirm">OK</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddButton from '@/components/AddConnButton'
import Dropdown from '@/components/Dropdown'

export default {
  data () {
    return {
      connName: '',
      dialogOpening: false
    }
  },
  methods: {
    handleAddConfirm () {
      this.dialogOpening = false
      // window.storage.delete('conns')
      if (!window.storage.has('conns')) {
        window.storage.set('conns', [])
      }
      var conns = window.storage.get('conns')
      conns.unshift({
        [this.connName]: this.$store.getters['Aria2/connObject']
      })
      conns.length > 10 && conns.pop()
      window.storage.set('conns', conns)
    },
    showDialog () {
      this.dialogOpening = true
    },
    handleConfirm () {
      this.$emit('confirm')
      this.$store.commit('Aria2/SAVE_CONN')
    },
    updateAddr (e) {
      this.$store.commit('Aria2/SET_ADDR', e.target.value)
    },
    updatePort (e) {
      this.$store.commit('Aria2/SET_PORT', parseInt(e.target.value))
    },
    updateSecure (e) {
      this.$store.commit('Aria2/SET_SECURE', e.target.checked)
    },
    updateToken (e) {
      this.$store.commit('Aria2/SET_TOKEN', e.target.value)
    },
    updatePath (e) {
      this.$store.commit('Aria2/SET_PATH', e.target.value)
    }
  },
  computed: {
    ...mapState('Aria2', [
      'addr',
      'port',
      'secure',
      'token',
      'path'
    ])
  },
  components: {
    AddButton,
    Dropdown
  },
  name: 'ConnectionPage',
  mounted () {
    this.$store.commit('Aria2/INIT_CONN')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

.page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f9f9ff;
}

.setting {
  position: absolute;
  background-color: #fcfcff;
  box-shadow: 0 1px 10px #d9d9ff;
  top: 25%;
  left: 25%;
  width: 50vw;
}

input[type='text'], input[type='password'] {
  font-family: 'Source Sans Pro', sans-serif; 
  box-sizing: border-box;
  outline: none;
  width: 100%;
  height: 30px;
  font-size: 20px;
  background-color: #7d71db;
  border: none;
  display: block;
  caret-color: #ecf0f1;
  padding: 0 10px;
  color: #e4e2fb;
  margin: 15px;
  box-shadow: 0 1px 10px #8d81e6;
}

input[type='checkbox'] {
  margin: 5px 15px;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  display: inline-block;
  cursor: pointer;
  width: 50px;
  height: 22px;
  position: relative;
  border: 1px solid #d3dadf;
  background-color: #d3dadf;
  border-radius: 22px;
  box-shadow: 0 1px 10px #92a0aa;
  transition: background-color 0.4s, border 0.4s, box-shadow 0.4s;
}

input[type='checkbox']:checked {
  border-color: #7d71db;
  background-color: #7d71db;
  box-shadow: 0 1px 10px #8d81e6;
  transition: background-color 0.4s, border 0.4s, box-shadow 0.4s;
}

input[type='checkbox']::before {
  content: '';
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  position: absolute;
  background-color: #ecf0f1;
	transition: left 0.4s;
}

input[type='checkbox']:checked:before {
  left: 28px;
	transition: left 0.4s;
}

input[type='checkbox']::after {
  content: 'http';
  position: absolute;
  font-size: 16px;
  color: #7c7ac0;
  left: 65px;
  text-decoration: underline;
}

input[type='checkbox']:checked:after {
  content: 'https';
}

::placeholder {
  color: #c9c7c7;
}

.confirm {
  /* margin: 5px auto; */
  padding: 0 10px;
  margin: 15px;
  box-sizing: border-box;
  outline: none;
  width: 100%;
  height: 30px;
  background-color: #7d71db;
  text-align: center;
  font-size: 18px;
  user-select: none;
  cursor: pointer;
  color: #e4e2fb;
  transition: background-color 0.4s;
  box-shadow: 0 1px 10px #8d81e6;
}

.confirm:hover {
  background-color: #958ae9;
}

.confirm:active {
  transform: scale(0.98);
}

.dialog {
  position: absolute;
  background-color: #fcfcff;
  box-shadow: 0 1px 10px #d9d9ff;
  top: 40%;
  left: 25%;
  width: 50vw;
}

.slide-fade-enter-active {
  transition: all .6s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
