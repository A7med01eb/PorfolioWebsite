let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Windows 10' ,
        tag: "windows10" ,
        price: 30 ,
        inCart: 0 
    } ,
    {
        name: 'Office 2019' ,
        tag: "office2019" ,
        price:  18,
        inCart: 0 
    } ,
    {
        name: 'Adobe Photoshop 2019' ,
        tag: "adobephotoshop2019" ,
        price: 15 ,
        inCart: 0 
    } ,
    {
        name: 'Kaspersky Antivirus 2019' ,
        tag: "kasperskyantivirus2019" ,
        price: 20 ,
        inCart: 0 
    } ,
    {
        name: 'Nero 2019' ,
        tag: "nero2019" ,
        price: 10 ,
        inCart: 0 
    } ,
    {
        name: 'NetBeans 2019' ,
        tag: "netbeans2019" ,
        price: 8 ,
        inCart: 0 
    } ,
];

for (let i=0 ; i<carts.length ; i++){
    carts[i].addEventListener('click' , () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.num').textContent = productNumbers;
    }
}

function cartNumbers(products){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers' , productNumbers + 1);
        document.querySelector('.num').textContent = productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers' , 1);
        document.querySelector('.num').textContent = 1;
    }

    setItems(products);
}

function setItems(products){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems !=null){
        if(cartItems[products.tag] == undefined){
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems
        cartItems[products.tag].inCart += 1;
    }
    else{
        products.inCart = 1;
        cartItems = {
            [products.tag]: products
        }
    }
    localStorage.setItem("productsInCart" , JSON.stringify(cartItems));

}

function totalCost(products){
    // console.log("the products pricce is" , products.price);
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cardCost is" , cartCost);
    console.log(typeof cartCost);

    if(cartCost !=  null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + products.price);
    }
    else{
        localStorage.setItem("totalCost", products.price);
    }
}



function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product-item-box">
                    <img src="./images/${item.tag}.png">
                <div>
                    <span class="product-name">${item.name}</span>
                </div>
                <div class="price">$${item.price}</div>
                <div class="quantity">
                    
                    <span> ${item.inCart} Picses</span>
                    
                </div>
                <div class="total">
                    $${item.inCart * item.price},00
                </div>
            `
        });
        productContainer.innerHTML += `
            <div class=""basketTotalContainer>
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">$${cartCost},00</h4>
            </div>
        `;
    }
}




onLoadCartNumbers();
displayCart();