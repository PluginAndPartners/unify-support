import axios from 'axios'

import { SLACK_ACCESS_TOKEN, SLACK_API_URL, SLACK_CHANNEL_NAME } from '../constants.js'

function simpleMessage ({ title, description, topicLink, date }) {
  return `*Data:* ${date}\n*Link:* ${topicLink}\n*Título:* ${title}\n*Descrição:* ${description}`
}

export async function sendTopicToChannel (topicData) {
  try {
    await axios.post(SLACK_API_URL, {
      channel: SLACK_CHANNEL_NAME, // https://app.slack.com/client/T02FKNXCHU6/C02GG4M7048
      username: topicData.username,
      text: simpleMessage(topicData)
    },
    {
      headers: {
        authorization: `Bearer ${SLACK_ACCESS_TOKEN}`,
        'Content-type': 'application/json; charset=utf-8'
      }
    }
    )

    console.log(`Tópico: ${topicData.topicLink} > Enviado para o canal ${SLACK_CHANNEL_NAME}`)
  } catch (err) {
    console.error(err)
  }
}
