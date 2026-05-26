import { menuArray } from '/data.js'

const containerDiv = document.querySelector('.container')
const orderContainer = document.getElementById('order')
const modal = document.querySelector('.modal')
const payBtn = document.getElementById('payBtn')
const username = document.querySelector('input[placeholder="Enter your name"]')
let orders = []

containerDiv.addEventListener('click', function(e) {
    if (e.target.dataset.item) {
        const result = menuArray.find(item => item.id === parseInt(e.target.dataset.item))
        orders.push(result)
        renderOrder()
    }
    else if (e.target.id === 'complete-btn'){
        modal.classList.toggle('hidden')
    }
    else if (e.target.id === 'remove') {
        handleRemove(e)
    }
})

payBtn.addEventListener('click', function(e) {
    e.preventDefault()
    modal.classList.toggle('hidden')
    thanksMessage()
})

function renderOrder() {
    let orderHtml = ""
    let totalPrice = 0
    orderHtml +='<h3 id="order-header"> Your Order </h4>'
    orders.forEach(function(order) {
        totalPrice += order.price
        orderHtml += ` 
        <div id="order-div">
            <div id="order-name">
                <h4> ${order.name} </h4>
                <button id="remove" data-remove="${order.id}"> remove </button>
            </div>
            <h5> $${order.price} </h5> 
        </div>
        `
    })
    orderHtml += `
    <div class="total-price-div">
        <h4 id ="total-price"> Total Price </h4>
        <h5> $${totalPrice} </h5>
    </div>
    <button class="complete-btn" id="complete-btn"> Complete Order </button>`
    orderContainer.innerHTML = orderHtml
}

function handleRemove(e) {
    if (e.target.id === 'remove') {
        const newOrder = orders.filter(order => order.id != e.target.dataset.remove)
        orders = newOrder
        renderOrder()
    }
}

function thanksMessage() {
    let orderHtml = ""
    orderHtml += `
                <div class="thanks-div">
                <p> Thanks, ${username.value}! Your order is on its way!
                </div>`
    orderContainer.innerHTML = orderHtml
}