export function removeItensDuplicados(array) {
  const meuArrayFiltrado = [...new Set(array)]
  return meuArrayFiltrado
}
