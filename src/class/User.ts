import { Message } from './Message.js'
export class User {
  id: number
  firstName: string
  lastName: string
  gender: string
  isOnline: boolean
  userPicture: string
  messages: Message[]

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    gender: string,
    isOnline: boolean,
    userPicture: string,
    messages: Message[]
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.gender = gender
    this.isOnline = isOnline
    this.userPicture = userPicture
    this.messages = messages
  }

  get userMessages() {
    return this.messages
  }
  set userMessages(messages: Message[]) {
    this.messages = messages
  }
}
