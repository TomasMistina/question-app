<template>
  <div v-if="show" class="modal-backdrop" @click.self="close">
    <div class="modal">
      <button
        class="favorite-icon"
        @click="toggleFav"
        :title="isFavorite(props.question.id) ? 'Unfavorite' : 'Favorite'"
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
</script>


<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}

.modal {
  background: white;
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
  border: none;
  cursor: pointer;
  flex: 1;
}
</style>
