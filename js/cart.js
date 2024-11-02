import CartService from './data/cartService.js';
import ProductService from './data/productService.js';
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    updateCartPanel();

    const cartItemsContainer = document.getElementById('cartItems');
    
    // Event listener for removing items
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-icon')) {
            clickRemoveItem(event);
        }
    });

    // Event listener for quantity change
    cartItemsContainer.addEventListener('change', (event) => {
        if (event.target.classList.contains('quantity-input')) {
            clickUpdateQuantity(event);
        }
    });
});

function clickRemoveItem(event) {
    console.log('clickRemoveItem');
    const productId = event.target.getAttribute('data-id');

    const cartService = new CartService();
    cartService.removeItem(productId);
    location.reload(); // Reload the page to reflect changes
}

function clickUpdateQuantity(event) {
    console.log('clickUpdateQuantity');
    const productId = event.target.getAttribute('data-id');
    const newQuantity = parseInt(event.target.value);
    const cartService = new CartService();
    cartService.updateCartItemQuantity(productId, newQuantity);
    location.reload(); // Reload the page to reflect changes
}

function updateCartPanel() {
    console.log('updateCartPanel');
    const cartService = new CartService();
    const cartItems = cartService.getCart();
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');

    let totalPrice = 0;

    cartItems.forEach(item => {
        const productService = new ProductService();
        const product = productService.getProductById(item.id);

        const colDiv = document.createElement('div');
        //colDiv.className = 'col-md-8 mb-4';
        colDiv.innerHTML = `
            <div class="card h-100">
                <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Quantity: <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${product.id}"></p>
                    <p class="card-text"><strong>Price: $${(product.price * item.quantity).toFixed(2)}</strong></p>
                    <span class="remove-icon" data-id="${product.id}">🗑️ Remove</span>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(colDiv);
        totalPrice += product.price * item.quantity; // Add to total price
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;    
}