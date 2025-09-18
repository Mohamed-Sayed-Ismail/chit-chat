export class FileMessage {
  name: string
  type: string
  lastModified: string
  url: string
  constructor(name: string, type: string, lastModified: string, url: string = '') {
    this.name = name
    this.type = type
    this.lastModified = lastModified
    this.url = url
  }
}
