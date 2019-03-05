import { show as showBubble, Bubble } from 'Onboarding/Bubble'

document.addEventListener('DOMContentLoaded', () => {
  window.Bubble = Bubble
  window.showBubble = showBubble
})
