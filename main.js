const productList = document.getElementById('product-list');

async function fetchProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error(error);
    return [];
  }
}


function displayStars(rating) {
  const maxStars = 5;
  const roundedRating = Math.round(rating)

  const starsHTML = Array(maxStars).fill('<span class="star">&#9734;</span>')

  for (let i = 0; i < roundedRating; i++) {
    starsHTML[i] = '<span class="star">&#9733;</span>';
  }
  if (rating - roundedRating === 0.5) {
    starsHTML[roundedRating] = '<span class="star">&#9733;&#189;</span>';
  }

  return starsHTML.join('');
}

async function displayProducts() {
  const products = await fetchProducts();

  if (products.length === 0) {
    productList.innerHTML = '<p>Nenhum produto disponível.</p>';
    return;
  }

  productList.innerHTML = products.map((product, index) => `
    <div class="product${index < 4 ? ' best-seller' : ''}">
      <img src="${product.images[0] !== '' ? product.images[0] : product.images[1]}" alt="${product.title}">
      <div>
      <h2 class="product-title">${product.title}</h2>
      <p class="product-description">${product.description}</p>
      <span>
       ${displayStars(product.rating)}
      </span>
      <span class="product-price">R$ ${product.price.toFixed(2)}</span>
      </div>
    </div>
  `).join('');
}

displayProducts();
