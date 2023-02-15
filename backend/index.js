addEventListener('fetch', event => {
    const response = new Response('see this bruh', {
        headers: { 'Content-Type': 'text/html'}
    })
    event.respondWith(response)
})