import ProductService   from './data/productService.js';
import CategoryService from './data/categoryService.js';
import testimonials from './data/testimonials.js';

document.addEventListener('DOMContentLoaded', () => {

    displayCategories();
    displayFeaturedProducts();
    displayTestimonials();
    //updateCartCount();

    /*
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    console.log(newsletterForm);
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Here you would typically send this email to your server or newsletter service
        console.log(`Subscribing email: ${email}`);
        
        // Clear the input and show a success message
        emailInput.value = '';
        alert('Thank you for subscribing to our newsletter!');
    });
    */
});

function displayCategories() {
    const categoryService = new CategoryService();
    const container = document.getElementById('categories-container');
    categoryService.getAllCategories().forEach(category => {
        const categoryElement = createCategoryElement(category);
        container.appendChild(categoryElement);
    });
}

function createCategoryElement(category) {
    const col = document.createElement('div');
    col.className = 'col-3 col-md-3 mb-4';

    col.innerHTML = `
        <a href="/pages/products/products.html?category=${category.id.toLowerCase()}" class="text-decoration-none">
            <div class="card h-100">
                <img src="${category.image}" class="card-img-top" alt="${category.name}">
                <div class="card-body">
                    <h5 class="card-title">${category.name}</h5>
                </div>
            </div>
        </a>
    `;

    return col;
}

function displayFeaturedProducts() {
    const productService = new ProductService();
    const container = document.getElementById('featured-products-container');
    const featuredProducts = productService.getFeaturedProducts().slice(0, 4);

    featuredProducts.forEach(product => {
        const productElement = createProductElement(product);
        container.appendChild(productElement);
    });
}

function createProductElement(product) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-3 col-md-3 mb-4';

    colDiv.innerHTML = `
        <div class="card h-100">
            <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description.slice(0, 50)}...</p>
                <p class="card-text mt-auto"><strong>$${product.price.toFixed(2)}</strong></p>
                <a href="/pages/products/product-detail.html?id=${product.id}" class="btn btn-primary mt-2">View Details</a>
            </div>
        </div>
    `;

    return colDiv;
}

function displayTestimonials() {
    const carouselInner = document.querySelector('#testimonial-carousel .carousel-inner');

    testimonials.forEach((testimonial, index) => {
        const testimonialElement = createTestimonialElement(testimonial, index === 0);
        carouselInner.appendChild(testimonialElement);
    });
}

function createTestimonialElement(testimonial, isActive) {
    const carouselItem = document.createElement('div');
    carouselItem.className = `carousel-item ${isActive ? 'active' : ''}`;

    carouselItem.innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="col-md-8 text-center">
                <p class="lead">"${testimonial.text}"</p>
                <p class="font-weight-bold">- ${testimonial.author}</p>
            </div>
        </div>
    `;

    return carouselItem;
}

/*
function updateCartCount() {
    // This is a placeholder function. In a real application, you would
    // get the cart count from your cart data structure or API.
    const cartCount = 0;
    const cartButton = document.querySelector('.btn-primary[href="cart.html"]');
    cartButton.textContent = `Cart (${cartCount})`;
}
    */

