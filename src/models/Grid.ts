import { isEqual } from 'lodash-es'
import { Tag, TagType } from './Tag'
import arrayShuffle from 'array-shuffle'

export abstract class BaseGrid {
  protected _tags: Tag[] = []
  protected gridSize: number

  constructor (gridSize?: number) {
    this.gridSize = gridSize || 4
  }

  get tags () {
    return this._tags
  }

  get tagValues () {
    return this._tags.map((tag) => tag.value)
  }

  protected isTagsNear (tagIndex: number, otherTagIndex: number, gridSize: number): boolean {
    return tagIndex + 1 === otherTagIndex ||
    tagIndex - 1 === otherTagIndex ||
    tagIndex + gridSize === otherTagIndex ||
    tagIndex - gridSize === otherTagIndex
  }

  public tryMoveTagByTagIndex (tagIndex: number): boolean {
    const emptyTagIndex = this._tags.findIndex((tag) => tag.type === TagType.Empty)

    const isTagsNear = this.isTagsNear(tagIndex, emptyTagIndex, this.gridSize)
    if (isTagsNear) {
      const tag = this._tags[tagIndex]
      const emptyTag = this._tags[emptyTagIndex]
      this._tags.splice(tagIndex, 1, emptyTag)
      this._tags.splice(emptyTagIndex, 1, tag)
    }

    return isTagsNear
  }
}

export class NumberGrid extends BaseGrid {
  public winTagValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]

  constructor (gridSize?: number) {
    super(gridSize)
    this._tags = this.getGridTags()
  }

  private getGridTags (): Tag[] {
    const tags = []
    for (let i = 1; i <= 15; i++) {
      tags.push(
        new Tag({
          label: i.toString(),
          value: i
        })
      )
    }
    tags.push(new Tag({
      type: TagType.Empty,
      value: 0
    }))

    return arrayShuffle(tags)
  }

  checkWin (): boolean {
    return isEqual(this.tagValues, this.winTagValues)
  }
}

export class WordGrid extends BaseGrid {
  public winTagValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]
  public defaultTagLabels = 'RATEYOURMINDPAL'

  constructor (gridSize?: number) {
    super(gridSize)
    this._tags = this.getGridTags()
  }

  private getGridTags (): Tag[] {
    const tags = []
    for (let i = 0; i < 15; i++) {
      tags.push(
        new Tag({
          label: this.defaultTagLabels?.[i] ?? '',
          value: i + 1
        })
      )
    }
    tags.push(new Tag({
      type: TagType.Empty,
      value: 0
    }))

    return arrayShuffle(tags)
  }

  checkWin (): boolean {
    return isEqual(this.tagValues, this.winTagValues)
  }
}

export enum GridType {
  NumberGrid,
  WordGrid
}
