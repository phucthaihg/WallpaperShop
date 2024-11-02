import ProductService from '/js/data/productService.js';
import CategoryService from '/js/data/categoryService.js';
import AccountService from '/js/data/accountService.js';

const productService = new ProductService();
const categoryService = new CategoryService();
const accountService = new AccountService();

const productFormE = document.getElementById('productForm');
const pageTitleE = document.getElementById('pageTitle');
const productCategoryE = document.getElementById('productCategory');
const productSubcategoryE = document.getElementById('productSubcategory');
const specificationsContainerE = document.getElementById('specificationsContainer');

const messageContainerE = document.getElementById('messageContainer');


document.addEventListener('DOMContentLoaded', () => {  
    // Populate categories
    updateCategories();

    // Get product ID from URL if editing
    const productId = new URLSearchParams(window.location.search).get('id');
    if (productId) {
        pageTitleE.textContent = 'Edit Product';
        const product = productService.getProductById(productId);
        if (product) {
            populateForm(product);
        } else {
            alert('Product not found');
            window.location.href = 'products-management.html';
        }
    } else {
        pageTitleE.textContent = 'Add New Product';
    }
    
});

function updateCategories() {
    productCategoryE.innerHTML = '';
    
    let option = document.createElement('option');
    option.value = '';
    option.textContent = 'Select a category';
    option.selected = true;
    productCategoryE.appendChild(option);

    const categories = categoryService.getAllCategories();
    categories.forEach(category => {
        option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        productCategoryE.appendChild(option);
    });

    console.log(productCategoryE.innerHTML);
}
// Event listener for category change
productCategoryE.addEventListener('change', () => {
    const selectedCategoryId = productCategoryE.value;
    updateSubcategories(selectedCategoryId);
});

function updateSubcategories(categoryId) {
    productSubcategoryE.innerHTML = '';

    let option = document.createElement('option');
    option.value = '';
    option.textContent = 'Select a subcategory';
    option.selected = true;
    productSubcategoryE.appendChild(option);

    if (categoryId) {
        const subcategories = categoryService.getSubcategoriesByCategoryId(categoryId);
        subcategories.forEach(subcategory => {
            option = document.createElement('option');
            option.value = subcategory.id;
            option.textContent = subcategory.name;
            productSubcategoryE.appendChild(option);
        });
    }
}

// Event listener for subcategory change
productSubcategoryE.addEventListener('change', () => {
    const selectedCategoryId = productCategoryE.value;
    const selectedSubcategoryId = productSubcategoryE.value;

    updateSpecifications(selectedCategoryId, selectedSubcategoryId);
});

function updateSpecifications(categoryId, subcategoryId) {
    console.log("updateSpecifications: ", categoryId, subcategoryId);
    specificationsContainerE.innerHTML = '';
    if (categoryId && subcategoryId) {
        const categorySpecs = categoryService.getSpecificationsBySubcategoryId(categoryId, subcategoryId);
        if (categorySpecs) {
            categorySpecs.forEach(spec => {
                const specWrapper = document.createElement('div');
                specWrapper.className = 'col-md-6 p-3';
                specWrapper.innerHTML = `
                    <label for="spec_${spec}" class="form-label">${spec}</label>
                    <input type="text" class="form-control" id="spec_${spec}" name="spec_${spec}" required>
                `;
                specificationsContainerE.appendChild(specWrapper);
            });
            
        }
    }
}

function populateForm(product) {
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    
    // Validate product category
    let categoryFound = false;
    for (let i = 0; i < productCategoryE.options.length; i++) {
        if (productCategoryE.options[i].value === product.category) {
            productCategoryE.value = product.category;
            categoryFound = true;
            // Manually trigger the change event to update subcategories
            const event = new Event('change');
            productCategoryE.dispatchEvent(event);
            break;
        }
    }
    if (!categoryFound) {
        showMessage('Invalid product category', false);
        return;
    }

    // Validate product subcategory
    let subcategoryFound = false;
    console.log(productSubcategoryE.innerHTML);
    for (let i = 0; i < productSubcategoryE.options.length; i++) {
        if (productSubcategoryE.options[i].value === product.subcategory) {
            productSubcategoryE.value = product.subcategory;
            subcategoryFound = true;
            // Manually trigger the change event to update subcategories
            const event = new Event('change');
            productSubcategoryE.dispatchEvent(event);
            break;
        }
    }
    if (!subcategoryFound) {
        showMessage('Invalid product subcategory', false);
        return;
    }

    document.getElementById('productPrice').value = product.price;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productImages').value = product.images.join('| ');
    
    // Populate specification fields
    Object.entries(product.specifications).forEach(([key, value]) => {
        const input = document.getElementById(`spec_${key}`);
        if (input) {
            input.value = value;
        }
    });
}

productFormE.addEventListener('submit', (e) => {
    e.preventDefault();
    const specifications = {};
    document.querySelectorAll('#specificationsContainerE input').forEach(input => {
        specifications[input.name.replace('spec_', '')] = input.value;
    });

    const product = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        subcategory: document.getElementById('productSubcategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value),
        description: document.getElementById('productDescription').value,
        images: document.getElementById('productImages').value.split('|').map(url => url.trim()),
        specifications: specifications
    };

    if (productId) {
        const result = productService.updateProduct(productId, product);
        if (result) {
            showMessage('Product updated successfully', true);
        } else {
            showMessage('Failed to update product', false);
        }
    } else {
        const result = productService.addProduct(product);
        if (result) {
            showMessage('Product added successfully', true);
        } else {
            showMessage('Failed to add product', false);
        }
    }

    //window.location.href = 'products-management.html';
});

function showMessage(message, isSuccess) {
    messageContainerE.textContent = message;
    messageContainerE.className = isSuccess ? 'alert alert-success' : 'alert alert-danger';
    messageContainerE.style.display = 'block';
}

// Check if the user is an admin
const currentUser = accountService.getCurrentUser();
if (!currentUser || !accountService.isAdmin(currentUser.id)) {
    showMessage('You do not have permission to access this page.', false);
    //alert('You do not have permission to access this page.');
    //window.location.href = '/'; // Redirect to home page
}