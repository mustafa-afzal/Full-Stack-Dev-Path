const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N",
    "O","P","Q","R","S","T","U","V","W","X","Y","Z",
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s",
    "t","u","v","w","x","y","z", 
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",",
    "|",":",";","<",">",".","?",
"/"];

// 91 chars, indices from 0 - 90

let pass1El = document.getElementById("pass1")
let pass2El = document.getElementById("pass2")

function pass() {
    pass1El.textContent = ""
    pass2El.textContent = ""
    let randIdx = -1
    for (let i = 0; i < 15; i++) {
        randIdx = Math.floor(Math.random() * characters.length)
        pass1El.textContent += characters[randIdx]
    }

    for (let j = 0; j < 15; j++) {
        randIdx = Math.floor(Math.random() * characters.length)
        pass2El.textContent += characters[randIdx]
    }    
    
}

async function copyPass1() {
  const text = document.getElementById('pass1').textContent;
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
    document.getElementById('pass1').textContent = "Copied to Clipboard!"
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

async function copyPass2() {
  const text = document.getElementById('pass2').textContent;
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
    document.getElementById('pass2').textContent = "Copied to Clipboard!"
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}



