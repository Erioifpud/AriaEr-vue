<template>
  <div class="dropdown" @click="toggle()">
    <ul class="menu"></ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showDropdown: false,
      placeholder: 'connection...'
    }
  },
  methods: {
    toggle () {
      this.showDropdown = !this.showDropdown
    }
  },
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  name: 'Dropdown'
}
</script>

<style>
.dropdown {
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
</style>
