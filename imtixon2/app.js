 var swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });


const wishlistBtns = document.querySelectorAll('.wishlist-btn');
const headerHeart = document.getElementById('header-heart');


let favorites = JSON.parse(localStorage.getItem('favorites')) || [];


let counter = document.createElement('span');
counter.id = "heart-counter";
counter.textContent = favorites.length;
counter.style.marginLeft = "6px";
counter.style.fontWeight = "bold";
headerHeart.parentNode.appendChild(counter);

wishlistBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.card');
        const name = card.querySelector('h3').textContent;
        const category = card.querySelector('.category').textContent;
        const price = card.querySelector('.price').textContent;
        const img = card.querySelector('img').src;

     
        if (!favorites.find(item => item.name === name)) {
            favorites.push({ name, category, price, img });
            localStorage.setItem('favorites', JSON.stringify(favorites));
            counter.textContent = favorites.length;
            btn.style.color = "red"; 
        }
    });
});


headerHeart.addEventListener('click', () => {
    window.location.href = "app.html";
});
const searchInput = document.querySelector('.chap2 input');
const categorySelect = document.querySelector('.select');
const sortSelect = document.querySelectorAll('select')[1];
const productGrid = document.querySelector('.product-grid');
const cards = Array.from(document.querySelectorAll('.card'));

function filterAndSort() {
    let search = searchInput.value.toLowerCase();
    let category = categorySelect.value;
    let sort = sortSelect.value;

    let filtered = cards.filter(card => {
        let name = card.querySelector('h3').textContent.toLowerCase();
        let cat = card.querySelector('.category').textContent;

        let matchSearch = name.includes(search);
        let matchCategory = category === "Hammasi" || cat === category;

        return matchSearch && matchCategory;
    });

    // Sort qilish
    if (sort === "price-low") {
        filtered.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sort === "price-high") {
        filtered.sort((a, b) => getPrice(b) - getPrice(a));
    } else if (sort === "name") {
        filtered.sort((a, b) => 
            a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent)
        );
    }

    productGrid.innerHTML = "";
    filtered.forEach(card => productGrid.appendChild(card));
}


function getPrice(card) {
    let priceText = card.querySelector('.price').textContent;
    return parseInt(priceText.replace(/\D/g, ""));
}


searchInput.addEventListener('input', filterAndSort);
categorySelect.addEventListener('change', filterAndSort);
sortSelect.addEventListener('change', filterAndSort);



let btn = document.getElementById('btn');
btn.addEventListener('click', function() {
    window.location.href = 'index.html';
});


 const link = document.getElementById('showProducts');
    const products = document.getElementById('products');

    link.addEventListener('click', function(e) {
        e.preventDefault(); 
        products.style.display = 'block'; 
    });
