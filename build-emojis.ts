import emoji from 'emoji.json'
import * as FS from "node:fs";

const path = 'src/extensions/emoji'

const emojiGroups = [...new Set(emoji.map(emoji => emoji.group))]

emojiGroups.forEach(emojiGroup => {
  const group_name = emojiGroup.replace(/\s+/g, '_').replace('&', 'and').toLowerCase()

  const groupEmojis = emoji.filter(emoji => emoji.group === emojiGroup).map(emoji => emoji)

  const emojis = []
  groupEmojis.forEach(emoji => {
    if (!/: \S+/.test(emoji.name) || group_name === 'flags') {
      emojis.push(emoji)
    }
  })

  FS.writeFile(
    `${__dirname}/${path}/${group_name}.ts`,
    'export default ' + JSON.stringify(emojis, null, 2),
    'utf8',
    (error) => {
      if (error) {
        console.error(error)
      }
    }
  )
})

