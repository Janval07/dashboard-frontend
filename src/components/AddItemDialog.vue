<script setup>
import { ref } from 'vue'
import { useItemsStore } from '@/stores/items'

const model = defineModel({ type: Boolean, default: false })
const store = useItemsStore()
const nombre = ref('')
const categoria = ref('')
const saving = ref(false)
const error = ref('')

async function guardar() {
  if (!nombre.value.trim()) {
    error.value = 'El nombre es obligatorio'
    return
  }
  saving.value = true
  error.value = ''
  try {
    await store.addItem(nombre.value.trim(), categoria.value.trim())
    nombre.value = ''
    categoria.value = ''
    model.value = false
  } catch {
    error.value = 'No se pudo guardar'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <v-dialog v-model="model" max-width="480">
    <v-card title="Agregar elemento">
      <v-card-text>
        <v-text-field v-model="nombre" label="Nombre" />
        <v-text-field v-model="categoria" label="Categoría (videojuego, ropa...)" />
        <v-alert v-if="error" type="error" density="compact">{{ error }}</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="model = false">Cancelar</v-btn>
        <v-btn color="primary" :loading="saving" @click="guardar">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>