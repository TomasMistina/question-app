import { ref } from 'vue'

const STORAGE_KEY = 'favorite-questions'

export const favoriteIds = ref<number[]>(loadFavorites())

function loadFavorites(): number[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

function persist(ids: number[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

export function toggleFavorite(id: number): void {
  if (favoriteIds.value.includes(id)) {
    favoriteIds.value = favoriteIds.value.filter(f => f !== id)
  } else {
    favoriteIds.value = [...favoriteIds.value, id]
  }

  persist(favoriteIds.value)
}

export function isFavorite(id: number): boolean {
  return favoriteIds.value.includes(id)
}
