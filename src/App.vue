<template>
  <div id="app">
    <HelloWindow v-if="screen === Screens.Hello" @start="onStart" ></HelloWindow>
    <WinWindow v-else-if="screen === Screens.Win" :prevSteps="prevSteps" :steps="steps" @reset="onReset"></WinWindow>
    <template v-else-if="screen === Screens.Game">
      <div class="steps-display">
        Шаги: {{steps}}
      </div>
      <GridComponent v-if="isGameReadyToShow" @incrementSteps="onIncrementSteps" @win="onWin" ref="grid" :gridType="currentGridType" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'
import GridComponent from './components/GridComponent.vue'
import WinWindow from './components/WinWindow.vue'
import { GridType } from './models/Grid'
import HelloWindow from './components/HelloWindow.vue'
import { isNil } from 'lodash-es'

enum Screens {
  Win,
  Hello,
  Game
}

@Component({
  components: {
    GridComponent,
    WinWindow,
    HelloWindow
  }
})
export default class App extends Vue {
  @Ref() readonly grid!: GridComponent
  public steps = 0
  public screen = Screens.Hello
  public prevSteps = 0
  public currentGridType = GridType.NumberGrid

  mounted () {
    this.loadSettings()
  }

  get isGameReadyToShow () {
    return !isNil(this.currentGridType)
  }

  get Screens () {
    return Screens
  }

  public loadSettings () {
    const prevStepsFromStorage = localStorage.getItem('prevSteps')
    if (!prevStepsFromStorage) return

    this.prevSteps = parseInt(prevStepsFromStorage, 10)
  }

  public onIncrementSteps () {
    this.steps += 1
  }

  public onWin () {
    this.screen = Screens.Win
  }

  public onStart (gameOptions: { gridType?: GridType }) {
    this.currentGridType = gameOptions?.gridType || GridType.NumberGrid
    this.screen = Screens.Game
  }

  public setPrevSteps (prevSteps: number) {
    this.prevSteps = prevSteps
    localStorage.setItem('prevSteps', prevSteps.toString())
  }

  public onReset () {
    this.setPrevSteps(this.steps)

    this.steps = 0
    this.screen = Screens.Hello
    this.$nextTick(() => {
      this.grid.reset()
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}

.steps-display {
  margin-bottom: 20px;
  font-weight: bolder;
  font-size: 20px;
}
</style>
