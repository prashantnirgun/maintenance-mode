export function usePageRefresh() {
  function refreshPage() {
    window.location.reload()
  }
  return { refreshPage }
}
