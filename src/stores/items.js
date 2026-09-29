import { defineStore } from 'pinia'
import { ref } from 'vue'
import http from '@/api/http'

export const useItemsStore = defineStore('items', () => {
  const items = ref([])

  async function fetchItems() {
    const { data } = await http.get('/elementos')
    items.value = data
  }

  async function addItem(nombre, categoria) {
    await http.post('/elementos', { nombre, categoria })
    await fetchItems()
  }

  return { items, fetchItems, addItem }
})