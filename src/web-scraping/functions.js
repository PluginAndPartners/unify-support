import { TOPIC_SELECTOR, TOPIC_AUTHOR_SELECTOR, TOPIC_TITLE_SELECTOR, TOPIC_DESCRIPTION_SELECTOR, TOPIC_DATE_SELECTOR, AT_MERCADOPAGO } from '../constants.js'

export async function getTopicLink (page, topicNumber) {
  const topicElement = await page.$$(TOPIC_SELECTOR(topicNumber))
  const hrefValue = topicElement[0].$eval('a', i => i.getAttribute('href'))

  return hrefValue
}

export async function getTopicData (page) {
  const username = await page.evaluate(el => el.innerText, await page.$(TOPIC_AUTHOR_SELECTOR))
  const title = await page.evaluate(el => el.innerText, await page.$(TOPIC_TITLE_SELECTOR))
  const description = await page.evaluate(el => el.innerText, await page.$(TOPIC_DESCRIPTION_SELECTOR))
  const date = await page.evaluate(el => el.innerText, await page.$(TOPIC_DATE_SELECTOR))

  return { username, title, description, date }
}

export async function hasMercadoPagoResponse (page) {
  return page.evaluate(atMercadopago => window.find(atMercadopago), AT_MERCADOPAGO)
}
