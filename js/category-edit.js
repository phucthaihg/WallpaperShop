import CategoryService from '/js/data/categoryService.js';

// Global variables
let categoryFormElement, subcategoriesListElement, addSubcategoryBtnElement;
const categoryService = new CategoryService();
let category;

const mockSpecifications = [
    { id: 'material', name: 'Material' },
    { id: 'rollDimensions', name: 'Roll Dimensions' },
    { id: 'pattern', name: 'Pattern' },
    { id: 'washability', name: 'Washability' }
];



/*
const mockCategory = {
    id: 1,
    name: "Giấy Dán Tường",
    description: "Giay dan tung",
    image: "https://res.cloudinary.com/gimmersta-wallpaper/image/upload/c_fill,f_auto,fl_progressive,q_auto,w_200,h_200/v1711026611/cronos-rw/product-group/designer.jpg",
    subcategories: [
        {
            id: "modern",
            name: "Hiện Đại",
            description: "phong cach hien dai",
            image: "https://res.cloudinary.com/gimmersta-wallpaper/image/upload/c_fill,f_auto,fl_progressive,q_auto,w_500,h_500/v1711632468/articles/R20468_interior1.jpg",
            specifications: ["material", "rollDimensions", "pattern", "washability"]
        }
    ]
};
*/

// DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    categoryFormElement = document.getElementById('category-form');
    subcategoriesListElement = document.getElementById('subcategories-list');
    addSubcategoryBtnElement = document.getElementById('add-subcategory-btn');

    (async function() {
        await categoryService.init();

        // Check if URL has category ID
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('id');
        
        if (categoryId) {
            category = categoryService.getCategoryById(categoryId);
            loadCategoryData(category);
        } else {
            alert("No category ID provided in the URL.");
            window.location.href = "/categories.html"; // Redirect to categories list page
        }

        setupEventListeners();
    })();
});

// Event Listeners
function setupEventListeners() {
    categoryFormElement.addEventListener('submit', (event) => {
        event.preventDefault();
        updateCategory();
    });
    
    addSubcategoryBtnElement.addEventListener('click', () => {
        loadSubcategory({});
    });
}

// Functions
function loadCategoryData(categoryData) {
    // Fetch category data from server or local storage
    // For demonstration, we'll use a mock category object
    

    // Populate category form with data
    document.getElementById('category-id').value = categoryData.id;
    document.getElementById('category-name').value = categoryData.name;
    document.getElementById('category-description').value = categoryData.description;
    document.getElementById('category-image').value = categoryData.image;

    // Populate subcategories
    categoryData.subcategories.forEach(subcategory => {
        loadSubcategory(subcategory);
    });
}

function loadSubcategory(subcategoryData = {}) {
    if (!subcategoryData.id) {
        subcategoryData.id = generateUUID();
    }
    const subcategoryElement = createSubcategoryElement(subcategoryData);

    // Load specifications
    const specificationsListElement = subcategoryElement.querySelector('.specifications-list');
    const newSpecificationSelectElement = subcategoryElement.querySelector('.new-specification');
    const addSpecificationBtnElement = subcategoryElement.querySelector('.add-specification-btn');

    if (subcategoryData.specifications) {
        subcategoryData.specifications.forEach(specId => {
            const spec = mockSpecifications.find(s => s.id === specId);
            if (spec) {
                const specificationElement = createSpecificationElement(spec);
                specificationsListElement.appendChild(specificationElement);

                const deleteSpecBtnElement = specificationElement.querySelector('.delete-specification-btn');

                if (deleteSpecBtnElement) {
                    deleteSpecBtnElement.addEventListener('click', () => {
                        deleteSpecification(spec.id, specificationElement);
                    });
                }
                
            }
        });
    }

    if (addSpecificationBtnElement) {
        addSpecificationBtnElement.addEventListener('click', () => {
            const selectedSpecId = newSpecificationSelectElement.value;
            const selectedSpec = mockSpecifications.find(spec => spec.id === selectedSpecId);
            const specificationElement = createSpecificationElement(selectedSpec);
            specificationsListElement.appendChild(specificationElement);

            const deleteSpecBtn = specificationElement.querySelector('.delete-specification-btn');
            if (deleteSpecBtn) {
                deleteSpecBtn.addEventListener('click', () => {
                    deleteSpecification(selectedSpec.id, specificationElement);
                });
            }
        });
    }

    const deleteSubcategoryBtn = subcategoryElement.querySelector('.delete-subcategory-btn');
    if (deleteSubcategoryBtn) {
        deleteSubcategoryBtn.addEventListener('click', () => {
            deleteSubcategory(subcategoryData.id, subcategoryElement);
        });
    }

    subcategoriesListElement.appendChild(subcategoryElement);
}

function createSubcategoryElement(subcategoryData = {}) {
    const subcategoryElement = document.createElement('div');
    subcategoryElement.className = 'subcategory mt-4 border p-3';
    subcategoryElement.innerHTML = `
        <form class="subcategory-form">
            <input type="hidden" class="subcategory-id" value="${subcategoryData.id || ''}">
            <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control subcategory-name" required value="${subcategoryData.name || ''}">
            </div>
            <div class="mb-3">
                <label class="form-label">Description</label>
                <input type="text" class="form-control subcategory-description" required value="${subcategoryData.description || ''}">
            </div>
            <div class="mb-3">
                <label class="form-label">Image URL</label>
                <input type="text" class="form-control subcategory-image" required value="${subcategoryData.image || ''}">
            </div>
            <div class="mb-3">
                <label class="form-label">Specifications</label>
                <div class="specifications-list border p-3"></div>
                <div class="input-group mt-2">
                    <select class="form-select new-specification">
                        ${mockSpecifications.map(spec => `<option value="${spec.id}" ${subcategoryData.specifications && subcategoryData.specifications.includes(spec.id) ? 'selected' : ''}>${spec.name}</option>`).join('')}
                    </select>
                    <button type="button" class="btn btn-secondary add-specification-btn">Add</button>
                </div>
            </div>
            <button type="button" class="btn btn-danger delete-subcategory-btn">Delete Subcategory</button>
        </form>
        <hr>
    `;
    return subcategoryElement;
}

function createSpecificationElement(spec) {
    const specificationElement = document.createElement('div');
    specificationElement.className = 'input-group mb-2';
    specificationElement.innerHTML = `
        <input type="text" class="form-control specification-name" readonly value="${spec.name}" data-spec-id="${spec.id}">
        <button type="button" class="btn btn-danger delete-specification-btn">Delete</button>
    `;
    return specificationElement;
}

function deleteSpecification(specId, specificationElement) {
    // Logic to delete specification by ID
    console.log(`Deleting specification with ID: ${specId}`);
    specificationElement.remove();
}

function deleteSubcategory(subcategoryId, subcategoryElement) {
    // Logic to delete subcategory by ID
    console.log(`Deleting subcategory with ID: ${subcategoryId}`);
    subcategoryElement.remove();
}

function updateCategory() {
    console.log('Updating category');
    category.name = document.getElementById('category-name').value;
    category.description = document.getElementById('category-description').value;
    category.image = document.getElementById('category-image').value;

    category.subcategories = Array.from(subcategoriesListElement.querySelectorAll('.subcategory')).map(subcategoryElement => {
        const subcategoryId = subcategoryElement.querySelector('.subcategory-id').value;
        const subcategoryName = subcategoryElement.querySelector('.subcategory-name').value;
        const subcategoryDescription = subcategoryElement.querySelector('.subcategory-description').value;
        const subcategoryImage = subcategoryElement.querySelector('.subcategory-image').value;
        const specifications = Array.from(subcategoryElement.querySelectorAll('.specification-name')).map(spec => spec.dataset.specId);

        return {
            id: subcategoryId,
            name: subcategoryName,
            description: subcategoryDescription,
            image: subcategoryImage,
            specifications: specifications
        };
    });
    console.log('Category:', category);
    categoryService.updateCategory(category);
    console.log('CategoryService:', categoryService.getAllCategories());
    console.log('Category updated');
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


