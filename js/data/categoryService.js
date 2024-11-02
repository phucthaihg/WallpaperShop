// /js/data/categoryService.js

import { categoryData } from './categoryData.js';

class CategoryService {
  
  #categories
  #storageKey

  constructor() {
    this.#categories = [];
    this.#storageKey = 'categoryData';
    this.loadCategories();
  }

  /*
  async init() {
    await this.loadCategories();
  }
*/

  async loadCategories() {
    try {
      // First, try to load from localStorage
      const storedData = localStorage.getItem(this.#storageKey);
      if (storedData) {
        this.#categories = JSON.parse(storedData);
      } else {
        // If not in localStorage, fetch from the file
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.#categories = data;
        // Save to localStorage for future use
        await this.saveCategories();
      }
    } catch (err) {
      console.error('Error loading categories:', err);
      this.#categories = [];
    }
  }

  getAllCategories() {
    return this.#categories;
  }

  getCategoryById(id) {
    return this.#categories.find(category => category.id === id);
  }

  // Update Category
  async updateCategory(updatedCategory) {
    const index = this.#categories.findIndex(category => category.id === updatedCategory.id);
    if (index !== -1) {
      this.#categories[index] = updatedCategory;
      await this.saveCategories();
    }
  }

  // Add New Category
  async addCategory(newCategory) {
    this.#categories.push(newCategory);
    await this.saveCategories();
  }

  // Delete A Category
  async deleteCategory(id) {
    const index = this.#categories.findIndex(category => category.id === id);
    if (index !== -1) {
      this.#categories.splice(index, 1);
      await this.saveCategories();
    }
  }

  // Save Category to DB
  async saveCategories() {
    try {
      localStorage.setItem(this.#storageKey, JSON.stringify(this.#categories));
    } catch (err) {
      console.error('Error saving categories:', err);
    }
  }
}

export default CategoryService;