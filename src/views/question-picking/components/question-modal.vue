<template>
  <div v-if="show" class="modal-backdrop" @click.self="close">
    <div class="modal">
      <span v-if="copied" class="copied-hint">Otázka skopírovaná!</span>
      <button
        class="copy-icon"
        @click="copyText"
        title="Skopírovať otázku do schránky"
        aria-label="Skopírovať otázku do schránky"
      >
        📋
      </button>

      <button
        class="favorite-icon"
        @click="toggleFav"
        :title="isFavorite(props.question.id) ? 'Odstrániť z obľúbených' : 'Pridať k obľúbeným'"
      >
        {{ isFavorite(props.question.id) ? '★' : '☆' }}
      </button>

      <p class="question-text">{{ props.question.text }}</p>

      <div class="modal-actions">
        <button class="secondary" @click="close">Zavrieť</button>
        <button class="primary" @click="pickAnother" :disabled="!props.canPickAnother">Vybrať ďalšiu</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toggleFavorite, isFavorite } from '../../../utils/favorites'
import type { Question } from '../../../data/types'
import { ref } from 'vue'

const copied = ref(false)

const props = defineProps<{
  question: Question
  show: boolean
  canPickAnother: boolean
}>()

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'pickAnother'): void
}>()

function close() {
  emits('close')
}

function pickAnother() {
  emits('pickAnother')
}

function toggleFav() {
  toggleFavorite(props.question.id)
}

async function copyText() {
  try {
    await navigator.clipboard.writeText(props.question.text)
    copied.value = true
    setTimeout(() => (copied.value = false), 1200)
  } catch (e) {
    console.error('Copy failed', e)
  }
}

</script>


<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}

.modal {
  background: var(--ion-background-color);
  color: var(--ion-text-color);
  border-radius: 16px;
  padding: 24px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  position: relative;
}

/* Favorite icon */
.favorite-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 24px;
  color: gold;
  background: transparent;
  border: none;
  cursor: pointer;
}

.favorite-icon:hover {
  transform: scale(1.2);
}

.question-text {
  color: var(--ion-text-color);
  font-size: 18px;
  margin-bottom: 20px;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 12px;
  flex-direction: column;
}

@media (min-width: 600px) {
  .modal-actions {
    flex-direction: row;
  }
}

button.primary {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }

button.primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

button.secondary {
  background: #666;
  color: white;
  border-radius: 10px;
  padding: 12px;
  font-size: 16px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
  width: 100%;
}

.copy-icon {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--ion-text-color);
  opacity: 0.7;
}

.copy-icon:hover {
  opacity: 1;
  transform: scale(1.15);
}

.copied-hint {
  position: absolute;
  top: 14px;
  left: 44px;
  font-size: 14px;
  color: var(--ion-color-success);
  opacity: 0.9;
}

</style>
