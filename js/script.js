// ==========================================
// MENU MOBILE
// ==========================================

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");


if (menuButton && nav) {

    menuButton.addEventListener("click", function () {

        nav.classList.toggle("active");

    });

}


document.querySelectorAll(".nav a").forEach(function (link) {

    link.addEventListener("click", function () {

        if (nav) {

            nav.classList.remove("active");

        }

    });

});



// ==========================================
// FILTRO DO CARDÁPIO
// ==========================================

const filterButtons =
    document.querySelectorAll(".filter-button");

const foodCards =
    document.querySelectorAll(".food-card");


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {


        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const category =
            button.dataset.category;


        foodCards.forEach(function (card) {


            if (
                category === "todos" ||
                card.dataset.category === category
            ) {

                card.style.display = "block";


                setTimeout(function () {

                    card.style.opacity = "1";

                    card.style.transform =
                        "translateY(0)";

                }, 20);


            } else {

                card.style.display = "none";

            }

        });

    });

});



// ==========================================
// CARRINHO
// ==========================================

let cart = [];


const cartButton =
    document.getElementById("cartButton");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");



// ABRIR CARRINHO

if (cartButton) {

    cartButton.addEventListener("click", function () {

        cartOverlay.classList.add("active");

        document.body.classList.add("modal-open");

    });

}



// FECHAR CARRINHO

if (closeCart) {

    closeCart.addEventListener("click", function () {

        cartOverlay.classList.remove("active");

        document.body.classList.remove("modal-open");

    });

}



// CLICAR FORA

if (cartOverlay) {

    cartOverlay.addEventListener("click", function (event) {

        if (event.target === cartOverlay) {

            cartOverlay.classList.remove("active");

            document.body.classList.remove("modal-open");

        }

    });

}



// ==========================================
// TOAST
// ==========================================

const toast =
    document.getElementById("toast");


let toastTimer;


function showToast() {

    if (!toast) {
        return;
    }


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(function () {

        toast.classList.remove("show");

    }, 2200);

}



// ==========================================
// ADICIONAR PRODUTO
// ==========================================

document.querySelectorAll(".add-button").forEach(function (button) {


    button.addEventListener("click", function () {


        const name =
            button.dataset.name;


        const price =
            Number(button.dataset.price);


        const existing =
            cart.find(function (item) {

                return item.name === name;

            });


        if (existing) {

            existing.quantity++;

        } else {

            cart.push({

                name: name,

                price: price,

                quantity: 1

            });

        }


        updateCart();


        cartOverlay.classList.add("active");

        document.body.classList.add("modal-open");


        showToast();


    });

});



// ==========================================
// ATUALIZAR CARRINHO
// ==========================================

function updateCart() {


    if (!cartItems) {
        return;
    }


    cartItems.innerHTML = "";


    if (cart.length === 0) {


        cartItems.innerHTML = `

            <p class="empty-cart">

                Seu pedido está vazio.

            </p>

        `;


    } else {


        cart.forEach(function (item, index) {


            const subtotal =
                item.price * item.quantity;


            const element =
                document.createElement("div");


            element.className =
                "cart-item";


            element.innerHTML = `

                <div class="cart-item-info">

                    <strong>
                        ${item.name}
                    </strong>

                    <span>
                        R$ ${money(item.price)} cada
                    </span>

                    <small>
                        Subtotal:
                        R$ ${money(subtotal)}
                    </small>

                </div>


                <div class="quantity-controls">


                    <button
                        class="quantity-button"
                        data-action="minus"
                        data-index="${index}">

                        −

                    </button>


                    <strong>
                        ${item.quantity}
                    </strong>


                    <button
                        class="quantity-button"
                        data-action="plus"
                        data-index="${index}">

                        +

                    </button>


                    <button
                        class="remove-item"
                        data-action="remove"
                        data-index="${index}">

                        🗑️

                    </button>


                </div>

            `;


            cartItems.appendChild(element);

        });

    }



    let quantity = 0;

    let total = 0;


    cart.forEach(function (item) {

        quantity += item.quantity;

        total +=
            item.price *
            item.quantity;

    });


    cartCount.textContent =
        quantity;


    cartTotal.textContent =
        "R$ " + money(total);

}



// ==========================================
// CONTROLES DO CARRINHO
// ==========================================

if (cartItems) {


    cartItems.addEventListener("click", function (event) {


        const button =
            event.target.closest("button");


        if (!button) {
            return;
        }


        const action =
            button.dataset.action;


        const index =
            Number(button.dataset.index);


        if (
            Number.isNaN(index) ||
            !cart[index]
        ) {

            return;

        }



        if (action === "plus") {

            cart[index].quantity++;

        }



        if (action === "minus") {


            if (cart[index].quantity > 1) {

                cart[index].quantity--;

            } else {

                cart.splice(index, 1);

            }

        }



        if (action === "remove") {

            cart.splice(index, 1);

        }


        updateCart();

    });

}



// ==========================================
// FORMATAÇÃO DE DINHEIRO
// ==========================================

function money(value) {

    return value
        .toFixed(2)
        .replace(".", ",");

}



// ==========================================
// MODAL DO CLIENTE
// ==========================================

const checkoutButton =
    document.getElementById("checkoutButton");

const customerOverlay =
    document.getElementById("customerOverlay");

const closeCustomer =
    document.getElementById("closeCustomer");



if (checkoutButton) {


    checkoutButton.addEventListener("click", function () {


        if (cart.length === 0) {


            alert(
                "Seu pedido está vazio."
            );


            return;

        }


        cartOverlay.classList.remove("active");


        // GARANTE QUE O MODAL FIQUE DIRETAMENTE NO BODY

        if (
            customerOverlay.parentElement !==
            document.body
        ) {

            document.body.appendChild(
                customerOverlay
            );

        }


        customerOverlay.classList.add("active");

        document.body.classList.add("modal-open");


    });

}



// ==========================================
// FECHAR MODAL CLIENTE
// ==========================================

if (closeCustomer) {


    closeCustomer.addEventListener("click", function () {


        customerOverlay.classList.remove("active");


        document.body.classList.remove(
            "modal-open"
        );


    });

}



if (customerOverlay) {


    customerOverlay.addEventListener(
        "click",
        function (event) {


            if (
                event.target ===
                customerOverlay
            ) {


                customerOverlay.classList.remove(
                    "active"
                );


                document.body.classList.remove(
                    "modal-open"
                );


            }

        }
    );

}



// ==========================================
// ENTREGA / RETIRADA
// ==========================================

const deliveryOptions =
    document.querySelectorAll(
        'input[name="delivery"]'
    );


const addressGroup =
    document.getElementById("addressGroup");


const customerAddress =
    document.getElementById("customerAddress");


deliveryOptions.forEach(function (option) {


    option.addEventListener("change", function () {


        if (this.value === "Retirada") {


            addressGroup.style.display =
                "none";


            customerAddress.required =
                false;


        } else {


            addressGroup.style.display =
                "block";


            customerAddress.required =
                true;


        }

    });

});



// ==========================================
// FORMULÁRIO
// ==========================================

const customerForm =
    document.getElementById("customerForm");


if (customerForm) {


    customerForm.addEventListener(
        "submit",
        function (event) {


            event.preventDefault();



            const name =
                document
                    .getElementById("customerName")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("customerPhone")
                    .value
                    .trim();


            const delivery =
                document.querySelector(
                    'input[name="delivery"]:checked'
                ).value;


            const address =
                document
                    .getElementById("customerAddress")
                    .value
                    .trim();


            const payment =
                document
                    .getElementById("paymentMethod")
                    .value;


            const notes =
                document
                    .getElementById("orderNotes")
                    .value
                    .trim();



            // ======================================
            // MONTAR PEDIDO
            // ======================================

            let message =
                "🍽️ *NOVO PEDIDO - BELLA TAVOLA*\n\n";


            message +=
                "👤 *CLIENTE*\n";


            message +=
                "Nome: " +
                name +
                "\n";


            message +=
                "WhatsApp: " +
                phone +
                "\n\n";


            message +=
                "📦 *RECEBIMENTO*\n";


            message +=
                delivery +
                "\n";


            if (
                delivery === "Entrega"
            ) {


                message +=
                    "Endereço: " +
                    address +
                    "\n";

            }


            message += "\n";


            message +=
                "💳 *PAGAMENTO*\n";


            message +=
                payment +
                "\n\n";


            message +=
                "🛒 *PEDIDO*\n";



            let total = 0;



            cart.forEach(function (item) {


                const subtotal =
                    item.price *
                    item.quantity;


                total += subtotal;


                message +=

                    item.quantity +
                    "x " +
                    item.name +
                    " - R$ " +
                    money(subtotal) +
                    "\n";


            });



            message += "\n";


            message +=
                "💰 *TOTAL: R$ " +
                money(total) +
                "*\n";



            if (notes !== "") {


                message +=
                    "\n📝 *OBSERVAÇÕES*\n";


                message +=
                    notes +
                    "\n";

            }



            message +=
                "\nObrigado! 😊";



            // ======================================
            // WHATSAPP
            // ======================================

            const restaurantPhone =
                "5592999999999";


            const whatsapp =
                "https://wa.me/" +
                restaurantPhone +
                "?text=" +
                encodeURIComponent(message);


            window.open(
                whatsapp,
                "_blank"
            );


        }
    );

}



// ==========================================
// GALERIA / LIGHTBOX
// ==========================================

const galleryItems =
    document.querySelectorAll(".gallery-item");


const lightbox =
    document.getElementById("lightbox");


const lightboxImage =
    document.getElementById("lightboxImage");


const lightboxClose =
    document.getElementById("lightboxClose");



galleryItems.forEach(function (item) {


    item.addEventListener("click", function () {


        const image =
            item.dataset.image;


        lightboxImage.src =
            image;


        lightbox.classList.add(
            "active"
        );


        document.body.classList.add(
            "modal-open"
        );


    });

});



if (lightboxClose) {


    lightboxClose.addEventListener(
        "click",
        function () {


            lightbox.classList.remove(
                "active"
            );


            document.body.classList.remove(
                "modal-open"
            );


        }
    );

}



if (lightbox) {


    lightbox.addEventListener(
        "click",
        function (event) {


            if (
                event.target ===
                lightbox
            ) {


                lightbox.classList.remove(
                    "active"
                );


                document.body.classList.remove(
                    "modal-open"
                );


            }

        }
    );

}



// ==========================================
// FECHAR MODAIS COM ESC
// ==========================================

document.addEventListener(
    "keydown",
    function (event) {


        if (event.key !== "Escape") {

            return;

        }


        if (cartOverlay) {

            cartOverlay.classList.remove(
                "active"
            );

        }


        if (customerOverlay) {

            customerOverlay.classList.remove(
                "active"
            );

        }


        if (lightbox) {

            lightbox.classList.remove(
                "active"
            );

        }


        document.body.classList.remove(
            "modal-open"
        );

    }
);



// ==========================================
// ANIMAÇÕES AO ROLAR
// ==========================================

const revealElements =
    document.querySelectorAll(".reveal");



const revealObserver =
    new IntersectionObserver(
        function (entries) {


            entries.forEach(function (entry) {


                if (entry.isIntersecting) {


                    entry.target.classList.add(
                        "visible"
                    );


                    revealObserver.unobserve(
                        entry.target
                    );


                }

            });

        },
        {
            threshold: 0.12
        }
    );



revealElements.forEach(function (element) {

    revealObserver.observe(element);

});



// ==========================================
// INICIAR
// ==========================================

updateCart();
