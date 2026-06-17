const source = new EventSource('/prices')

source.onmessage = function(e) {
  document.getElementById('price-display').textContent = JSON.parse(e.data).price
}

document.getElementById('invest-btn').addEventListener('click', async function(e) {
  console.log('btn clicked')
  e.preventDefault()
  
  const res = await fetch('/invest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( 
      { price: document.getElementById('price-display').textContent,
        amount: document.getElementById('investment-amount').value
      })
  })
  const data = await res.json() 
  console.log(data)

})

