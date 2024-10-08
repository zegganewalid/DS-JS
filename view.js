export const view = {
    renderProducts(filteredProducts) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; 

        const categories = [...new Set(filteredProducts.map(product => product.category))];

        categories.forEach(category => {
            const categoryRow = document.createElement('tr');
            const categoryCell = document.createElement('td');
            categoryCell.textContent = category;
            categoryCell.classList.add('category');
            categoryCell.setAttribute('colspan', 2); 
            categoryRow.appendChild(categoryCell);
            productList.appendChild(categoryRow);

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
