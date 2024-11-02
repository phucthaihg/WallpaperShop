import ProductService from '/js/data/productService.js';
import AccountService from '/js/data/accountService.js';

const productService = new ProductService();
const accountService = new AccountService();

const productTableBody = document.getElementById('productTableBody');

function renderProductTable() {
    productTableBody.innerHTML = '';
    productService.getAllProducts().forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.subcategory}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>
                <a href="product-edit.html?id=${product.id}" class="btn btn-sm btn-primary">Edit</a>
                <button class="btn btn-sm btn-danger delete-product" data-id="${product.id}">Delete</button>
            </td>
        `;
        productTableBody.appendChild(row);
    });
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        productService.deleteProduct(id);
        renderProductTable();
    }
}

// Event listeners
productTableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-product')) {
        const productId = parseInt(e.target.dataset.id);
        deleteProduct(productId);
    }
});

// Initial render
renderProductTable();

// Check if the user is an admin
const currentUser = accountService.getCurrentUser();
if (!currentUser || !accountService.isAdmin(currentUser.id)) {
    alert('You do not have permission to access this page.');
    window.location.href = '/'; // Redirect to home page
}