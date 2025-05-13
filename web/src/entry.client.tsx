import { hydrateRoot, createRoot } from 'react-dom/client'

import App from './App'
import Routes from './Routes'

/**
 * When `#redwood-app` isn't empty then it's very likely that you're using
 * prerendering. So React attaches event listeners to the existing markup
 * rather than replacing it.
 * https://react.dev/reference/react-dom/client/hydrateRoot
 */
const redwoodAppElement = document.getElementById('redwood-app')

if (!redwoodAppElement) {
  throw new Error(
    "Could not find an element with ID 'redwood-app'. Please ensure it " +
      "exists in your 'web/src/index.html' file."
  )
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js') // será generado desde el TS
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration)
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error)
      })
  })
}

if (redwoodAppElement.children?.length > 0) {
  hydrateRoot(
    redwoodAppElement,
    <App>
      <Routes />
    </App>
  )
} else {
  const root = createRoot(redwoodAppElement)
  root.render(
    <App>
      <Routes />
    </App>
  )
}
