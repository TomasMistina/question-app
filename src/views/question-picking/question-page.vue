<template>
  <main class="container">
    <h1>Vyber si náhodnú otázku</h1>

    <select v-model="selectedCategory">
      <option value="hypothetic">Hypotetické</option>
      <option value="deep">Hlboké</option>
      <option value="faith">O viere</option>
      <option value="other">Ostatné</option>
      <option value="favorites">Moje Obľúbené</option>
    </select>

    <button @click="pickQuestion" :disabled="!availableQuestions.length">
      Vybrať otázku
    </button>

    <button class="danger" @click="resetPot">
      Resetovať otázky v tejto kategórii
    </button>

    <QuestionModal
      v-if="currentQuestion"
      :question="currentQuestion"
      :show="!!currentQuestion"
      :canPickAnother="availableQuestions.length > 0"
      @close="currentQuestion = null"
      @pickAnother="pickQuestion"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { loadUsedIds, saveUsedIds, resetUsedIds } from '../../utils/storage'
import { questionPots } from '../../data'
import type { Question, QuestionCategory } from '../../data/types'
import { favoriteIds} from '../../utils/favorites'
import QuestionModal from './components/question-modal.vue'

const allQuestions = computed<Question[]>(() =>
  Object.values(questionPots).flat()
)

const favoriteQuestions = computed<Question[]>(() =>
  allQuestions.value.filter(q =>
    favoriteIds.value.includes(q.id)
  )
)

const selectedCategory = ref<QuestionCategory>('hypothetic')
const currentQuestion = ref<Question | null | undefined>(null)
const availableQuestions = ref<Question[]>([])

watch(
  [selectedCategory, favoriteIds],
  () => {
    if (selectedCategory.value === 'favorites') {
      buildPot()
    }
  },
  { deep: true }
)

function buildPot(): void {
  if (selectedCategory.value === 'favorites') {
    availableQuestions.value = [...favoriteQuestions.value]
    currentQuestion.value = null
    return
  }

  const usedIds = loadUsedIds(selectedCategory.value)
  availableQuestions.value =
    questionPots[selectedCategory.value]
      .filter(q => !usedIds.includes(q.id))

  currentQuestion.value = null
}

function pickQuestion(): void {
  if (!availableQuestions.value.length) return

  const index = Math.floor(Math.random() * availableQuestions.value.length)
  currentQuestion.value = availableQuestions.value.splice(index, 1)[0]

  if (selectedCategory.value !== 'favorites') {
    saveUsedIds(
      selectedCategory.value,
      [...loadUsedIds(selectedCategory.value), currentQuestion.value.id]
    )
  }
}

function resetPot(): void {
  if (selectedCategory.value !== 'favorites') {
    resetUsedIds(selectedCategory.value)
  }
  buildPot()
}

watch(selectedCategory, buildPot, { immediate: true })
</script>

<style scoped>
  .container {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    font-family: system-ui, sans-serif;
  }

  h1 {
    text-align: center;
  }

  button {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .danger {
    background: #d9534f;
    color: white;
  }

  .secondary {
    background: #666;
    color: white;
  }

  .question-box {
    margin-top: 20px;
    padding: 20px;
    background: #eef3ff;
    border-radius: 12px;
    text-align: center;
  }

  select {
    width: 100%;
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 10px;
    font-size: 16px;
  }

  @media (min-width: 600px) {
    .modal-actions {
      flex-direction: row;
    }
  }

</style>
