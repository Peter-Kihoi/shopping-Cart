const removeCartItem = document.querySelectorAll('.btn-danger');
const quantityInputs = document.querySelectorAll('.cart-quantity-input');

const addToCartButtons = document.querySelectorAll('.shop-item-button');

addToCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked )
})
removeCartItem.forEach((btn) => {
    btn.addEventListener('click', function(event)  {
        let btn = event.target
        btn.parentElement.parentElement.remove();
        updateCartTotal();
    } )
    }

)

quantityInputs.forEach((quantityInput) => {
    quantityInput.addEventListener('change', quantityChanged)
})

let purchaseBtn = document.querySelector('.btn-purchase');
purchaseBtn.addEventListener('click', () => {
    alert('Thank you for your purchase');

    var cartItems = document.querySelector('.cart-items');

    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal();
})


function addToCartClicked(event) {
    let btn = event.target;
    let shopItem = btn.parentElement.parentElement;
    let title = shopItem.querySelector('.shop-item-title').innerHTML;
    let price = shopItem.querySelector('.shop-item-price').innerHTML;
    let imgSrc = shopItem.querySelector('.shop-item-image').src;
    addItemToCart(title, price, imgSrc);
    updateCartTotal();


}

function addItemToCart(title, price, imgSrc) {
    let cartRow = document.createElement('div');
    cartRow.className = 'cart-row';
    var cartItems = document.querySelector('.cart-items');
    var cartItemNames = cartItems.querySelectorAll('.cart-item-title');

    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerHTML == title) {
            alert(title +' is already added to the cart')
            return
        }
    }
    
    let cartRowContent = `
    <div class="cart-item cart-column">
         <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
    `;
    cartRow.innerHTML = cartRowContent;

    cartItems.append(cartRow);
    let button = cartRow.querySelector('.btn-danger');
    button.addEventListener('click', () => {
        button.parentElement.parentElement.remove();
        updateCartTotal();
    })
   let quantity = cartRow.querySelector('.cart-quantity-input');
   quantity.addEventListener('change', quantityChanged);
}



function updateCartTotal() {
    var cartContainer = document.querySelector('.cart-items');
    var cartRows = cartContainer.querySelectorAll('.cart-row');
    let total = 0;
    cartRows.forEach((cartRow) => {
        var quantityElement = parseFloat(cartRow.querySelector('.cart-quantity-input').value);
        var priceElement = parseFloat(cartRow.querySelector('.cart-price').innerText.slice(1));
       
       total += ((priceElement * quantityElement));
    } )

    total = Math.round(total * 100) /100

    document.querySelector('.cart-total-price').innerHTML = '$' + total;

}

function quantityChanged(event) {
    input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    else {
        updateCartTotal();
    }
}
updateCartTotal();
