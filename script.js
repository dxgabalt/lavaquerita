document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');
    });
});


// Lista de ítems del menú
const menuItems = [
    { name: "Desmenuzada de Res con Gallo Pinto", price: 8.99, image: "desmenuzada_res.jpg" },
    // Agrega los demás ítems del menú aquí
];

// Carrito de compras
const cartItems = [];

// Función para agregar al carrito
function addToCart(button) {
    const menuItem = button.parentElement.parentElement;
    const itemName = menuItem.getAttribute("data-name");
    const itemPrice = parseFloat(menuItem.getAttribute("data-price"));

    // Añadir al carrito
    cartItems.push({ name: itemName, price: itemPrice });
    
    // Actualizar el carrito en la interfaz
    updateCartUI();
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cartItems.splice(index, 1); // Eliminar el ítem en la posición 'index'
    
    // Actualizar el carrito en la interfaz
    updateCartUI();
}

// Función para actualizar la interfaz del carrito
function updateCartUI() {
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    // Limpiar el carrito actual
    cartItemsList.innerHTML = "";

    // Llenar el carrito con los ítems actuales
    cartItems.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItemsList.appendChild(listItem);
    });

    // Calcular y mostrar el total del carrito
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
}

// Función para enviar el pedido al número de WhatsApp
function sendOrder() {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    // Construir el mensaje de pedido
    let message = `¡Nuevo pedido desde Leche Agría La Vaquerita!\n\nDetalle del pedido:\n`;

    cartItems.forEach(item => {
        message += `${item.name} - $${item.price.toFixed(2)}\n`;
    });

    message += `\nTotal: $${total.toFixed(2)}`;

    // Número de WhatsApp para enviar el pedido
    const whatsappNumber = "+50588966079";

    // Crear el enlace de WhatsApp
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Redirigir a WhatsApp para enviar el mensaje
    window.open(whatsappLink, "_blank");
}