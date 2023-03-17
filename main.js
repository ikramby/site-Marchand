let products = [];

let makeProduct = (name, price, description, qté,stock, image) => {
  let obj = {
    name: name,
    price: price,
    description: description,
    qté: qté,
    stock: stock,
    image: image,
    count: 0,
  };
  products.push(obj);
};

makeProduct(
  "Farine pâtissière",
  5,
  "Farines l'épi d'or",
  "1Kg",
  100,
  "farine.png"
);
makeProduct(
  "Lait Délice",
  5,
  "Lait UHT 1/2 écrémé",
  "1Litre",
  100,
  "lait.png"
);
makeProduct(
  "Huile de Mais",
  50,
  "Lesieur Huile De maïs - 5 L",
  "5Litre",
  100,
  "huile5L.png"
);
makeProduct(
  "Beurre Délice",
  5,
  "Meilleur Beurre en Tunisie",
  "100g",
  100,
  "beurre.png"
);
makeProduct(
  "Oeufs blancs el Mazraa",
  5,
  "30 oeufs blancs el Mazraa",
  "1Litre",
  100,
  "oeuf.png"
);
makeProduct(
  "Riz Basmati",
  10,
  "riz thailandais",
  "1kg",
  100,
  "basmati.png"
);

makeProduct(
  "Sucre Blanc",
  5,
  "Idéale pour vos recettes sucrés",
  "1kg",
  100,
  "sucre.png"
);

makeProduct(
  "Cafés BONDIN",
  10,
  "Café Filtre",
  "250g",
  100,
  "bondin.png"
);
`<br> </br>`
let cart = {};

//$("#container").append(...);: uses jQuery to select the HTML element with the ID of container and appends a div element to it containing various HTML
// elements including the product name,image, description, price, stock, and a button to add the product to the shopping cart.

//"addToCart('${product.name}', ${product.price}, ${i})": passes the name, price, 
//and index of the current product to a function named addToCart() when the corresponding "Add to Cart" button is clicked.

// appends another div element containing an h2 element with the ID of cart-total to the end of the container element, 
// which will be used to display the total cost of the items in the shopping cart.

let appendList = () => {
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    $("#container").append(
      `<div>
        <img src="${product.image}" />
        <h2>${product.name}</h2>
        <h3>${product.description}</h3>
        <p>${product.price} DT</p>
        <p>Stock: <span class="stock" id="stock-${i}">${product.stock}</span></p>
        <button onclick="addToCart('${product.name}', ${product.price}, ${i})">Add to Cart</button>
        <span class="count" id="count-${i}"></span>
      </div>`
    );
  }


  
  $("#container").append(`<h2 id="cart-total">Cart: </h2>`);



  
//  $("#container").append(`<div><h2 id="cart-total">Cart: </h2></div>`);
};
//function addToCart adds a product to the shopping cart when its corresponding "Add to Cart" button is clicked.
let addToCart = (name, price, index) => {
  let product = products.find(p => p.name === name);

  product.stock--;
  $(`#stock-${index}`).text(product.stock);

  if (!product) {
    return;
  }
  if (product.stock <= 0) {
    alert(`Sorry, ${product.name} is out of stock`);
    return;
  }
  if (cart[name]) {
    cart[name].count++;
    $(`#cart-item-${name}`).text(`${name} x ${cart[name].count}`);
  } else {
    cart[name] = {
      price: price,
      count: 1,
    };
    $('#cart-items').append(`<li id="cart-item-${name}">${name} x 1</li>`);
  }
  

  updateChartData(index);

  $(`#stock-${index}`).text(product.stock);


  updateCartTotal();
};




//function updateCartTotal updates the total cost of the items in the shopping cart and displays it. 


let updateCartTotal = () => {
  let total = 0;
  let message = "Cart: ";
  for (let productName in cart) {
    let product = cart[productName];
        //multiplies the price of the product by its count and adds it to the total.
    total += product.price * product.count;
    //adds the product name and count to the message.
    message += `${productName} x ${product.count}, `;
  }
  message += `Total: ${total} DT`;
  $("#cart-total").text(message);
//  $("#cart").show(); // show the cart if it's hidden
   updateChart();
};


let chartData = products.map(product => ({
  label: product.name,
  data: [product.stock],
}));

let updateChartData = (index) => {
  chartData[index].data[0] = products[index].stock;
};




// Get the data for the chart
//let chartData = products.map(product => ({
//  label: product.name,
//  data: [product.stock],
//}));

appendList();
