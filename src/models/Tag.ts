import { nanoid } from 'nanoid'

export enum TagType {
  Filled,
  Empty
}

export class Tag {
  public id: string;
  public label?: string
  public type: TagType
  public value: number | string

  constructor ({ label, type, value }: {label?: string; type?: TagType; value: number | string}) {
    this.label = label || ''
    this.value = value
    this.type = type || TagType.Filled
    this.id = nanoid(3)
  }
}
