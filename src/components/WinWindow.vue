<template>
  <div class="win-window">
      Победа, было сделано {{steps}} {{pluClicksWord}}! <template v-if="prevSteps">{{compareText}}</template>
      <button class="win-window__button" @click="$emit('reset')">
        Заново
      </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import plural from 'plural-ru'

@Component({})
export default class WinWindow extends Vue {
  @Prop({ type: Number, default: 0 }) readonly steps!: number
  @Prop({ type: Number, default: 0 }) readonly prevSteps!: number

  get pluClicksWord () {
    return plural(this.steps, 'клик', 'клика', 'кликов')
  }

  get compareText (): string {
    const diff = this.steps - this.prevSteps

    if (diff === 0) {
      return 'Как и в прошлый раз!'
    }

    const diffWord = diff > 0 ? 'больше' : 'меньше'

    return `Это на ${Math.abs(diff)} ${diffWord} чем в прошлый раз.`
  }
}
</script>

<style scoped>
.win-window {
  max-width: 200px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;

  display: flex;
  flex-wrap: wrap;
}

.win-window__button {
  margin-top: 20px;
  cursor: pointer;
}

</style>
