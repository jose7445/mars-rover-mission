<template>
  <div class="flex items-center flex-col gap-8">
    <!--Table-->
    <button
      class="font-bold border-[#7FFF7F] w-full basis-1/3 text-[#7FFF7F] hover:text-white"
      @click="backToPanel"
    >
      Back to instructions
    </button>
    <div
      class="grid"
      :style="{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        width: `${size}px`,
        height: `${size}px`,
      }"
    >
      <div
        v-for="(square, index) in squares"
        :key="index"
        class="relative border-2 border-[#7FFF7F] bg-[#0a0a0a]"
        :style="{
          gridColumn: square.x + 1,
          gridRow: square.y + 1,
        }"
      >
        <!-- Obstacles -->
        <img
          v-if="isObstacle(square)"
          src="@/assets/images/obstacle.png"
          class="w-6 h-6 absolute inset-0 m-auto"
          alt="Obstacle"
        />

        <!-- Nave -->
        <img
          v-if="isNavePosition(square)"
          src="../assets/images/nave.png"
          class="w-12 h-12 absolute inset-0 m-auto"
          :style="{ transform: `rotate(${naveDirection * 90}deg)` }"
          alt="Nave"
        />
      </div>
    </div>

    <!--Commands-->
    <div class="flex gap-4">
      <input
        v-model="command"
        class="p-2 font-bold border-4 rounded-2xl border-[#7FFF7F] w-full bg-[#0a0a0a] text-[#7FFF7F] focus:outline-none focus:ring-2 focus:[#7FFF7F] focus:border-transparent"
      />
      <button
        @click="executeCommand"
        class="p-2 font-bold border-4 rounded-2xl border-[#7FFF7F] w-full basis-1/3 text-[#7FFF7F] hover:bg-[#7FFF7F] hover:text-[#0a0a0a]"
      >
        Commands
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["instructions"],

  data() {
    return {
      size: 300, // Tamaño del tablero en píxeles
      gridSize: 6, // Número de filas/columnas
      navePosition: { x: 0, y: 0 }, // Posición inicial de la nave
      naveDirection: 0, // Dirección inicial de la nave (0: arriba, 1: derecha, 2: abajo, 3: izquierda)
      squares: [], // Array de coordenadas de cada cuadrado
      command: "", // Comando ingresado por el usuario
      obstacles: [], // Array de coordenadas de los obstáculos
    };
  },

  methods: {
    updateGrid() {
      this.squares = Array.from(
        { length: this.gridSize * this.gridSize },
        (_, i) => {
          const x = i % this.gridSize;
          const y = Math.floor(i / this.gridSize);
          return { x, y };
        }
      );
    },

    generateObstacles() {
      const numberOfObstacles = Math.floor(this.squares.length * 0.1);

      this.obstacles = [];
      while (this.obstacles.length < numberOfObstacles) {
        const randomSquare =
          this.squares[Math.floor(Math.random() * this.squares.length)];
        if (
          !this.isSamePosition(randomSquare, this.navePosition) &&
          !this.isObstacle(randomSquare)
        ) {
          this.obstacles.push(randomSquare);
        }
      }
    },

    isObstacle(position) {
      return this.obstacles.some((obstacle) =>
        this.isSamePosition(obstacle, position)
      );
    },

    isNavePosition(position) {
      return this.isSamePosition(this.navePosition, position);
    },

    isSamePosition(pos1, pos2) {
      return pos1.x === pos2.x && pos1.y === pos2.y;
    },

    moveNave(direction) {
      let newPosition = { ...this.navePosition };

      switch (direction) {
        case "F":
          switch (this.naveDirection) {
            case 0: // Arriba
              newPosition.y -= 1;
              break;
            case 1: // Derecha
              newPosition.x += 1;
              break;
            case 2: // Abajo
              newPosition.y += 1;
              break;
            case 3: // Izquierda
              newPosition.x -= 1;
              break;
          }
          break;

        case "R":
          this.naveDirection = (this.naveDirection + 1) % 4;
          break;

        case "L":
          this.naveDirection = (this.naveDirection + 3) % 4;
          break;
      }

      if (this.isWithinBounds(newPosition) && !this.isObstacle(newPosition)) {
        this.navePosition = newPosition;
      } else if (direction === "F") {
        alert(
          this.isObstacle(newPosition)
            ? "Obstacle detected! Motion canceled."
            : "You have reached the edge of the map! Movement canceled."
        );
      }
    },

    isWithinBounds(position) {
      return (
        position.x >= 0 &&
        position.x < this.gridSize &&
        position.y >= 0 &&
        position.y < this.gridSize
      );
    },

    executeCommand() {
      const commands = this.command.trim().toUpperCase().split("");
      for (const cmd of commands) {
        if (["F", "R", "L"].includes(cmd)) {
          this.moveNave(cmd);
        } else {
          alert('Invalid command. Use: "F", "R" o "L".');
          break;
        }
      }
      this.command = ""; // Limpiar el input después de ejecutar
    },

    backToPanel() {
      this.$emit("back-to-panel");
    },

    initializeNavePosition() {
      const directionMapping = {
        N: 0, // Norte = Arriba
        E: 1, // Este = Derecha
        S: 2, // Sur = Abajo
        W: 3, // Oeste = Izquierda
      };

      // Establece la posición del barco y dirección inicial
      const initialPosition = {
        x: this.instructions[0].positionX,
        y: this.instructions[0].positionY,
      };
      const initialDirection = directionMapping[this.instructions[0].direction];

      if (
        this.isWithinBounds(initialPosition) &&
        !this.isObstacle(initialPosition)
      ) {
        this.navePosition = initialPosition;
        this.naveDirection = initialDirection;
        this.generateObstacles(); // Genera los obstáculos después de colocar la nave
      } else {
        alert("The initial position of the boat is not valid.");
      }
    },
  },

  mounted() {
    this.updateGrid();
    this.initializeNavePosition(); // Inicializa la posición y dirección del barco
  },
};
</script>
