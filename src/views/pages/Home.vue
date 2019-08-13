<template>
  <HelloWorld></HelloWorld>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

const HelloWorld = () => import('@/views/pages/HelloWorld.vue')

@Component({
  name: 'Home',
  components: {
    HelloWorld
  }
})
export default class App extends Vue {}
</script>
//@TODO: https://www.cnblogs.com/Answer1215/p/9545719.html
