

const favoritesGrid = document.querySelector('.favorites-grid');
const emptyFavorites = document.querySelector('.empty-favorites');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function renderFavorites() {
    favoritesGrid.innerHTML = '';

    if (favorites.length === 0) {
        emptyFavorites.style.display = 'block';
        favoritesGrid.style.display = 'none';
        return;
    }

    emptyFavorites.style.display = 'none';
    favoritesGrid.style.display = 'block';

    favorites.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="image-wrapper">
                <img src="${item.img}">
            </div>
            <div class="info">
                <h3>${item.name}</h3>
                <p class="category">${item.category}</p>
                <p class="price">${item.price}</p>
            </div>
        `;
        favoritesGrid.appendChild(card);
    });
}

renderFavorites();
const wishlistButtons = document.querySelectorAll(".wishlist-btn");

wishlistButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        const card = this.closest(".card");

        const product = {
            img: card.querySelector("img").src,
            name: card.querySelector("h3").innerText,
            category: card.querySelector(".category").innerText,
            price: card.querySelector(".price").innerText
        };

        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        const index = wishlist.findIndex(item => item.name === product.name);

        if (index === -1) {
            wishlist.push(product);
            this.classList.add("active");
        } else {
            wishlist.splice(index, 1);
            this.classList.remove("active");
        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    });
});

