import ProductService from '/js/data/productService.js';
import CategoryService from '/js/data/categoryService.js';

let categoryService;

document.addEventListener('DOMContentLoaded', () => {
    categoryService = new CategoryService();
    displayProducts();    
});

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        categoryId: params.get('category'),
        subcategoryId: params.get('subcategory')
    };
}

function filterProducts(categoryId, subcategoryId) {
    const productService = new ProductService();

    if (subcategoryId) {    
        return productService.getProductsBySubcategory(subcategoryId);
    } else if (categoryId) {
        return productService.getProductsByCategory(categoryId);
    } else {
        return productService.getAllProducts();
    }
}

function displayProducts() {
    
    const { categoryId, subcategoryId } = getUrlParams();
    const filteredProducts = filterProducts(categoryId, subcategoryId);
    
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Clear existing products
    
    filteredProducts.forEach(product => {
        const productElement = createProductElement(product);
        productContainer.appendChild(productElement);
    });
    
    updateBreadcrumbs(categoryId, subcategoryId);
}

function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'col-3 col-md-3 mb-4';
    productDiv.innerHTML = `
        <div class="card h-100">
            <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description.slice(0, 100)}...</p>
                <p class="card-text mt-auto"><strong>$${product.price.toFixed(2)}</strong></p>
                <a href="product-detail.html?id=${product.id}" class="btn btn-primary mt-2">View Details</a>
            </div>
        </div>
    `;
    return productDiv;
}

function updateBreadcrumbs(categoryId, subcategoryId) {
    const breadcrumbsElement = document.getElementById('breadcrumbs');
    breadcrumbsElement.innerHTML = `
        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
        <li class="breadcrumb-item"><a href="products.html">All Products</a></li>
    `;
    
    if (categoryId) {
        const category = categoryService.getCategoryById(categoryId);
        if (category) {
            breadcrumbsElement.innerHTML += `
                <li class="breadcrumb-item"><a href="products.html?category=${categoryId}">${category.name}</a></li>
            `;
        }
    }
    
    if (subcategoryId) {
        const category = categoryService.getCategoryById(categoryId);
        const subcategory = category?.subcategories.find(s => s.id === subcategoryId);
        if (subcategory) {
            breadcrumbsElement.innerHTML += `
                <li class="breadcrumb-item active" aria-current="page">${subcategory.name}</li>
            `;
        }
    }
}

function initializeCategoryFilters() {
    
    const filterContainer = document.getElementById('category-filters');
    
    const categories = categoryService.getAllCategories();
    categories.forEach(category => {
        const categoryElement = createCategoryFilterElement(category);
        filterContainer.appendChild(categoryElement);
    });
}

function createCategoryFilterElement(category) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'mb-3';
    categoryDiv.innerHTML = `
        <h5>${category.name}</h5>
        <div id="categories-container" class="row">
            ${category.subcategories.map(subcategory => createSubCategoryElement(category, subcategory).outerHTML).join('')}
        </div>        
    `;
    return categoryDiv;
}

function createSubCategoryElement(category, subcategory) {
    const col = document.createElement('div');
    col.className = 'col-2 col-md-2 mb-3';

    col.innerHTML = `
        <a href="products.html?category=${category.id}&subcategory=${subcategory.id}" class="text-decoration-none">
            <div class="card h-100">
                <div >
                    <img src="${subcategory.image}" class="card-img-top" alt="${subcategory.name}">
                </div>

                <div class="card-body text-center p-2">
                    <h5 class="card-title">${subcategory.name}</h5>
                </div>
            </div>
        </a>
    `;

    return col;
}

function updateCartCount() {
    // This is a placeholder function. In a real application, you would
    // get the cart count from your cart data structure or API.
    const cartCount = 0;
    const cartButton = document.querySelector('.btn-primary[href="cart.html"]');
    if (cartButton) {
        cartButton.textContent = `Cart (${cartCount})`;
    }
}