<template>
  <div class="tag" @hover="handleHover()" :style="{ 'background-color': `${color}` }">
    <label class="text">{{ text }}</label>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    handleHover () {
      console.log(123)
    }
  },
  props: {
    text: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#7d71db'
    }
  },
  name: 'Tag'
}
</script>

<style scoped>
.tag {
  position: relative;
  display: flex;
  box-sizing: content-box;
  width: 100px;
  border-radius: 100px;
  color: #f9f9ff;
  transition: box-shadow 0.2s;
  user-select: none;
  cursor: pointer;
  margin-bottom: 10px;
}

.tag:hover {
  box-shadow: 0 1px 10px #8d81e6; 
}
/* change icon when hovered */
.text {
  margin: auto;
  font-size: 16px;
  cursor: pointer;
}
</style>
