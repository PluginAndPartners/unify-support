import { CronJob } from 'cron'

import { getTopicsData } from './src/web-scraping/index.js'
import { sendTopicToChannel } from './src/slack/index.js'
import { connectDB, createTableIfNotExists, find, insert, closeDB } from './src/db/commands.js'

import './src/logger/index.js'

new CronJob(
  '*/1 * * * *', // https://crontab.guru/
  async () => {
    try {
      console.info('Iniciando CronJob a cada minuto')

      await connectDB()
      await createTableIfNotExists('notifications', 'url varchar(255), wasNotify BOOL')

      const topics = (await getTopicsData()).reverse()

      for (let topicNumber = 0; topicNumber < topics.length; topicNumber++) {
        const {
          hasMercadoPagoResponse,
          topicLink,
          ...topicData
        } = topics[topicNumber]

        const topic = await find('*', 'notifications', `url = '${topicLink}'`)
        const wasNotified = topic ? topic.url === topicLink && topic.wasNotify : false

        if (!wasNotified && !hasMercadoPagoResponse) {
          await sendTopicToChannel({ topicLink, ...topicData })
          await insert('notifications', 'url, wasNotify', `'${topicLink}', 1`)
        }
      }

      await closeDB()

      console.info('Finalizando varredura.')
    } catch (err) {
      console.error(err)
    }
  },
  null,
  true,
  'America/Sao_Paulo'
).start()
