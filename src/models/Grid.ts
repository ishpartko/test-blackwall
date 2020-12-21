import { isEqual, shuffle } from 'lodash-es'
import { Tag, TagType } from './Tag'

export abstract class BaseGrid {
  protected _tags: Tag[] = []
  protected gridSize: number

  constructor (gridSize?: number) {
    this.gridSize = gridSize || 4
  }

  get tags () {
    return this._tags
  }

  get tagValues (): Array<number|string> {
    return this._tags.map((tag) => tag.value)
  }

  public getEmptyTagIndex (): number {
    return this._tags.findIndex((tag) => tag.type === TagType.Empty)
  }

  protected isTagsNear (tagIndex: number, otherTagIndex: number, gridSize: number): boolean {
    return tagIndex + 1 === otherTagIndex ||
    tagIndex - 1 === otherTagIndex ||
    tagIndex + gridSize === otherTagIndex ||
    tagIndex - gridSize === otherTagIndex
  }

  public tryMoveTagByTagIndex (tagIndex: number): boolean {
    const emptyTagIndex = this.getEmptyTagIndex()

    const isTagsNear = this.isTagsNear(tagIndex, emptyTagIndex, this.gridSize)
    if (isTagsNear) {
      const tag = this._tags[tagIndex]
      const emptyTag = this._tags[emptyTagIndex]

      const localTags = [...this._tags]

      localTags.splice(tagIndex, 1, emptyTag)
      localTags.splice(emptyTagIndex, 1, tag)
      this._tags = localTags
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

    return shuffle(tags)
  }

  checkWin (): boolean {
    return isEqual(this.tagValues, this.winTagValues)
  }
}

export class WordGrid extends BaseGrid {
  public defaultTagLabels = 'RATEYOURMINDPAL'
  public winTagValues = [...this.defaultTagLabels.split(''), 0]

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
          value: this.defaultTagLabels?.[i] ?? ''
        })
      )
    }
    tags.push(new Tag({
      type: TagType.Empty,
      value: 0
    }))

    return shuffle(tags)
  }

  checkWin (): boolean {
    return isEqual(this.tagValues, this.winTagValues)
  }
}

export class WordRuGrid extends BaseGrid {
  public defaultTagLabels = 'СЛОНСПИТСТОЯАВЫ'
  public winTagValues = [...this.defaultTagLabels.split(''), 0]

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
          value: this.defaultTagLabels?.[i] ?? ''
        })
      )
    }
    tags.push(new Tag({
      type: TagType.Empty,
      value: 0
    }))

    return shuffle(tags)
  }

  checkWin (): boolean {
    return isEqual(this.tagValues, this.winTagValues)
  }
}

export enum GridType {
  NumberGrid,
  WordGrid,
  WordRuGrid
}
