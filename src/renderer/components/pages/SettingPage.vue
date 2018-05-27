<template>
  <div class="page">
    <input type="text" v-model="searchText" class="search" placeholder="Search...">
    <div 
      class="item" 
      v-for="[key, val] in filteredOptions" 
      :key="key"
    >
      <p class="key">
        {{ key }}
      </p>
      <p class="val">
        {{ val }}
      </p>
    </div>
  </div>
</template>

<script>
import Aria2 from '@/components/util/Aria2.js'

export default {
  data () {
    return {
      options: [],
      searchText: ''
    }
  },
  computed: {
    filteredOptions () {
      return this.options.filter(e => e[0].includes(this.searchText))
    }
  },
  mounted () {
    Aria2.multicall(
      this.$http,
      this.$store.getters['Aria2/connObject']
    ).then(r => {
      var options = r.data.result[4][0]
      this.options = Object.entries(options)
      // this.options = options
      // console.log(this.options)
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
  color: #7d71db;
}

.search {
  position: relative;
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
  margin: 15px 0;
  box-shadow: 0 1px 10px #8d81e6;
}

::placeholder {
  color: #c9c7c7;
}

.item:nth-child(1) {
  border-top: solid 1px #e0e0ff;
}

.item {
  margin: 0;
  border-bottom: solid 1px #e0e0ff;
}

.key, .val {
  margin: 5px;
}

.key {
  color: #6e5cf1;
  font-weight: bold;
}
</style>
