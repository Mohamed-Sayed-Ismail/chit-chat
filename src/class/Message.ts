import { FileMessage } from './FileMessage.js'
export class Message {
  id: number
  userID: number
  message: string
  received: boolean
  dateTime: string
  type: string
  file: FileMessage
  provider: string

  constructor(
    id: number,
    userID: number,
    message: string,
    received: boolean,
    dateTime: string,
    type: string,
    file: FileMessage,
    provider: string
  ) {
    this.id = id
    this.userID = userID
    this.message = message
    this.received = received
    this.dateTime = dateTime
    this.type = type
    this.file = file
    this.provider = provider
  }
}
