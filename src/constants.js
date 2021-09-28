import { config } from 'dotenv'

config()

export const FORUM_URL = 'https://wordpress.org/support/plugin/woocommerce-mercadopago/'
export const TOPIC_SELECTOR = topicNumber => `.loop-item-${topicNumber} > li.bbp-topic-title`
export const TOPIC_AUTHOR_SELECTOR = '.bbp-author-name'
export const TOPIC_TITLE_SELECTOR = 'h1.page-title'
export const TOPIC_DESCRIPTION_SELECTOR = 'div.bbp-topic-content'
export const TOPIC_DATE_SELECTOR = '.bbp-topic-permalink'
export const AT_MERCADOPAGO = '@mercadopago'
export const SLACK_ACCESS_TOKEN = process.env.SLACK_ACCESS_TOKEN
export const SLACK_API_URL = 'https://slack.com/api/chat.postMessage'
export const SLACK_CHANNEL_NAME = '#forum-woo'
