import eventsource from 'react-native-sse'
import PocketBase from 'pocketbase'
import AsyncAuthStore from '~/stores/AsyncAuthStore'

// @ts-ignore
global.EventSource = eventsource

const api = new PocketBase('https://myfinance.fly.dev/', new AsyncAuthStore())

export default api
