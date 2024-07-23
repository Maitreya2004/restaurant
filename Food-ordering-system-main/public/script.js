document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/food-items')
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById('menu');
            data.forEach(item => {
                const foodItemElement = document.createElement('div');
                foodItemElement.className = 'food-item';
                foodItemElement.innerHTML = `
                    <img src="${item.image_url}" alt="${item.name}">
                    <div class="food-details">
                        <h3>${item.name}</h3>
                        <p>Rs.${item.price}</p>
                        <div class="quantity-control">
                            <button class="quantity-btn" onclick="decreaseQuantity(this)">-</button>
                            <input type="text" class="quantity-input" value="0" readonly>
                            <button class="quantity-btn" onclick="increaseQuantity(this)">+</button>
                        </div>
                        <button onclick="addToCart(${item.id})">Add to Cart</button>
                    </div>
                `;
                menuItems.appendChild(foodItemElement);
            });
        });
});

function decreaseQuantity(button) {
    let input = button.nextElementSibling;
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function increaseQuantity(button) {
    let input = button.previousElementSibling;
    input.value = parseInt(input.value) + 1;
}

function addToCart(itemId) {
    const quantity = document.querySelector(`.food-item[data-id="${itemId}"] .quantity-input`).value;
    fetch('/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item_id: itemId, quantity: quantity })
    }).then(response => response.text())
      .then(data => alert(data));
}
