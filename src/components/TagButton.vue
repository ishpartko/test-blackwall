<template>
    <button
      :class="['tag-button', {
        'tag-button_empty': type === EmptyType
      }]"
      @click="$emit('click')"
      :disabled="type === EmptyType"
    >
      <slot></slot>
    </button>
</template>

<script lang="ts">
import { TagType } from '@/models/Tag'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class TagButton extends Vue {
  @Prop({ type: [String, Number], required: true }) readonly type!: TagType

  get EmptyType () {
    return TagType.Empty
  }
}
</script>

<style scoped>
.tag-button {
  max-height: 50px;
  max-width: 50px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  background: #47F581;
  color: white;
  border: 1px dashed #47A9F5;
  cursor: pointer;
  z-index: 2;
}

.tag-button:hover:not(.tag-button_empty) {
  background: #4AE0FF;
}

.tag-button_empty {
  background: white;
  cursor: not-allowed;

  z-index: 1;
}
</style>
