export function loadUsedIds(category: string): number[] {
  const raw = localStorage.getItem(`used-${category}`)
  return raw ? JSON.parse(raw) : []
}

export function saveUsedIds(category: string, ids: number[]): void {
  localStorage.setItem(`used-${category}`, JSON.stringify(ids))
}

export function resetUsedIds(category: string): void {
  localStorage.removeItem(`used-${category}`)
}
