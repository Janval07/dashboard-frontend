<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useItemsStore } from '@/stores/items'
import AddItemDialog from '@/components/AddItemDialog.vue'

const auth = useAuthStore()
const store = useItemsStore()
const router = useRouter()
const dialog = ref(false)

onMounted(() => store.fetchItems())

function salir() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <v-container>
    <div class="d-flex align-center mb-4">
      <h1 class="text-h4">Mis elementos favoritos</h1>
      <v-spacer />
      <v-btn color="primary" prepend-icon="mdi-plus" class="mr-2" @click="dialog = true">
        Agregar
      </v-btn>
      <v-btn @click="salir">Salir</v-btn>
    </div>
    
    <v-table>
      <thead>
        <tr><th>#</th><th>Nombre</th><th>Categoría</th></tr>
      </thead>
      <tbody>
        <tr v-for="item in store.items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.categoria }}</td>
        </tr>
      </tbody>
    </v-table>

    <AddItemDialog v-model="dialog" />
  </v-container>
</template>