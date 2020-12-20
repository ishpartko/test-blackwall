<template>
  <div class="win-window">
    <form @submit.prevent="onSubmit">
      <p class="win-window__text">Привет! Выбери режим игры:</p>
      <div class="win-window__radio-area">
        <label v-for="gameMode in gameModes" :key="gameMode.value">
          <input
            type="radio"
            name="gameMode"
            :value="gameMode.value"
            v-model="pickedGameMode"
          />
          {{gameMode.title}}
        </label>
      </div>
      <div>
        <button type="submit" class="win-window__button">Начать</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import { GridType } from '@/models/Grid'

@Component({})
export default class HelloWindow extends Vue {
  public pickedGameMode: GridType = GridType.NumberGrid;

  get gameModes () {
    return [
      {
        title: 'Цифры',
        value: GridType.NumberGrid
      },
      {
        title: 'Русские слова',
        value: GridType.WordRuGrid
      },
      {
        title: 'Английские слова',
        value: GridType.WordGrid
      }
    ]
  }

  @Emit('start')
  public onSubmit () {
    return {
      gridType: this.pickedGameMode
    }
  }
}
</script>

<style scoped>
.win-window {
  max-width: 200px;
  padding: 12px;
  font-size: 16px;

  display: flex;
  flex-wrap: wrap;
}

.win-window__text {
  font-weight: bold;
}

.win-window__radio-area {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.win-window__radio-area label {
  padding: 5px;
  cursor: pointer;
}

.win-window__radio-area label input {
  cursor: inherit;
}

.win-window__button {
  margin-top: 20px;
  cursor: pointer;
}
</style>
