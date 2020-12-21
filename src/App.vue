<template>
  <div id="app">
    <HelloWindow v-if="screen === Screens.Hello" @start="onStart" ></HelloWindow>
    <WinWindow v-else-if="screen === Screens.Win" :prevSteps="prevSteps" :steps="steps" @reset="onReset"></WinWindow>
    <template v-else-if="screen === Screens.Game">
      <div class="tip-area">
        <strong>Цель</strong>
        <img :src="targetImg" width="100%" height="200px" alt="">
      </div>
      <button @click="onReset">Заново</button>
      <div class="steps-display">
        Время: {{animatedNumber}} {{pluSecondsWord}}
      </div>
      <div class="steps-display">
        Шаги: {{steps}}
      </div>
      <GridComponent v-if="isGameReadyToShow" @incrementSteps="onIncrementSteps" @win="onWin" ref="grid" :gridType="currentGridType" />
    </template>
    <div v-else-if="screen === Screens.Lose">
      <div>
        К сожалению время закончилось! :(
      </div>
      <button @click="onReset">Заново</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import GridComponent from './components/GridComponent.vue'
import WinWindow from './components/WinWindow.vue'
import { GridType } from './models/Grid'
import HelloWindow from './components/HelloWindow.vue'
import { isNil } from 'lodash-es'
import plural from 'plural-ru'
import gsap from 'gsap'

enum Screens {
  Win,
  Hello,
  Game,
  Lose
}

const TIME_TO_GAME = 200

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

  private timer: number = this.startTimer()
  private currentTime = TIME_TO_GAME
  private tweenedNumber = this.currentTime

  startTimer () {
    return setInterval(() => {
      this.currentTime--
    }, 1000)
  }

  resetTimer () {
    this.timer = this.startTimer()
    this.currentTime = TIME_TO_GAME
    this.tweenedNumber = this.currentTime
  }

  stopTimer () {
    clearTimeout(this.timer)
  }

  mounted () {
    this.stopTimer()
    this.loadSettings()
  }

  get animatedNumber () {
    return this.tweenedNumber.toFixed(0)
  }

  @Watch('currentTime')
  onCurrentTimeChanged (time: number) {
    if (time === 0) {
      this.stopTimer()
      this.screen = Screens.Lose
    } else {
      gsap.to(this.$data, { duration: 0.5, tweenedNumber: time })
    }
  }

  get pluSecondsWord () {
    return plural(this.steps, 'секунда', 'секунды', 'секунд')
  }

  get isGameReadyToShow () {
    return !isNil(this.currentGridType)
  }

  get Screens () {
    return Screens
  }

  get targetImg () {
    switch (this.currentGridType) {
      case GridType.NumberGrid:
        return require('./assets/numbers.png')
      case GridType.WordGrid:
        return require('./assets/words.png')
      case GridType.WordRuGrid:
        return require('./assets/words-ru.png')
    }
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
    this.stopTimer()
    this.screen = Screens.Win

    this.setPrevSteps(this.steps)
  }

  public onStart (gameOptions: { gridType?: GridType }) {
    this.currentGridType = gameOptions?.gridType || GridType.NumberGrid
    this.screen = Screens.Game
    this.resetTimer()
  }

  public setPrevSteps (prevSteps: number) {
    this.prevSteps = prevSteps
    localStorage.setItem('prevSteps', prevSteps.toString())
  }

  public onReset () {
    this.stopTimer()

    this.steps = 0
    this.$nextTick(() => {
      this.screen = Screens.Hello
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

.tip-area {
  max-width: 200px;
}
</style>
