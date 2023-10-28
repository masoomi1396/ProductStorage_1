let countProduct = 0;
const iconStorage = document.getElementById('iconStorage');
const storageBody = document.getElementById('storageBody');
const containerBody = document.getElementById('containerBody');
const closeStorageButton = document.getElementById('closeButton');
const numberOfProduct = document.getElementById('numberOfProduct');
let plusButton;
let minButton;
let productsInStorage = [];

function showStorage() {
    if (countProduct != 0) {//change later
        storageBody.classList.add('shoppingBoxActive');
        containerBody.classList.add('containerActive');
    }
}
function closeStorage() {
    storageBody.classList.remove('shoppingBoxActive');
    containerBody.classList.remove('containerActive');
}
function itemExist(name) {
    let flag = false;
    productsInStorage.map((product) => {
        if (product.name == name) {
            console.log('Problem Is Here')
            flag = true;
        }
    })
    return flag;
}
function addProductToStorage(element) {
    const productBody = element.parentElement.parentElement;
    const name = productBody.querySelector('h4').innerText;
    const price = productBody.querySelector('h5').innerText;
    const img = productBody.querySelector('img').src;
    const exist = itemExist(name);
    console.log('Exist == ', exist);
    if (!exist) {
        const product = {
            name: name,
            price: price,
            img: img,
            quantity: 1
        }
        productsInStorage.push(product);
        createProductInStorage(product);
        changeTotalPrice();
    }
    else {
        productsInStorage.map((product) => {
            if (product.name == name) {
                const basePrice = parseInt(product.price) / product.quantity;
                const newQuantity = parseInt(product.quantity) + 1;
                const newPrice = basePrice * parseInt(newQuantity);
                product.quantity = newQuantity;
                product.price = newPrice;
                product.quantity = newQuantity;
                updateProduct(product);
                changeTotalPrice();
            }
        })
    }
    saveProductToStorage();
}
function createProductInStorage(product) {
    const productBody = storageBody.querySelector('div');
    const divParent = document.createElement('div');
    const figureParent = document.createElement('figure');
    const image = document.createElement('img');
    const divFirstChild = document.createElement('div');
    const spanFirstChild = document.createElement('span');
    const spanSecondChild = document.createElement('span');
    const divSecondChild = document.createElement('div');
    const firstButton = document.createElement('button');
    const spanThirdChild = document.createElement('span');
    const secondButton = document.createElement('button');


    firstButton.onclick = minToQuantity;
    secondButton.onclick = plusToQuantity;

    secondButton.innerText = '+';
    secondButton.classList.add('flex', 'items-center', 'justify-center', 'w-[20px]', 'h-[20px]', 'text-black', 'bg-gray-200', 'text-md');
    spanThirdChild.classList.add('text-white', 'text-xs', 'howMany');
    spanThirdChild.innerText = product.quantity;
    firstButton.classList.add('flex', 'items-center', 'justify-center', 'w-[20px]', 'h-[20px]', 'text-black', 'bg-gray-200', 'text-md');
    firstButton.innerText = '-';
    divSecondChild.classList.add('flex', 'space-x-3', 'items-center');
    spanSecondChild.classList.add('flex', 'justify-start', 'items-center', 'price')
    spanSecondChild.innerText = product.price;
    spanFirstChild.classList.add('text-white', 'text-xs', 'mr-3', 'name');
    spanFirstChild.innerText = product.name;
    divFirstChild.classList.add('flex', 'flex-col', 'justify-center', 'pl-1');
    image.src = product.img;
    image.classList.add('w-[50px]', 'h-[50px]');
    figureParent.classList.add('flex')
    divParent.classList.add('grid', 'grid-cols-3', 'product');

    productBody.appendChild(divParent);
    divParent.appendChild(figureParent);
    figureParent.appendChild(image);
    figureParent.appendChild(divFirstChild);
    divFirstChild.appendChild(spanFirstChild);
    divParent.appendChild(spanSecondChild);
    divParent.appendChild(divSecondChild);
    divSecondChild.appendChild(firstButton);
    divSecondChild.appendChild(spanThirdChild);
    divSecondChild.appendChild(secondButton);

}
function updateProduct(_product) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const name = product.querySelector('.name').innerText;
        const quantity = product.querySelector('.howMany');
        const price = product.querySelector('.price')
        console.log(name)
        console.log(_product.name)
        if (_product.name == name) {
            quantity.innerText = _product.quantity;
            price.innerText = _product.price;
        }
    });
}
function plusToQuantity() {
    const _product = this.parentElement.parentElement;
    const name = _product.querySelector('.name').innerText;
    const quantity = _product.querySelector('.howMany');
    const price = _product.querySelector('.price');


    productsInStorage.map(product => {
        if (product.name == name) {
            const basePrice = parseInt(product.price) / product.quantity;
            const newQuantity = parseInt(product.quantity) + 1;
            const newPrice = basePrice * parseInt(newQuantity);
            price.innerText = newPrice;
            product.quantity = newQuantity;
            product.price = newPrice;
            quantity.innerText = newQuantity;
            changeTotalPrice();
        }
    });
    saveProductToStorage();
}
function minToQuantity() {
    const _product = this.parentElement.parentElement;
    const name = _product.querySelector('.name').innerText;
    const quantity = _product.querySelector('.howMany');
    const price = _product.querySelector('.price');


    productsInStorage.map(product => {
        if (product.name == name) {
            if (product.quantity == 1) {
                const index = productsInStorage.findIndex(object => object === product);
                productsInStorage.splice(index, 1);
                removeProduct(product);
                changeTotalPrice();
                return;
            }
            const basePrice = parseInt(product.price) / product.quantity;
            const newQuantity = parseInt(product.quantity) - 1;
            const newPrice = basePrice * parseInt(newQuantity);
            console.log(newQuantity);
            price.innerText = newPrice;
            product.quantity = newQuantity;
            product.price = newPrice;
            quantity.innerText = newQuantity;
            changeTotalPrice();
        }
    });
    saveProductToStorage();
}
function removeProduct(product) {
    const productNames = document.querySelectorAll('.name');
    productNames.forEach(productName => {
        if (productName.innerText == product.name) {
            const selectedTag = productName.parentElement.parentElement.parentElement;
            const parantTag = productName.parentElement.parentElement.parentElement.parentElement;
            parantTag.removeChild(selectedTag);
        }
    })
}
function changeTotalPrice() {
    let total = 0;
    countProduct = 0;
    const totalPrice = document.querySelector('.totalPrice');
    productsInStorage.map(product => {
        total += parseInt(product.price);
        countProduct += parseInt(product.quantity);
    })
    totalPrice.innerText = '';
    totalPrice.innerText = total;
    numberOfProduct.innerText = countProduct;
}
function saveProductToStorage() {
    localStorage.setItem('product', JSON.stringify(productsInStorage));
}
function loadProductInStorage() {
    if (JSON.parse(localStorage.getItem('product')) != null) {
        productsInStorage = JSON.parse(localStorage.getItem('product'));
        createAllProductsInStorage();
        changeTotalPrice();
    }

}
function createAllProductsInStorage() {
    productsInStorage.map(product => {
        const productBody = storageBody.querySelector('div');
        const divParent = document.createElement('div');
        const figureParent = document.createElement('figure');
        const image = document.createElement('img');
        const divFirstChild = document.createElement('div');
        const spanFirstChild = document.createElement('span');
        const spanSecondChild = document.createElement('span');
        const divSecondChild = document.createElement('div');
        const firstButton = document.createElement('button');
        const spanThirdChild = document.createElement('span');
        const secondButton = document.createElement('button');


        firstButton.onclick = minToQuantity;
        secondButton.onclick = plusToQuantity;

        secondButton.innerText = '+';
        secondButton.classList.add('flex', 'items-center', 'justify-center', 'w-[20px]', 'h-[20px]', 'text-black', 'bg-gray-200', 'text-md');
        spanThirdChild.classList.add('text-white', 'text-xs', 'howMany');
        spanThirdChild.innerText = product.quantity;
        firstButton.classList.add('flex', 'items-center', 'justify-center', 'w-[20px]', 'h-[20px]', 'text-black', 'bg-gray-200', 'text-md');
        firstButton.innerText = '-';
        divSecondChild.classList.add('flex', 'space-x-3', 'items-center');
        spanSecondChild.classList.add('flex', 'justify-start', 'items-center', 'price')
        spanSecondChild.innerText = product.price;
        spanFirstChild.classList.add('text-white', 'text-xs', 'mr-3', 'name');
        spanFirstChild.innerText = product.name;
        divFirstChild.classList.add('flex', 'flex-col', 'justify-center', 'pl-1');
        image.src = product.img;
        image.classList.add('w-[50px]', 'h-[50px]');
        figureParent.classList.add('flex')
        divParent.classList.add('grid', 'grid-cols-3', 'product');

        productBody.appendChild(divParent);
        divParent.appendChild(figureParent);
        figureParent.appendChild(image);
        figureParent.appendChild(divFirstChild);
        divFirstChild.appendChild(spanFirstChild);
        divParent.appendChild(spanSecondChild);
        divParent.appendChild(divSecondChild);
        divSecondChild.appendChild(firstButton);
        divSecondChild.appendChild(spanThirdChild);
        divSecondChild.appendChild(secondButton);
    })
}
iconStorage.addEventListener('click', showStorage);
closeStorageButton.addEventListener('click', closeStorage);
window.onload = loadProductInStorage;