<template>
  <div class="grid">
    <TagButton v-for="(tag, key) in grid.tags" :key="tag.id" :type="tag.type" @click="tryMoveTagByKey(key)">
      {{tag.label}}
    </TagButton>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TagButton from './TagButton.vue'
import { GridType, NumberGrid, WordGrid, WordRuGrid } from '../models/Grid'

type AnyGrid = NumberGrid | WordGrid | WordRuGrid

@Component({
  components: {
    TagButton
  }
})
export default class GridComponent extends Vue {
  @Prop({ type: [String, Number], required: true }) readonly gridType!: GridType

  private grid: AnyGrid = this.createGrid()

  public reset () {
    this.grid = this.createGrid()
  }

  public createGrid () {
    switch (this.gridType) {
      case GridType.NumberGrid:
        return new NumberGrid()
      case GridType.WordGrid:
        return new WordGrid()
      case GridType.WordRuGrid:
        return new WordRuGrid()
      default:
        return new NumberGrid()
    }
  }

  private tryMoveTagByKey (key: number) {
    const isMoved = this.grid.tryMoveTagByTagIndex(key)

    if (!isMoved) return

    const isWon = this.grid.checkWin()
    this.$emit('incrementSteps')
    isWon && this.$emit('win')
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 50px);

  border: 2px solid #47A9F5;
}
</style>
