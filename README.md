## vue-chit-chat

![chitchat](https://github.com/Mohamed-Sayed-Ismail/chit-chat/blob/main/chitchat.gif)

### Install

```sh
npm i vue-js-chit-chat
```

### Quick-start

```sh
import { ChitChat } from 'vue-js-chit-chat'
import 'vue-js-chit-chat/dist/style.css'

<template>
<ChitChat ..... />
</template>
```

### Format

```sh
{
    id: 1,
    firstName: '',
    lastName: '',
    gender: '',
    isOnline: true | false,
    userPicture: './...',
            messages: [{ #users messages
            id: 0,
            userID: 1,
            message: ' ',
            received: true || false,
            dateTime: '',
            type: 'text',
              file: { name: '', type: '', lastModified: '' }, # files if any
            provider: '',
            }],
  },
```

### Important Variables

> ```
> | variable Left-aligned | type            :| description          | optional               |
> | users                 | Array<any>      | users & messages      | false                  |
> | supportUser           | Object          | user (ojb) & messages | user is guest          |
> | isAnimation           | boolean         | use flip animation    | default true           |
> | isAudio               | boolean         | allow audio chat      | default true           |
> | isFile                | boolean         | allow  files          | default false          |
> | isGuest               | boolean         | ex: if user logged in | default false          |
> | isGuestAudio          | boolean         | allow guest audio     | default true           |
> | isGuestFile           | boolean         | allow guest files     | default false          |
> | bodyBackground        | string          | background color (hex)| default:#929191        |
> | bodyBackgroundDark    | string          | dark background  (hex)| default:#2a2b2c        |
> | onGuestMessage        | Function        | return guest message  |                        |
> | logo                  | string          | company logo          | ''                     |
> | avatar                | string          | user picture path     |                        |
> | status                | string          | user status (online?) | online & offline       |
> | statusOnline          | string          | online color (hex)    | default #066e10        |
> | statusOffline         | string          | offline color (hex)   | default #c63737        |
> | statusOnlineDark      | string          | online color (hex)    | default #0889c5        |
> | statusOfflineDark     | string          | offline color (hex)   | default #a41278        |
> | userName              | string          | user name             | ''                     |
> | fontFamily            | string          | font - family         |                        |
> | textColor             | string          | text color (hex)      |                        |
> | textDarkTheme         | string          | #                     |                        |
> | styleChat             | string          | border style          | leave, flat, round-top |
> | titleText             | string          | ex title name         | ''                     |
> | subTitleText          | string          | sub title name        | ''                     |
> | textColorHeadTitle    | string          |                       |                        |
> | textDarkThemeHead     | string          |                       |                        |
> | fontFamilyFooter      | string          |                       |                        |
> | textColorFooter       | string          |                       |                        |
> | textDarkThemeFooter   | string          |                       |                        |
> | textChatValueFooter   | string          |                       |                        |
> | returnArrowColor      | string          |                       |                        |
> | returnArrowColorDark  | string          |                       |                        |
> | chatBodyFontFamily    | string          |                       |                        |
> | usersListTextColor    | string          |                       |                        |
> | usersListTextColorDark| string          |                       |                        |
> | sendMessageColor      | string          |                       |                        |
> | sendMessageColorDark  | string          |                       |                        |
> | receivedMessageColor  | string          |                       |                        |
> | onRecorded            | Function        |                       |                        |
> | onMessageSent         | Function        |                       |                        |
> | onMessageReceived     | Function        |                       |                        |
> | onNewGuestCloseForm   | Function        |                       |                        |
> | onNewGuestClearForm   | Function        |                       |                        |
> | onAddMessage          | Function        |                       |                        |
> | ....                  | ....            |                       |                        |
> ```

### License

```sh
MIT
```
