// Open and close mobile menu
const btnMenu = document.getElementById("mobile-menu-button");
const cartMenu = document.getElementById("cart");
const mobileMenu = document.getElementById("mobile-menu");
const dropdownBtn = document.getElementById("dropdown");
const products = document.querySelector(".cards-container");
const btnShow = document.querySelector(".btn-ShowMore");
const categoryList = document.querySelectorAll(".category");
const categoriesContainer = document.querySelector(".categories");
const cartProducts = document.querySelector(".cart-container");
const cartBtn = document.querySelector(".cart-label");
const cartBubble = document.querySelector(".cart-bubble");
const overlay = document.querySelector(".overlay");
const filterBtn = document.querySelector(".filter-btn");
const total = document.querySelector(".total");
const buyBtn = document.querySelector(".buy-btn");
const deleteBtn = document.querySelector(".delete-btn");
const addBtn = document.querySelector(".add-btn");
const modal = document.querySelector(".add-modal");
const barsMenu = document.querySelector(".navbar-list");
const body = document.querySelector("body");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
    localStorage.setItem("cart", JSON.stringify(cartList));
};

// open/close the filter when the user clicks on the button
const toggleFilter = () => {
    if (dropdownBtn.classList.contains("hidden")) {
        dropdownBtn.classList.remove("hidden");
    } else {
        dropdownBtn.classList.add("hidden");
    }
};

//open/close Mobile menu
const toggleMobileMenu = () => {
    mobileMenu.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart");
        return;
    }
};

const toggleCartMenu = () => {
    cartMenu.classList.toggle("open-cart");
    if (mobileMenu.classList.contains("open-menu")) {
        mobileMenu.classList.remove("open-menu");
        return;
    }
};

const renderCard = (card) => {
    const { id, name, price, cardImg, info } = card;
    return `
    <div class="card-style">
        <img class="w-full" src="${cardImg}" alt="${name}">
        <div class="px-6 py-4">
            <div class="flex justify-between">
            <div class="font-bold text-xl mb-2">${name}</div>
                <span class="text-green-700 font-bold text-medium mb-2">USD ${price}</span>
            </div>
            <p class="text-gray-700 text-base text-justify">
            ${info}
            </p>
        </div>
        <div class="px-6 pt-4 pb-2 flex justify-center gap-3">
            <button class="g-buttom">Buy now</button>
            <button class="g-buttom">See more</button>
            <button class="g-buttom add-btn" 
                data-id="${id}" 
                data-name="${name}" 
                data-price="${price}" 
                data-img="${cardImg}" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                </button>
        </div>
    </div>
    `;
};

const renderDividedCards = (index = 0) => {
    products.innerHTML += cardsController.dividedCards[index].map(renderCard).join("");
};

const renderFilterCards = (category) => {
    const cardsList = cardsData.filter((product) => {
        return product.category === category;
    });
    products.innerHTML = cardsList.map(renderCard).join("");
};

const renderCards = (index = 0, category = undefined) => {
    if (!category) {
        renderDividedCards(index);
        return;
    }
    renderFilterCards(category);
};

const hideBtnShow = (category) => {
    if (!category) {
        btnShow.classList.remove("hidden");
        return;
    }
    btnShow.classList.add("hidden");
};

const changeActiveState = (selectedCategory) => {
    const categories = [...categoryList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove("active-Btn");
            return;
        }
        categoryBtn.classList.add("active-Btn");
    });
};

const changeFilterState = (e) => {
    const selectedCategory = e.target.dataset.category;
    hideBtnShow(selectedCategory);
    changeActiveState(selectedCategory);
};

const applyCategory = (e) => {
    console.log({ e, classList: e.target.classList });
    if (!e.target.classList.contains("category")) {
        return;
    } else {
        changeFilterState(e);
    }
    if (!e.target.dataset.category) {
        products.innerHTML = "";
        renderCards();
    } else {
        renderCards(0, e.target.dataset.category);
        cardsController.nextCardsIndex = 1;
    }
};

const isLastIndexOf = () => {
    return cardsController.nextCardsIndex === cardsController.cardsLimit;
};

const showMoreCards = () => {
    renderCards(cardsController.nextCardsIndex);
    cardsController.nextCardsIndex++;
    if (isLastIndexOf()) {
        btnShow.classList.add("hidden");
    }
};

const showFilter = () => {
    if (menu.classList.contains("hidden")) {
        menu.classList.remove("hidden");
        return;
    } else {
        menu.classList.add("hidden");
    }
};

const closeOnClick = (e) => {
    let isClickInsideMenu = mobileMenu.contains(e.target);
    let isClickInsideMenuButton = btnMenu.contains(e.target);
    if (!isClickInsideMenu && !isClickInsideMenuButton) {
        mobileMenu.style.display = "none";
    }
};

const closeOnScroll = () => {
    if (!mobileMenu.classList.contains("open-menu") && !cartMenu.classList.contains("open-cart")) {
        return;
    }
    mobileMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
};

const renderCartCard = (cartCard) => {
    const { id, name, img, price, quantity } = cartCard;
    return `
    <div class="border-2 border-green-700 px-4 py-2 rounded-md flex gap-4">
            <img class="w-20  py-2 " src="${img}" alt="Mountain" data-img="">
            <div class="flex flex-col justify-center items-center font-medium">
                <span class="font-bold">${name}</span>
                <span class="font-light">Amount:</span>
                <span data-price="${price}" class="font-bold text-green-900">${price} USD</span>
            </div>
            <div class="flex justify-center items-center gap-2">
                <span class="down border-2 border-green-800 font-bold rounded-md h-6 w-6 flex justify-center items-center" data-id="${id}">-</span>
                <span class="font-semibold">${quantity}</span>
                <span class="up border-2 border-green-800 font-bold rounded-md h-6 w-6 flex justify-center items-center" data-id="${id}">+</span>
            </div>
    </div>
    `;
};

const RenderCart = () => {
    if (!cart.length) {
        cartProducts.innerHTML = `<h4>You must add trees to your cart</h4>`;
        return;
    }

    cartProducts.innerHTML = cart.map(renderCartCard).join("");
};

const getCartTotal = () => {
    return cart.reduce((acc, cur) => {
        return acc + Number(cur.price) * cur.quantity;
    }, 0);
};

const showTotal = () => {
    total.innerHTML = `${getCartTotal().toFixed(2)} USD`;
};

const bubbleCart = () => {
    cartBubble.textContent = cart.reduce((acc, cur) => {
        return acc + cur.quantity;
    }, 0);
};

const disableBtn = (btn) => {
    if (!cart.length) {
        btn.classList.add("disabled");
    } else {
        btn.classList.remove("disabled");
    }
};

const checkCart = () => {
    saveLocalStorage(cart);
    RenderCart();
    showTotal();
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    bubbleCart();
};

const addProductCart = (e) => {
    if (!e.target.classList.contains("add-btn")) {
        return;
    }

    const { id, name, price, img } = e.target.dataset;

    const product = productData(id, name, price, img);

    if (existingCartProduct(product)) {
        addItemToProduct(product);
        showModal("You have add a tree");
    } else {
        createCartProduct(product);
        showModal("The tree is in your cart");
    }
    checkCart();
};

const productData = (id, name, price, img) => {
    return { id, name, price, img };
};

const existingCartProduct = (product) => {
    return cart.find((item) => {
        return item.id === product.id;
    });
};

const addItemToProduct = (product) => {
    cart = cart.map((cartProduct) => {
        return cartProduct.id === product.id ? { ...cartProduct, quantity: cartProduct.quantity + 1 } : cartProduct;
    });
};

const showModal = (msg) => {
    modal.classList.add("active-modal");
    modal.textContent = msg;
    setTimeout(() => {
        modal.classList.remove("active-modal");
    }, 1500);
};

const createCartProduct = (product) => {
    cart = [
        ...cart,
        {
            ...product,
            quantity: 1,
        },
    ];
};

const MinusBtnEvent = (id) => {
    const isExistingCartProduct = cart.find((item) => {
        return item.id === id;
    });

    if (isExistingCartProduct.quantity === 1) {
        if (window.confirm("Do you want to remove your tree?")) {
            removeProductCart(isExistingCartProduct);
        }
        return;
    }

    removeProductUnit(isExistingCartProduct);
};

const removeProductCart = (isExistingCartProduct) => {
    cart = cart.filter((product) => product.id !== isExistingCartProduct.id);
    checkCart();
};

const removeProductUnit = (isExistingCartProduct) => {
    cart = cart.map((product) => {
        return product.id === isExistingCartProduct.id ? { ...product, quantity: Number(product.quantity) - 1 } : product;
    });
};

const plusBtnEvent = (id) => {
    const isExistingCartProduct = cart.find((item) => {
        return item.id === id;
    });

    addItemToProduct(isExistingCartProduct);
};

const quantityState = (e) => {
    if (e.target.classList.contains("down")) {
        MinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains("up")) {
        plusBtnEvent(e.target.dataset.id);
    }
    checkCart();
};

const resetCartItems = () => {
    cart = [];
    checkCart();
};

const completeCarAction = (confirmMsg, successMsg) => {
    if (!cart.length) {
        return;
    } else {
        window.confirm(confirmMsg);
        resetCartItems();
        alert(successMsg);
    }
};

const completeBuy = () => {
    completeCarAction("Do you want to buy these trees?", "Thanks to help the world tree!");
};

const deleteCart = () => {
    completeCarAction("Are you sure you want to delete your trees?", "Trees are gone");
};

const init = () => {
    renderCards();
    btnMenu.addEventListener("click", toggleMobileMenu);
    btnMenu.addEventListener("click", () => {
        mobileMenu.style.display = mobileMenu.style.display === "none" ? "block" : "none";
    });
    cartBtn.addEventListener("click", toggleCartMenu);
    filterBtn.addEventListener("click", toggleFilter);
    categoriesContainer.addEventListener("click", applyCategory);
    btnShow.addEventListener("click", showMoreCards);
    document.addEventListener("click", closeOnClick);
    window.addEventListener("scroll", closeOnScroll);
    document.addEventListener("DOMContentLoaded", RenderCart);
    document.addEventListener("DOMContentLoaded", showTotal);
    document.addEventListener("DOMContentLoaded", bubbleCart);
    products.addEventListener("click", addProductCart);
    cartMenu.addEventListener("click", quantityState);
    buyBtn.addEventListener("click", completeBuy);
    deleteBtn.addEventListener("click", deleteCart);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
};

init();
