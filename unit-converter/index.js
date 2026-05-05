/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const input = document.getElementById("num1")
const meterP = document.getElementById("meter-p")
const literP = document.getElementById("volume-p")
const massP = document.getElementById("mass-p")


const convertBtn = document.getElementById("convert-btn")

convertBtn.addEventListener("click", function() {
    let feet = Number(input.value) * 3.281
    let meters = Number(input.value) / 3.281

    let gallons = Number(input.value) * 0.264
    let liters = Number(input.value) / 0.264

    let pounds = Number(input.value) * 2.204
    let kilograms = Number(input.value) / 2.204

    meterP.textContent = `${input.value} meters = ${feet.toFixed(3)} 
        | ${input.value} feet = ${meters.toFixed(3)} meters`
    literP.textContent = `${input.value} liters = ${gallons.toFixed(3)} 
        | ${input.value} gallons = ${liters.toFixed(3)} liters`
    massP.textContent = `${input.value} kilos = ${pounds.toFixed(3)} 
        | ${input.value} pounds = ${kilograms.toFixed(3)} kilos`
})