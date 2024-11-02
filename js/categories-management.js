import CategoryService from '/js/data/categoryService.js';

const categoryService = new CategoryService();

document.addEventListener('DOMContentLoaded', () => {
    const categoriesTableBodyE = document.getElementById('categoriesTableBody');
    const messageContainerE = document.getElementById('messageContainer');

    function showMessage(message, isSuccess) {
        messageContainerE.textContent = message;
        messageContainerE.className = isSuccess ? 'alert alert-success' : 'alert alert-danger';
        messageContainerE.style.display = 'block';
    }

    function loadCategories() {
        // Fetch categories from the server or local storage
        const categories = categoryService.getAllCategories();
        categoriesTableBodyE.innerHTML = '';
        categories.forEach(category => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${category.id}</td>
                <td>${category.name}</td>
                <td>
                    <a href="category-edit.html?id=${category.id}" class="btn btn-sm btn-primary">Edit</a>
                    <button class="btn btn-sm btn-danger" onclick="deleteCategory(${category.id})">Delete</button>
                </td>
            `;
            categoriesTableBodyE.appendChild(row);
        });
    }

    function deleteCategory(id) {
        const success = categoryService.deleteCategory(id);
        if (success) {
            showMessage('Category deleted successfully', true);
            loadCategories();
        } else {
            showMessage('Failed to delete category', false);
        }
    }

    loadCategories();
});