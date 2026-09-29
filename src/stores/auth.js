import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { requestToken } from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(sessionStorage.getItem('jwt') || '')
  const isLoggedIn = computed(() => !!token.value)

  async function login(username, password) {
    token.value = await requestToken(username, password)
    sessionStorage.setItem('jwt', token.value)
  }

  function logout() {
    token.value = ''
    sessionStorage.removeItem('jwt')
  }

  return { token, isLoggedIn, login, logout }
})