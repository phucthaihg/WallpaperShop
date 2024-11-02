class CartService {
    #cartItems
    #storageKey

    constructor() {
        this.#cartItems = [];
        this.#storageKey = 'cartData';
        this.loadCart();
    }

    // Get Cart from localStorage
    async loadCart() {
        try {
          // First, try to load from localStorage
          const storedData = localStorage.getItem(this.#storageKey);
          if (storedData) {
            this.#cartItems = JSON.parse(storedData);
          } 
        } catch (err) {
          console.error('Error loading cart:', err);
          this.#cartItems = [];
        }
      }
  
    // Get cart
    getCart(){
        return this.#cartItems;
    }

    // Add product to cart
    async addToCart(productId) {
      console.log('addToCart', productId);
      
      // Check if the product is already in the cart
      const index = this.#cartItems.findIndex(item => item.id === productId);
  
      if (index !== -1) {
        // If the item is already in the cart, increase its quantity
        this.#cartItems[index].quantity += 1;
      } else {
        // If it's a new item, add it to the cart with quantity 1
        this.#cartItems.push({ id: productId, quantity: 1 });
      }
      await this.saveCart();
    }
    
    // Remove product from cart
    async removeFromCart(productId) {
      this.#cartItems = this.#cartItems.filter(item => item.id !== productId);
      await this.saveCart();
    }
  
    // Update Item Quantity
    async updateCartItemQuantity(productId, quantity) {
      const item = this.#cartItems.find(i => i.id === productId);
      if (item) {
        item.quantity = quantity;
        await this.saveCart();
      }
    }
  
    // Clear Cart
    async clearCart() {
        this.#cartItems = [];
        await this.saveCart();
    }
  
    // Get Total Price of Cart
    getCartTotal() {
      return this.#cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  
    // Save Cart into Local Storage
    async saveCart(){
        try {
            localStorage.setItem(this.#storageKey, JSON.stringify(this.#cartItems));
          } catch (err) {
            console.error('Error saving cart:', err);
          }
    }
  }
  
  export default CartService;