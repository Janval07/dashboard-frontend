<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import userIcon from '@/assets/usuario.png'

const auth = useAuthStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(username.value, password.value)
    router.push({ name: 'dashboard' })
  } catch {
    error.value = 'Usuario o contraseña incorrectos'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-wrapper">
    <v-card class="pa-6" max-width="400" width="100%">
      <div class="d-flex justify-center mb-4">
        <v-avatar size="100">
          <v-img :src="userIcon" alt="Usuario" cover />
        </v-avatar>
      </div>
      <v-card-title class="text-h5 mb-4 justify-center">Iniciar sesión</v-card-title>
      <v-text-field v-model="username" label="Usuario" prepend-inner-icon="mdi-account" />
      <v-text-field
        v-model="password"
        label="Contraseña"
        type="password"
        prepend-inner-icon="mdi-lock"
        @keyup.enter="submit"
      />
      <v-alert v-if="error" type="error" class="mb-4" density="compact">{{ error }}</v-alert>
      <v-btn color="primary" block :loading="loading" @click="submit">Entrar</v-btn>
    </v-card>
  </div>
</template>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
</style>