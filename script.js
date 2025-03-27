let products = [];

async function fetchProducts() {
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('content').classList.add('hidden');

    try {
        const res = await fetch('https://fakestoreapi.com/products');
        products = await res.json();
        renderProducts(products);
        loadCategories(products);
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    } finally {
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('content').classList.remove('hidden');
    }
}

function renderProducts(filteredProducts) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    filteredProducts.forEach(product => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p><strong>${product.price} $</strong></p>
            </div>
        `;
    });
}

function loadCategories(products) {
    const categories = products.map(p => p.category).filter((value, index, self) => self.indexOf(value) === index);
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = `
    <option value="all">Все категории</option>
    `;
    categories.forEach(category => {
        categoryFilter.innerHTML += `<option value="${category}">${category.toUpperCase()}</option>`;
    });
}


document.getElementById('categoryFilter').addEventListener('change', function() {
    let filteredProducts = products;
    if (this.value !== 'all') {
        filteredProducts = products.filter(p => p.category === this.value);
    }
    renderProducts(filteredProducts);
});

document.getElementById('priceSort').addEventListener('change', function() {
    let sortedProducts = [...products];
    if (this.value === 'asc') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (this.value === 'desc') {
        sortedProducts.sort((a, b) => b.price - a.price);
    }
    renderProducts(sortedProducts);
});

setTimeout(fetchProducts, 1000);
