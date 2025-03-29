document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        document.getElementById("cart-count").textContent = cart.length;
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    function addToCart(name, price) {
        let existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        saveCart();
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let card = this.parentElement;
            let name = card.dataset.name;
            let price = parseFloat(card.dataset.price);
            addToCart(name, price);
        });
    });

    // Load Cart Items in `cart.html`
    if (document.getElementById("cart-items")) {
        function loadCart() {
            let cartTable = document.getElementById("cart-items");
            cartTable.innerHTML = "";
            let total = 0;

            cart.forEach((item, index) => {
                let subtotal = item.price * item.quantity;
                total += subtotal;

                let row = `
                    <tr>
                        <td>${item.name}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>
                            <button onclick="changeQuantity(${index}, -1)">-</button>
                            ${item.quantity}
                            <button onclick="changeQuantity(${index}, 1)">+</button>
                        </td>
                        <td>$${subtotal.toFixed(2)}</td>
                        <td><button onclick="removeItem(${index})">🗑</button></td>
                    </tr>
                `;
                cartTable.innerHTML += row;
            });

            document.getElementById("total-price").textContent = total.toFixed(2);
        }

        window.changeQuantity = function (index, amount) {
            if (cart[index].quantity + amount > 0) {
                cart[index].quantity += amount;
            } else {
                cart.splice(index, 1);
            }
            saveCart();
            loadCart();
        };

        window.removeItem = function (index) {
            cart.splice(index, 1);
            saveCart();
            loadCart();
        };

        loadCart();
    }
});
      
