import puppeteer from 'puppeteer'

import { FORUM_URL } from '../constants.js'
import { getTopicLink, getTopicData, hasMercadoPagoResponse } from './functions.js'

export async function getTopicsData () {
  return new Promise(async (resolve, reject) => { // eslint-disable-line
    try {
      console.log(`Obtendo todos os tópicos da primeira página do forum ${FORUM_URL}`)

      const topics = []
      const numberOfTopics = 30
      const browser = await puppeteer.launch({ headless: true })
      const page = await browser.newPage()

      await page.goto(FORUM_URL)

      for (let topicNumber = 0; topicNumber < numberOfTopics; topicNumber++) {
        const topicLink = await getTopicLink(page, topicNumber)

        await page.goto(topicLink)

        const topicData = await getTopicData(page)

        topics.push({
          topicLink,
          hasMercadoPagoResponse: await hasMercadoPagoResponse(page),
          ...topicData
        })

        await page.goto(FORUM_URL)
      }

      await browser.close()

      resolve(topics)
    } catch (err) {
      console.error(err)
      reject(err)
    }
  })
}
