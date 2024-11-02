import CartService   from './data/cartService.js';

document.addEventListener('DOMContentLoaded', function() {
    fetch('/pages/includes/header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        updateCartUI();
      });
  
    fetch('/pages/includes/footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
      });

    
  });

function updateCartUI() {
    const cartService = new CartService(); 
    const cartItems = cartService.getCart();

    // Update the cart icon in the navbar
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartBadge = document.querySelector('.bi-cart + .badge');
    if (cartBadge) {
      cartBadge.textContent = cartItemCount;
    }
  }

// Make updateCartUI function global so it can be called from inline onclick handlers
window.updateCartUI = updateCartUI;