import ProductService from '/js/data/productService.js';
import CartService from '/js/data/cartService.js';

document.addEventListener('DOMContentLoaded', () => {    
    const productId = new URLSearchParams(window.location.search).get('id');
    if (productId) {
        displayProductDetails(productId);
        displayRelatedProducts(productId);
    } else {
        displayError('Product not found');
    }    
});

function displayProductDetails(productId) {
    const productService = new ProductService();
    const product = productService.getProductById(productId);
    if (product) {
        const productDetailElement = createProductDetailElement(product);
        document.getElementById('product-detail').innerHTML = productDetailElement;
    } else {
        displayError('Product not found');
    }
}

function createProductDetailElement(product) {
    return `
        <div class="col-md-6">
            <img src="${product.images[0]}" alt="${product.name}" class="img-fluid">
        </div>
        <div class="col-md-6">
            <h1>${product.name}</h1>
            <p class="lead">$${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button class="btn btn-primary btn-lg" onclick="addToCart('${product.id}')">Add to Cart</button>
        </div>
    `;
}

function displayRelatedProducts(productId) {
    const productService = new ProductService();
    console.log('Displaying related products for', productId);
    const currentProduct = productService.getProductById(productId);
    console.log('Current product:', currentProduct);
    console.log('All products:', productService.getAllProducts());
    const relatedProducts = productService.getProductsByCategory(currentProduct.category)
        .filter(p => p.category === currentProduct.category && p.id !== productId)
        .slice(0, 4);

    const relatedProductsContainer = document.getElementById('related-products');
    relatedProducts.forEach(product => {
        const productElement = createRelatedProductElement(product);
        relatedProductsContainer.innerHTML += productElement;
    });
}

function createRelatedProductElement(product) {
    return `
        <div class="col-md-3 mb-4">
            <div class="card">
                <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price.toFixed(2)}</p>
                    <a href="product-detail.html?id=${product.id}" class="btn btn-primary">View Details</a>
                </div>
            </div>
        </div>
    `;
}

function displayError(message) {
    document.getElementById('product-detail').innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger" role="alert">
                ${message}
            </div>
        </div>
    `;
}

// This function would be called when the "Add to Cart" button is clicked
function addToCart(productId) {
    // Implement your add to cart logic here
    console.log(`Adding product ${productId} to cart`);
    // Update cart count
    const cartService = new CartService();
    cartService.addToCart(productId);
    updateCartUI();
}

// Make addToCart function global so it can be called from inline onclick handlers
window.addToCart = addToCart;