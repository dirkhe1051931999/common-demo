window.onload = function() {
  function setRem(baseWidth = 720) {
    const dpr = window.devicePixelRatio
    const currentWidth = document.documentElement.clientWidth
    let remSize = 0
    let scale = 0
    scale = currentWidth / baseWidth
    remSize = baseWidth / 10
    remSize = remSize * scale
    document.documentElement.style.fontSize = remSize + 'px'
    document.documentElement.setAttribute('data-dpr', `${dpr}`)
  }
  setRem()
}
