const updateCartTotal = () => {
    let cartItems = document.getElementsByClassName('main-table')[0]
    let cartRow = cartItems.getElementsByClassName('cart-row')
    let total = 0
    for(let i=0; i<cartRow.length; i++){
        let cartR = cartRow[i]
        let priceElement = cartR.getElementsByClassName('price')[0]
        let qtyElement = cartR.getElementsByClassName('qty')[0]
        let itemPrice = parseFloat(priceElement.innerText.replace('$', ''))
        let itemQty = qtyElement.value
        total = total + (itemPrice * itemQty)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('amt')[0].innerText = `$`+ total
}

updateCartTotal()

const removeItem = event => {
    let btnClicked = event.target
    btnClicked.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}

const quantityChanged = event => {
    let newInput = event.target
    if(isNaN(newInput.value) || newInput.value <= 0){
        newInput.value = 1
    }
    updateCartTotal()
}

const addToCart = event => {
    let button = event.target
    let shopItem = button.parentElement
    let title = shopItem.getElementsByClassName('item-title')[0].innerText
    let price = shopItem.getElementsByClassName('item-price')[0].innerText
    let imgSrc = shopItem.getElementsByClassName('item-img')[0].src
    addItemToList(title, price, imgSrc)
    updateCartTotal()
}

const addItemToList = (title, price, imgSrc) => {
    let newCartRow = document.createElement('tr')
    newCartRow.className = 'cart-row'
    let newCartItem = document.getElementsByClassName('main-table')[0]
    let cartItemName = newCartItem.getElementsByClassName('title')
    for(let i = 0; i<cartItemName.length; i++){
        if(cartItemName[i].innerText == title){
            alert('Item already added to cart')
            return
        }
    }
    let cartRowContent = `
    <td class="left">
        <img src="${imgSrc}" alt="">
        <span class= "title" >${title}</span>
    </td>
    <td class="price">${price}</td>
    <td class="right">
        <form action="">
            <input type="number" name="num" class="qty" value="1">
            <input type="button" class="btn" name="remove" value="REMOVE">
        </form>
    </td>`
    newCartRow.innerHTML = cartRowContent
    newCartItem.append(newCartRow)
    newCartRow.getElementsByClassName('btn')[0].addEventListener('click', removeItem)
    newCartRow.getElementsByClassName('qty')[0].addEventListener('change', quantityChanged)
}

const purchaseBtnClicked = () => {
    alert('Thank you for making the purchase!')
    let items = document.getElementsByClassName('main-table')[0]
    while(items.hasChildNodes()){
        items.removeChild(items.firstChild)
    }
    updateCartTotal()
}

let removeBtn = document.getElementsByClassName('btn')
for(let i=0; i<removeBtn.length; i++){
    let btn = removeBtn[i];
    btn.addEventListener('click', removeItem)
}

// this code is for the qty input area so that when it is changed it reflects on the prices
let qtyInputs = document.getElementsByClassName('qty')
for(let i=0; i<qtyInputs.length; i++){
    let qtyInput = qtyInputs[i]
    qtyInput.addEventListener('change', quantityChanged)
}

// Let's now give functionality to the add to cart button
let addToCartBtn = document.getElementsByClassName('add-to-cart')
for(let i = 0; i<addToCartBtn.length; i++){
    let atcBtn = addToCartBtn[i]
    atcBtn.addEventListener('click', addToCart)
}

// Functionality of the Purchase button
let purchaseBtn = document.getElementsByClassName('btn-2')
purchaseBtn.addEventListener('click', purchaseBtnClicked)