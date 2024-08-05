const productList = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartProductsContainer = document.getElementById('cart-products');
const cartIcon = document.getElementById('cart-icon');
const checkoutButton = document.getElementById('checkout');
const clearCartButton = document.getElementById('clear-cart');
const closeCartButton = document.getElementById('close-cart');
const notificationContainer = document.getElementById('notification-container');

let products = [
    { id: 1, name: 'iPhone 11', price: 699, stock: 5, img: '../img/iphs/iph11.jpg', storage: [128, 256, 512] },
    { id: 2, name: 'iPhone 12', price: 799, stock: 3, img: '../img/iphs/iph12-red.png', storage: [128, 256, 512] },
    { id: 3, name: 'iPhone 13', price: 899, stock: 2, img: '../img/iphs/iph13.jpeg', storage: [128, 256, 512] },
    { id: 4, name: 'iPhone 14', price: 999, stock: 4, img: '../img/iphs/iph14.jpg', storage: [128, 256, 512] },
    { id: 5, name: 'iPhone 15', price: 1099, stock: 6, img: '../img/iphs/iph15-promax.jpg', storage: [128, 256, 512] },
    { id: 6, name: 'iPhone SE', price: 399, stock: 8, img: '../img/iphs/iph15.jpeg', storage: [128, 256, 512] }
];
let cart = [];

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;

    notificationContainer.appendChild(notification);

    notificationContainer.style.display = 'block';

    setTimeout(() => {
        notification.remove();
        if (!notificationContainer.hasChildNodes()) {
            notificationContainer.style.display = 'none';
        }
    }, 3000); // Oculta la notificación después de 3 segundos
}

function renderProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('card-product');
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="details">
                <h2>${product.name}</h2>
                <p>Precio: $${product.price.toFixed(2)}</p>
                <p>Stock: ${product.stock}</p>
                <label for="storage-select-${product.id}">Selecciona almacenamiento:</label>
                <select class="storage-select" data-id="${product.id}" id="storage-select-${product.id}">
                    <option value="">Selecciona una capacidad</option>
                    ${product.storage.map(size => `<option value="${size}">${size}GB</option>`).join('')}
                </select>
                <button class="agregar-carrito" data-id="${product.id}">Agregar al carrito</button>
                <p class="error-message" id="error-${product.id}" style="color: red; display: none;">Seleccione una capacidad de Almacenamiento</p>
            </div>
        `;
        productList.appendChild(productCard);
    });

    const addToCartButtons = document.querySelectorAll('.agregar-carrito');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function addToCart(event) {
    const productId = parseInt(event.target.dataset.id);
    const storageSelect = document.querySelector(`.storage-select[data-id="${productId}"]`);
    const selectedStorage = storageSelect.value;
    const errorMessage = document.getElementById(`error-${productId}`);

    if (!selectedStorage) {
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';

    const product = products.find(p => p.id === productId);

    if (product && product.stock > 0) {
        const cartItem = cart.find(item => item.id === productId && item.storage === selectedStorage);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ id: productId, name: product.name, price: product.price, quantity: 1, storage: selectedStorage, img: product.img });
        }
        product.stock -= 1;
        updateCartCount();
        renderProducts();
        showNotification(`Se ha agregado ${product.name} (${selectedStorage}GB) con éxito`, 'success');
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    renderCartItems();
}

function renderCartItems() {
    cartProductsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartProductsContainer.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <p>${item.name} (${item.storage}GB) - ${item.quantity} x $${item.price.toFixed(2)}</p>
                <button class="remove-item" data-id="${item.id}" data-storage="${item.storage}">Eliminar 1</button>
            `;
            cartProductsContainer.appendChild(cartItem);
        });
    }
    updateTotal();
}

function updateTotal() {
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('total-amount').textContent = `TOTAL: $${totalAmount.toFixed(2)}`;
}

function clearCart() {
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.stock += item.quantity;
        }
    });
    cart = [];
    updateCartCount();
    renderProducts();
    renderCartItems();
}

function removeFromCart(productId, storage) {
    const cartItem = cart.find(item => item.id === productId && item.storage === storage);
    if (cartItem) {
        const product = products.find(p => p.id === productId);
        if (product) {
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
                product.stock += 1;
            } else {
                cart = cart.filter(item => item.id !== productId || item.storage !== storage);
                product.stock += 1;
            }
            updateCartCount();
            renderCartItems();
            renderProducts(); // Actualiza la vista de productos después de eliminar
            showNotification('Producto eliminado del carrito', 'success');
        }
    }
}

cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    cartItemsContainer.classList.toggle('active');
});

checkoutButton.addEventListener('click', () => {
    showNotification('Compra realizada con éxito', 'success');
    clearCart();
});

clearCartButton.addEventListener('click', () => {
    clearCart();
});

closeCartButton.addEventListener('click', () => {
    cartItemsContainer.classList.remove('active');
});

cartProductsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const productId = parseInt(e.target.dataset.id);
        const storage = e.target.dataset.storage;
        removeFromCart(productId, storage);
    }
});

renderProducts();
updateCartCount();