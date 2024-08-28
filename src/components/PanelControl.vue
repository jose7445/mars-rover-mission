<template>
  <div class="flex flex-col gap-5">
    <!-- Instructions -->
    <div
      class="p-6 bg-gray-900 text-white max-w-4xl mx-auto rounded-lg shadow-lg"
    >
      <div class="flex flex-col items-center justify-center">
        <img
          src="../assets/images/housfy.png"
          alt="Housfy Logo"
          class="my-4"
          style="width: 200px; height: auto"
        />
        <h1
          class="text-5xl mb-6 text-[#7FFF7F] font-extrabold text-center w-full"
        >
          Mars Rover Mission
        </h1>
      </div>

      <div class="mb-8 text-left">
        <h2 class="text-3xl text-[#7FFF7F] font-bold mb-4">Task</h2>
        <p class="text-lg leading-relaxed">
          You’re part of the team that explores Mars by sending remotely
          controlled vehicles to the surface of the planet. Your task is to
          develop software that translates commands sent from Earth into
          instructions that the rover can understand.
        </p>
      </div>

      <div class="mb-8 text-left">
        <h2 class="text-3xl text-[#7FFF7F] font-bold mb-4">Instructions</h2>
        <ul class="list-disc list-inside space-y-2">
          <li>
            Provide the initial starting point (x, y) of a rover and the
            direction (N, S, E, W) it is facing.
          </li>
          <li>
            The rover receives a sequence of commands (e.g., “FFRRFFFRL”).
          </li>
          <li>The rover can move forward (F), left (L), and right (R).</li>
          <li>
            If the rover encounters an obstacle during its sequence of commands,
            it will move up to the last possible point, abort the sequence, and
            report the obstacle.
          </li>
        </ul>
      </div>
    </div>

    <!-- Control Panel -->
    <div class="flex gap-10">
      <div
        class="p-6 bg-gray-900 text-white max-w-4xl mx-auto rounded-lg shadow-lg w-full h-min flex justify-between items-center"
      >
        <div>
          <label for="positionX">Position X: </label>
          <input
            type="number"
            v-model="positionX"
            id="positionX"
            name="positionX"
            min="0"
            max="10"
            class="px-1 font-bold border-4 rounded-2xl border-[#7FFF7F] bg-[#0a0a0a] text-[#7FFF7F] focus:outline-none focus:ring-2 focus:[#7FFF7F] focus:border-transparent"
          />

          <label for="positionY" class="ml-4">Position Y: </label>
          <input
            type="number"
            id="positionY"
            v-model="positionY"
            name="positionY"
            min="0"
            max="10"
            class="px-1 font-bold border-4 rounded-2xl border-[#7FFF7F] bg-[#0a0a0a] text-[#7FFF7F] focus:outline-none focus:ring-2 focus:[#7FFF7F] focus:border-transparent"
          />
        </div>
        <div class="flex gap-5">
          <div
            v-for="dir in directions"
            :key="dir"
            :class="{
              'bg-[#7FFF7F] text-[#0a0a0a]': direction === dir,
              'text-[#7FFF7F]': direction !== dir,
            }"
            class="py-2 px-4 font-bold border-4 border-[#7FFF7F] w-full cursor-pointer hover:bg-[#7FFF7F] hover:text-[#0a0a0a]"
            @click="setDirection(dir)"
          >
            {{ dir }}
          </div>
        </div>
      </div>
      <button
        class="font-bold border-4 rounded-2xl border-[#7FFF7F] w-full basis-1/4 text-[#7FFF7F] hover:bg-[#7FFF7F] hover:text-[#0a0a0a] cursor-pointer"
        @click="sendCommands"
      >
        Play
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      positionX: "",
      positionY: "",
      direction: "",
      directions: ["N", "S", "E", "W"],
      commands: [],
    };
  },

  methods: {
    setDirection(direction) {
      this.direction = direction;
    },

    sendCommands() {
      const { positionX, positionY, direction } = this;

      // Recoger los campos de datos que faltan
      const missingData = [
        { name: "Position X", value: positionX },
        { name: "Position Y", value: positionY },
        { name: "Direction", value: direction },
      ]
        .filter((field) => field.value === "") //Filtrar los campos con valores no vacíos
        .map((field) => field.name); // Extraer los nombres de los campos que faltan

      if (missingData.length > 0) {
        console.log(this.commands);
        alert(`Missing data: ${missingData.join(", ")}`);
      } else {
        this.commands.push({ positionX, positionY, direction });
        this.$emit("show-mars-planet", this.commands);
        this.commands = [];
      }
    },
  },
};
</script>
