export const view = {
    renderProducts(filteredProducts) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Clear current products

        // Unique categories extraction
        const categories = [...new Set(filteredProducts.map(product => product.category))];

        // Render each category and its products
        categories.forEach(category => {
            const categoryRow = document.createElement('tr');
            const categoryCell = document.createElement('td');
            categoryCell.textContent = category;
            categoryCell.classList.add('category');
            categoryCell.setAttribute('colspan', 2); 
            categoryRow.appendChild(categoryCell);
            productList.appendChild(categoryRow);

            // Render products for each category
            filteredProducts
                .filter(product => product.category === category)
                .forEach(product => {
                    const productRow = document.createElement('tr');

                    const nameCell = document.createElement('td');
                    nameCell.textContent = product.name;
                    if (!product.stocked) {
                        nameCell.classList.add('out-of-stock');
                    }

                    const priceCell = document.createElement('td');
                    priceCell.textContent = product.price;

                    productRow.appendChild(nameCell);
                    productRow.appendChild(priceCell);
                    productList.appendChild(productRow);
                });
        });
    },
};
