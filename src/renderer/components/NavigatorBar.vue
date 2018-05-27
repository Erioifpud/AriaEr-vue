<template>
  <nav>
    <span 
      v-for="obj in items" 
      :key="obj.text" 
      @click="clickTab(obj.text)"
      :class='{"selected": obj.selected}'
    >
      <ion-icon :name="obj.icon" :id="obj.text"></ion-icon>
      
    </span>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {text: 'all', icon: 'list', selected: true},
        {text: 'download', icon: 'download', selected: false},
        {text: 'archive', icon: 'archive', selected: false},
        {text: 'trash', icon: 'trash', selected: false},
        {text: 'add', icon: 'add-circle', selected: false},
        {text: 'setting', icon: 'settings', selected: false}
      ]
    }
  },
  methods: {
    clickTab (text) {
      this.selectTab(text)
      this.$router.push({ name: `${text}-page` })
    },
    selectTab (text) {
      this.items.forEach(element => {
        element.selected = element.text === text
      })
    }
  },
  name: 'Navigator',
  created () {
    this.$router.beforeEach((to, from, next) => {
      var name = to.name
      this.selectTab(name.substring(0, name.indexOf('-')))
      next()
    })
  }
}
</script>

<style scoped>
nav {
  position: absolute;
  background-color: #fcfcff;
  width: 100vw;
  height: 60px;
  top: calc(100vh - 60px);
  display: flex;
  box-shadow: 0 -2px 5px #e7e7ff;
}

span {
  margin: auto;
  /* position: relative; */
}

span ion-icon {
  /* transform: translateX(25%); */
  font-size: 32px;
  /* margin: auto; */
  width: auto !important;
  align-items: center;  
  color: #acadc7;
  user-select: none;
  cursor: pointer;
}

span p {
  position: absolute;
  margin: auto;
  text-align: center;
}

.selected * {
  color: #7d71db;
}

/* .selected #all {
  color: #1abc9c;
}

.selected #download {
  color: #3498db;
}

.selected #add {
  color: #78e08f;
}

.selected #archive {
  color: #f39c12;
}

.selected #trash {
  color: #e74c3c;
}

.selected #setting {
  color: #9b59b6;
} */

/* .selected::before {
  content: '';
  position: absolute;
  top: 0;
  border-width: 10px 10px 0;
  border-style: solid;
  border-color: #f9f9ff transparent  transparent;
  transform: translateX(30%);
} */
</style>
