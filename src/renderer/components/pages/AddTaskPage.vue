<template>
  <div class="page">
    <div class="add">
      <input 
        type="text" 
        :value="link" 
        @input="link = $event.target.value" 
        placeholder="Link"
      >
      <input 
        type="text" 
        :value="destination" 
        @input="destination = $event.target.value" 
        placeholder="Destination"
      >
      <input 
        type="text" 
        :value="connections" 
        @input="connections = $event.target.value" 
        placeholder="Connections"
      >
      <div class="confirm" @click="handleConfirm">OK</div>
    </div>
  </div>
</template>

<script>
import Aria2 from '@/components/util/Aria2.js'

export default {
  data () {
    return {
      link: '',
      destination: '',
      connections: ''
    }
  },
  methods: {
    handleConfirm () {
      var link = this.link.trim()
      if (link === '') {
        return
      }
      Aria2.send(
        'aria2.addUri',
        [
          [link],
          {
            dir: this.destination,
            'max-connection-per-server': this.connections
          }
        ],
        this.$http,
        this.$store.getters['Aria2/connObject']
      )
      this.$router.push('/all')
    }
  },
  mounted () {
    Aria2.multicall(
      this.$http,
      this.$store.getters['Aria2/connObject']
    ).then(r => {
      var options = r.data.result[4][0]
      this.destination = options.dir
      this.connections = options['max-connection-per-server']
    }).catch(err => {
      console.log(err)
    })
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

.add {
  position: absolute;
  background-color: #fcfcff;
  box-shadow: 0 1px 10px #d9d9ff;
  top: 25%;
  left: 15%;
  width: 70vw;
}

input[type='text'] {
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

::placeholder {
  color: #c9c7c7;
}
</style>
