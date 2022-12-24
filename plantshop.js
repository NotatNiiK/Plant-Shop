isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if (isMobile.any()) {
    document.body.classList.add('touch');
}
else {
    document.body.classList.add('mouse');
}

let searchBtn = document.querySelector('.search');
let searchInput = document.querySelector('.header__search');
let allSiteItemes = Array.from(document.querySelectorAll('*'));

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (window.innerWidth < 768) {
        searchInput.classList.add('header__searchMobile');
    }
    searchInput.classList.toggle('active');
    if (!searchInput.classList.contains('active')) {
        for (let i = 0; i < allSiteItemes.length; i++) {
            allSiteItemes[i].classList.remove('searchElement');
        }
    }
    searchInput.addEventListener('keydown', (e) => {
        if (e.code === "Enter") {
            for (let i = 0; i < allSiteItemes.length; i++) {
                const item = allSiteItemes[i];
                let itemText = item.innerHTML.trim();
                if (itemText == searchInput.value) {
                    item.style.transition = "all .4 ease 0s";
                    item.classList.add('searchElement');
                }
            }
        }
    })
});

let filter_list = document.querySelector('.choice');
let card_products = document.querySelectorAll('.card-products');
let currentParam = document.querySelector('.choice__currentParam');
let arrow = document.querySelector('.choice__arrow');
let params = document.querySelector('.choice__wrp');

document.documentElement.addEventListener('click', (e) => {
    if (!e.target.closest('.choice') && arrow.classList.contains('active')) {
        arrow.classList.remove('active');
        params.classList.remove('active');
    }
});

arrow.addEventListener('click', (e) => {
    arrow.classList.toggle('active');
    params.classList.toggle('active');
});

filter_list.addEventListener('click', (e) => {
    for (let i = 0; i < card_products.length; i++) {
        card_products[i].style.display = "grid";
    }
    if (e.target.innerHTML === "Cheap") {
        currentParam.innerHTML = 'Cheap';
        let sortArr = [];
        for (let i = 0; i < card_products.length; i++) {
            let price = card_products[i].querySelector('.card-products__price span');
            let card = price.closest('.card-products')
            let priceValue = +price?.innerHTML;
            if (priceValue > 50) {
                card_products[i].style.display = "none";
            }
            else {
                sortArr.push(priceValue);
                card_products[i].dataset.sortvalue = priceValue;
            }
        }
        sortArr.sort((a, b) => a - b);
        let index = 1;
        for (let i = 0; i < sortArr.length; i++) {
            let selector = `[data-sortvalue = '${sortArr[i]}']`;
            let cards = document.querySelectorAll(selector);
            for (let j = 0; j < cards.length; j++) {
                cards[j].style.order = index;
                index++;
            }
        }
        sortArr.length = 0;

    }
    else if (e.target.innerHTML === "Average") {
        currentParam.innerHTML = 'Average';
        let sortArr = [];
        for (let i = 0; i < card_products.length; i++) {
            let price = card_products[i].querySelector('.card-products__price span');
            let card = price.closest('.card-products')
            let priceValue = +price?.innerHTML;
            if (priceValue < 50 || priceValue > 100) {
                card_products[i].style.display = "none";
            }
            else {
                sortArr.push(priceValue);
                card_products[i].dataset.sortvalue = priceValue;
            }
        }
        sortArr.sort((a, b) => a - b);
        let index = 1;
        for (let i = 0; i < sortArr.length; i++) {
            let selector = `[data-sortvalue = '${sortArr[i]}']`;
            let cards = document.querySelectorAll(selector);
            for (let j = 0; j < cards.length; j++) {
                cards[j].style.order = index;
                index++;
            }
        }
        sortArr.length = 0;
    }
    else if (e.target.innerHTML === "High") {
        currentParam.innerHTML = 'High';
        let sortArr = [];
        for (let i = 0; i < card_products.length; i++) {
            let price = card_products[i].querySelector('.card-products__price span');
            let card = price.closest('.card-products')
            let priceValue = +price?.innerHTML;
            if (priceValue < 100) {
                card_products[i].style.display = "none";
            }
            else {
                sortArr.push(priceValue);
                card_products[i].dataset.sortvalue = priceValue;
            }
        }
        sortArr.sort((a, b) => a - b);
        let index = 1;
        for (let i = 0; i < sortArr.length; i++) {
            let selector = `[data-sortvalue = '${sortArr[i]}']`;
            let card = document.querySelector(selector);
            card.style.order = index;
            index++;
        }
        sortArr.length = 0;
    }
    else {
        currentParam.innerHTML = 'All';
        for (let i = 0; i < card_products.length; i++) {
            card_products[i].style.display = 'grid';
        }
    }
});