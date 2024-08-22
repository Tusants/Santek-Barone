const products = [
    { id: 1, name: 'iPhone 11', price: 699, stock: 5, img: 'img/iphs/iph11.jpg', storage: [128, 256, 512] },
    { id: 2, name: 'iPhone 12', price: 799, stock: 3, img: 'img/iphs/iph12-red.png', storage: [128, 256, 512] },
    { id: 3, name: 'iPhone 13', price: 899, stock: 2, img: 'img/iphs/iph13.jpeg', storage: [128, 256, 512] },
    { id: 4, name: 'iPhone 14', price: 999, stock: 4, img: 'img/iphs/iph14.jpg', storage: [128, 256, 512] },
    { id: 5, name: 'iPhone 15', price: 1099, stock: 6, img: 'img/iphs/iph15-promax.jpg', storage: [128, 256, 512] },
    { id: 6, name: 'iPhone SE', price: 399, stock: 8, img: 'img/iphs/iph15.jpeg', storage: [128, 256, 512] }
];

const searchBar = document.getElementById('search-bar');
const searchResults = document.getElementById('search-results');

searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    if (query === '') {
        searchResults.innerHTML = '';
    } else {
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
        renderSearchResults(filteredProducts);
    }
});

function renderSearchResults(products) {
    searchResults.innerHTML = '';
    if (products.length === 0) {
        searchResults.innerHTML = '<p>No se encontraron productos.</p>';
    } else {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('producto', 'card');
            productCard.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.storage.join(' / ')} Gb</p>
                <p>$${product.price}</p>
            `;
            searchResults.appendChild(productCard);
        });
    }
}

function renderFeaturedProducts() {
    const featuredProductsContainer = document.querySelector('#productos-destacados .productos');
    featuredProductsContainer.innerHTML = '';
    products.slice(0, 4).forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('producto', 'card');
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.storage.join(' / ')} Gb</p>
            <p>$${product.price}</p>
        `;
        featuredProductsContainer.appendChild(productCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedProducts();
});