<template>
  <div
    class="flex items-center justify-center h-screen container mx-auto w-auto gap-10"
  >
    <PanelControl
      v-if="!isMarsPlanetVisible"
      @show-mars-planet="showMarsPlanet"
    />
    <MarsPlanet
      v-if="isMarsPlanetVisible"
      @back-to-panel="hideMarsPlanet"
      :instructions="commands"
    />
  </div>
</template>

<script>
import MarsPlanet from "./components/MarsPlanet.vue";
import PanelControl from "./components/PanelControl.vue";

export default {
  name: "App",
  components: {
    MarsPlanet,
    PanelControl,
  },
  data() {
    return {
      showingMarsPlanet: false,
      commands: [],
    };
  },
  computed: {
    isMarsPlanetVisible() {
      return this.showingMarsPlanet;
    },
  },
  methods: {
    showMarsPlanet(commands) {
      this.commands = commands;
      this.showingMarsPlanet = true;
    },
    hideMarsPlanet() {
      this.showingMarsPlanet = false;
    },
  },
};
</script>

<style>
#app {
  font-family: "Space Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #0a0a0a;
}
</style>
