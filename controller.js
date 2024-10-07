import { products } from './model.js';
import { view } from './view.js';

export const controller = {
    initialize() {
        const searchBar = document.getElementById('search-bar');
        const inStockCheckbox = document.getElementById('in-stock');

        searchBar.addEventListener('input', this.filterProducts);
        inStockCheckbox.addEventListener('change', this.filterProducts);

        this.filterProducts();
    },

    filterProducts() {
        const searchTerm = document.getElementById('search-bar').value.toLowerCase();
        const inStockOnly = document.getElementById('in-stock').checked;

        const filteredProducts = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm);
            const matchesStock = !inStockOnly || product.stocked;
            return matchesSearch && matchesStock;
        });

        view.renderProducts(filteredProducts);
    },
};
