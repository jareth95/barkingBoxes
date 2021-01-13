// shopping cart

let cart = document.getElementsByClassName('addToCart');

for(let i = 0; i < cart.length; i++) {
cart[i].addEventListener('click', checkQuantity);
}

function checkQuantity() {
    let quantity = document.querySelector(".quantity").value;
    if(quantity > 0) {
        saveItem()
    } else {
        alert('please enter quantity');
    }
}

let shoppingCart = [];
let order = JSON.parse(localStorage.getItem('shoppingCart'));
for(let i = 0; i < order.length; i++){
    shoppingCart.push(order[i])
}
insertToCart()

function saveItem() {
    
	const order = {
        name: document.querySelector(".title").innerText,
        price: document.querySelector(".price").innerText,
        quantity: document.querySelector(".quantity").value,
    }
    shoppingCart.push(order);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

    insertToCart();
}

function insertToCart(){
    
    let order = JSON.parse(localStorage.getItem('shoppingCart'));
    let quantity = 0;
    let cart = document.querySelector(".cartQuantity");

    for(let i = 0; i < order.length; i++){
        quantity += parseInt(order[i].quantity);
    }
    
    cart.innerHTML = quantity;
    if (quantity > 0) {
        cart.classList.remove('displayNone');
    } else {
        cart.classList.add('displayNone');
    } 
}

console.log(shoppingCart)

window.addEventListener('DOMContentLoaded', generateCart);

function generateCart() {
    cart = document.getElementById('cart');
    
    for (let i = 0; i < shoppingCart.length; i++){
        
        if(!cart.innerHTML.includes(order[i].name)) {
         
        row = cart.insertRow(cart.rows.length-2);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        picSrc = order[i].name.replace(' ', '-').toLowerCase();
        
        cell1.innerHTML = `<img src="/Images/${picSrc}.jpg" alt="" width="200px">`;
        cell2.innerHTML = order[i].name;
        cell3.innerHTML = order[i].quantity
        cell4.innerHTML = order[i].price;
        cell5.innerHTML = '<a href="#" class="removeCart">Remove</a>';

        cell2.setAttribute('data-label', 'Name');
        cell3.setAttribute('data-label', 'Quantity');
        cell4.setAttribute('data-label', 'Price');
         } 
        else if (cart.innerHTML.includes(order[i].name)) {
            
            for (j = 0; j < cart.rows.length; j++) {
                let currentRow = cart.rows[j] ;
                
                if (currentRow.cells[1].innerHTML == order[i].name) {
                    
                    let currentQuantity = currentRow.cells[2].innerHTML;
                    currentQuantity = parseInt(currentQuantity);
                    let oldQuantity = parseInt(order[i].quantity);
                    let newQuantity = currentQuantity + oldQuantity;
                    currentRow.cells[2].innerHTML = newQuantity;
                }  
            }  
        }
        else {
            return
        }
    }
    
    let removeBtn = document.getElementsByClassName('removeCart');
    
    for(let i = 0; i < removeBtn.length; i++){

        cart = document.getElementById('cart');
        removeBtn[i].addEventListener('click', removeRow);
    }
    function removeRow(event) {
        
        event.preventDefault();
        buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        localStorage.removeItem('shoppingCart');
        shoppingCart = [];
        
        let table = document.getElementById("cart");
        
        for(let i = 1; i < table.rows.length-2; i++ ) {
            shoppingCart.push({
                name: table.rows[i].cells[1].innerHTML,
                price: table.rows[i].cells[3].innerHTML,
                quantity: table.rows[i].cells[2].innerHTML,
            })
        }
        console.log(shoppingCart)
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
        totalCart();
        insertToCart();
    }

    function totalCart() {
        let Totalcart = 0;
        let cart = 0;
        for(let i = 0; i < shoppingCart.length; i++){
            cart = shoppingCart[i].price.replace('£', '');
            cart = parseFloat(cart);
            cart = cart * parseFloat(shoppingCart[i].quantity);
            
            Totalcart += cart; 
                     
        }
        Totalcart = Totalcart.toFixed(2);
        let total = document.getElementById('Total');
        total.textContent = `£${Totalcart}`;
    }
    totalCart();

    const purchase = document.getElementById('purchase');
    purchase.addEventListener('click', purchased);

    function purchased() {
        localStorage.removeItem('shoppingCart');
    }

    const editQuantity = document.getElementById('edit')
    editQuantity.addEventListener('click', editTableQuantity)

    function editTableQuantity(e) {

        e.preventDefault()

        if (editQuantity.innerHTML == 'Done') {
            shoppingCart = []
            
            for (let i = 1; i < cart.rows.length-2; i++) {
                console.log(i)
                let newQuantity = cart.rows[i].cells[2].childNodes[0].value
                let newPrice = cart.rows[i].cells[3].innerHTML
                let newName = cart.rows[i].cells[1].innerHTML
                
                let newOrder = {
                    name: newName,
                    price: newPrice,
                    quantity: newQuantity,
                }
                shoppingCart.push(newOrder)
            }

            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
            location.reload()
        } else if (editQuantity.innerHTML == 'Edit') {
            editQuantity.innerHTML = 'Done'

            for (let i = 1; i < cart.rows.length-2; i++) {

                let quantity = cart.rows[i].cells[2].innerHTML

                cart.rows[i].cells[2].innerHTML = `<input class="itemQuantity" type="number" value="${quantity}"></input>`
            }
        } else return
    }
}






