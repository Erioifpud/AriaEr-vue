<template>
  <div 
    class="add-btn"
    @click="emitShowDialog"
  >
    <ion-icon name="add" class="add-icon"></ion-icon>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    emitShowDialog () {
      this.$emit('showDialog')
    }
  },
  name: 'AddButton'
}
</script>

<style scoped>
.add-btn {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin: 15px;
  background-color: #7d71db;
  cursor: pointer;
  box-shadow: 0 1px 10px #8d81e6; 
  transition: background-color 0.2s linear;
  bottom: 40px;
  right: -40px;
}

.add-icon {
  position: absolute;
  font-size: 30px;
  top: 50%;
  left: 50%;
  height: 50%;
  transform: translate(-50%, -50%);
  display: block;
  color: #f9f9ff;
}

.add-btn:hover {
  background-color: #6c5fd3;
  /* transform: rotate(360deg)  translate(-50%, -50%); */
}

.add-btn:active {
  width: 48px;
  height: 48px;
  transform: translate(-1px, -1px);
}
</style>
