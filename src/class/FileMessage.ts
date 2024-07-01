export class FileMessage {
  name: string
  type: string
  lastModified: string
  constructor(name: string, type: string, lastModified: string) {
    this.name = name
    this.type = type
    this.lastModified = lastModified
  }
}
