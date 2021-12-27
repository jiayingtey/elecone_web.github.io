let carts = document.querySelectorAll('.add-cart');
let product =[ //array to track
  {
    name: "Eleclone S1 Camera",
    tag: "camera1",
    price:  700,
    inCart:0
  },
  {
    name: "Eleclone S2 Camera",
    tag: "camera2",
    price:1000 ,
    inCart:0
  },
  {
    name: "Eleclone S3 Camera",
    tag: "camera3",
    price:  500,
    inCart:0
  },
  {
    name: "Eleclone Elite server",
    tag: "server1",
    price:  1000,
    inCart:0
  },
  {
    name: "Eleclone 1U Server",
    tag: "server2",
    price:  2000,
    inCart:0
  },
  {
    name: "Eleclone 2U Server",
    tag: "server3",
    price:  2500,
    inCart:0
  },
  {
    name: "AI Analytics System",
    tag: "AI",
    price:  5000,
    inCart:0
  },


];



function onClickedRun(productTag){
    console.log("clicked");
    for (let i=0; i< product.length; i++){
      if (productTag==product[i].tag){
        var selectedItem = product[i];
        cartNumbers(product[i]); //function invoked when button clicked
        totalCost(product[i]);
      }
    }
  }

function onLoadCartNumbers(product){ //function when page is refreshed the cart number will still be there
  let cartNumbers=localStorage.getItem('cartNumbers');
  cartNumbers=parseInt(cartNumbers);
  if (cartNumbers){//if sth is in the cart alr
    document.querySelector('.cart span').textContent = cartNumbers;
  }
}
function cartNumbers(product){ //update cart numbers at the symbol
  let cartNumbers=localStorage.getItem('cartNumbers');
  cartNumbers=parseInt(cartNumbers);
  console.log("cartNumbers",cartNumbers)
  if (cartNumbers>0){ //if sth is in the cart alr
    localStorage.setItem("cartNumbers",cartNumbers + 1);
    document.querySelector('.cart span').textContent = cartNumbers + 1 //select span tag
    console.log("cartNumbersyou",cartNumbers)
  }else{
    localStorage.setItem('cartNumbers',1);
    document.querySelector('.cart span').textContent = 1
    console.log("cartNumbers",cartNumbers)
  }
  setItems(product);
}
//let== declare :ONLY declare ONCE for an obj
function setItems(product){
  let productInCart= localStorage.getItem('productInCart');
  productInCart= JSON.parse(productInCart); //convert from string to javaobject

  if (productInCart != null){
    if(productInCart[product.tag] == undefined){ //for the remaing products[i] not defined
      productInCart = {
        ...productInCart,  //"..."--> rest oprator:collection of all remaining elements
        [product.tag]: product
      }
    }
    productInCart[product.tag].inCart += 1;
  }else{
    product.inCart=1; //Quantity=1

    productInCart= {
      [product.tag]:product
    }
}
  localStorage.setItem("productInCart",JSON.stringify(productInCart)); //Convert a JavaScript object into a string with JSON.stringify() to exchange data to/from a web server.
}
function totalCost(product){
  //console.log("The product price is", product.price);
  let totalCost=localStorage.getItem("totalCost");
  if (totalCost!= null){
    totalCost=parseInt(totalCost);
    localStorage.setItem("totalCost", totalCost+ product.price)
  }else{
  localStorage.setItem("totalCost",product.price);
}
}





function displayCart(){
  let productInCart = localStorage.getItem('productInCart')  //get cart itmems
  productInCart= JSON.parse(productInCart)
  let productContainer= document.getElementById("products-container");

  let totalCost=localStorage.getItem("totalCost");
  if (productInCart && productContainer ){ // to check whether there is sth in the cart and if the container exists
    productContainer.innerHTML = ''
    productContainer.innerHTML +=
    `
      <tr>
        <th id="icon"></th>
        <th id="products-title">Products&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
        <th id="price">Price&emsp;&emsp;&emsp;</th>
        <th id="quantity">Quantity&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
        <th id="total" >Total&emsp;&emsp;&emsp;&emsp;&emsp;</th>
      </tr>
      `
      Object.values(productInCart).map(item =>{     // why need put '' in '${item.tag}'---in html, if no '' it will take it as a value
      tempString=
        `
        <tr class="products">
          <td id="icon"><button class="remove" type="button" onclick="onRemoveClicked('${item.tag}')"><ion-icon name="close-circle-outline">
          </ion-icon></button></td>

          <td id="products-title"><span>${item.name}</span><br><br><img src="images/${item.tag}.png">
          </td>
          <td id="price"><span>$${item.price}</span></td>
          <td id="quantity">

          <button class="quantityDown" type="button" onclick="onQuantityDownClicked('${item.tag}')">
          <ion-icon name="caret-back-circle-outline"></ion-icon></button>

          <span id="itemquantity${item.tag}">${item.inCart}</span>

          <button class="quantityUp" type="button" onclick="onQuantityUpClicked('${item.tag}')">
          <ion-icon name="caret-forward-circle-outline" ></ion-icon></button>
          </td>

          <td id="total"><span id="itemtotal${item.tag}">$${item.inCart*item.price}</span></td>
        </tr>

        `;
        //console.log("Product Item:"+tempString);
        productContainer.innerHTML+=tempString;
      })

        productContainer.innerHTML+= `
        <tr id="totalcost">
          <td colspan="4">Total Amount&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
          <td><span id="spantotal">
          $${totalCost}</span></td>
        </tr>
        `
  }
}


function onRemoveClicked(iTag){  //iTag=="product tag"
  console.log("clicked");
  let productInCart = localStorage.getItem('productInCart')  //get cart itmems
  productInCart= JSON.parse(productInCart)
  updateCartNumbers(iTag);//function invoked when button clicked
  updateTotalCost(iTag);
  updateSetItems(iTag);
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.parentElement.remove();
}
function updateCartNumbers(iTag){ //update cart numbers at the symbol
  let productInCart= localStorage.getItem('productInCart');
  productInCart= JSON.parse(productInCart); //convert from string to javaobject
  var selectedItem = productInCart[iTag];
  console.log("selectedItem"+selectedItem);
  let cartNumbers=localStorage.getItem('cartNumbers');
  cartNumbers=parseInt(cartNumbers);//convert from string to int
  if (cartNumbers>0){ //if sth is in the cart alr
    cartNumbers = cartNumbers - (selectedItem.inCart);
    localStorage.setItem("cartNumbers",cartNumbers);
    document.querySelector('.cart span').textContent = cartNumbers; //select span tag
  }

}
function updateSetItems(iTag){
  let productInCart= localStorage.getItem('productInCart');
  productInCart= JSON.parse(productInCart); //convert from string to javaobject
  var selectedItem = productInCart[iTag];
  selectedItem.inCart=0
  if (selectedItem.inCart==0){
    delete productInCart[iTag];
  }
  localStorage.setItem("productInCart",JSON.stringify(productInCart)); //Convert a JavaScript object into a string with JSON.stringify() to exchange data to/from a web server.
}
function updateTotalCost(iTag){
  let productInCart= localStorage.getItem('productInCart');
  productInCart= JSON.parse(productInCart); //convert from string to javaobject
  var selectedItem = productInCart[iTag];
  let totalCost=localStorage.getItem("totalCost");
  itemTotalCost=selectedItem.price*selectedItem.inCart ;
  totalCost=totalCost-itemTotalCost
  localStorage.setItem("totalCost",totalCost);
  document.getElementById('spantotal').textContent= totalCost;
}

function onQuantityDownClicked(iTag){
  console.log('clicked');
  decreaseCartNumbers(iTag);
  decreaseSetItems(iTag);
  decreaseItemCost(iTag);
}
function decreaseCartNumbers(iTag){
  let productInCart= localStorage.getItem('productInCart');
  productInCart= JSON.parse(productInCart); //convert from string to javaobject

  var selectedItem = productInCart[iTag];
  console.log(productInCart[iTag])
  //console.log("selectedItem:"+selectedItem);
  let cartNumbers=localStorage.getItem('cartNumbers');
  cartNumbers=parseInt(cartNumbers);//convert from string to int
  if (cartNumbers>0){ //if sth is in the cart alr
    cartNumbers = cartNumbers - 1;
    localStorage.setItem("cartNumbers",cartNumbers);
    document.querySelector('.cart span').textContent = cartNumbers; //select span tag

  }
}
function decreaseSetItems(iTag){
  //console.log("itag",iTag)
  let productInCart= localStorage.getItem('productInCart');
  productInCart= JSON.parse(productInCart); //convert from string to javaobject
  //console.log("pdtinCart",productInCart)
  var selectedItem = productInCart[iTag];
  //console.log("selectedItem",selectedItem,selectedItem.inCart)
  selectedItem.inCart-=1
  console.log("incart",selectedItem.inCart)

  //console.log(document.getElementById("itemquantity${item.tag}").textContent)
  document.getElementById("itemquantity"+iTag).textContent= selectedItem.inCart
  localStorage.setItem("productInCart",JSON.stringify(productInCart)); //Convert a JavaScript object into a string with JSON.stringify() to exchange data to/from a web server.
}
function decreaseItemCost(iTag){
  let productInCart= localStorage.getItem('productInCart');
  productInCart= JSON.parse(productInCart);
  var selectedItem = productInCart[iTag];
  console.log(productInCart[iTag])
  let totalCost=localStorage.getItem("totalCost");
  //update Item Total
  itemTotalCost=selectedItem.price*selectedItem.inCart ;
  document.getElementById("itemtotal"+iTag).textContent= itemTotalCost;

  //update Total Cost

  itemTotalCost=selectedItem.price
  totalCost=totalCost-itemTotalCost
  console.log(totalCost,"totalCost")
  localStorage.setItem("totalCost",totalCost);
  localStorage.setItem("productInCart",JSON.stringify(productInCart));
  document.getElementById('spantotal').textContent= totalCost;

}

function onQuantityUpClicked(iTag){
  increaseCartNumbers(iTag);
  increaseSetItems(iTag);
  increaseItemCost(iTag);
}
function increaseCartNumbers(iTag){
  let productInCart= localStorage.getItem('productInCart');
  productInCart= JSON.parse(productInCart); //convert from string to javaobject

  var selectedItem = productInCart[iTag];
  console.log(productInCart[iTag])
  //console.log("selectedItem:"+selectedItem);
  let cartNumbers=localStorage.getItem('cartNumbers');
  cartNumbers=parseInt(cartNumbers);//convert from string to int
  if (cartNumbers>0){ //if sth is in the cart alr
    cartNumbers = cartNumbers + 1;
    localStorage.setItem("cartNumbers",cartNumbers);
    document.querySelector('.cart span').textContent = cartNumbers; //select span tag
}
}
function increaseSetItems(iTag){
  let productInCart= localStorage.getItem('productInCart');
  productInCart= JSON.parse(productInCart); //convert from string to javaobject
  //console.log("pdtinCart",productInCart)
  var selectedItem = productInCart[iTag];
  //console.log("selectedItem",selectedItem,selectedItem.inCart)
  selectedItem.inCart+=1
  console.log("incart",selectedItem.inCart)
  document.getElementById("itemquantity"+iTag).textContent= selectedItem.inCart
  localStorage.setItem("productInCart",JSON.stringify(productInCart));

}
function increaseItemCost(iTag){
  let productInCart= localStorage.getItem('productInCart');
  productInCart= JSON.parse(productInCart);
  var selectedItem = productInCart[iTag];
  console.log(productInCart[iTag])
  let totalCost=localStorage.getItem("totalCost");
  //update Item Total
  itemTotalCost=selectedItem.price*selectedItem.inCart ;
  console.log(itemTotalCost)
  console.log(document.getElementById("itemtotal"+iTag).textContent)
  document.getElementById("itemtotal"+iTag).textContent= itemTotalCost;
  //update Total Cost
  totalCost=JSON.parse(totalCost)
  totalCost=totalCost+selectedItem.price
  console.log(totalCost,"totalCost")
  localStorage.setItem("totalCost",totalCost);
  localStorage.setItem("productInCart",JSON.stringify(productInCart));
  document.getElementById('spantotal').textContent= totalCost;
}


function purchase(){
  let cartNumbers=localStorage.getItem('cartNumbers');
  cartNumbers=parseInt(cartNumbers);
  if (cartNumbers==0){
    window.location.href = "cart.html";
    alert("Add items into your cart to proceed");
  }else{
  window.open('purchase.html');
  }
}


function onClickCreate(){
  window.open('form1.html')
}


function ordercfm(){
  localStorage.setItem("cartNumbers",0);
  document.querySelector('.cart span').textContent = "0";
  localStorage.setItem("totalCost",0);
  localStorage.setItem("productInCart",null);
}

onLoadCartNumbers(); //invoke function for it to run
displayCart();
