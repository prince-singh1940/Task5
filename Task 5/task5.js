 const products = [
      { id: 1, name: 'Smartphone A', price: 14999, type: 'electronics', img: 'https://picsum.photos/200?1' },
      { id: 2, name: 'Smartphone B', price: 18999, type: 'electronics', img: 'https://picsum.photos/200?7' },
      { id: 3, name: 'Jeans Blue', price: 799, type: 'fashion', img: 'https://picsum.photos/200?2' },
      { id: 4, name: 'Jeans Black', price: 899, type: 'fashion', img: 'https://picsum.photos/200?8' },
      { id: 5, name: 'Laptop', price: 42999, type: 'electronics', img: 'https://picsum.photos/200?3' },
      { id: 6, name: 'T-Shirt', price: 399, type: 'fashion', img: 'https://picsum.photos/200?4' },
      { id: 7, name: 'Novel Book', price: 299, type: 'books', img: 'https://picsum.photos/200?5' },
      { id: 8, name: 'Cookbook', price: 499, type: 'books', img: 'https://picsum.photos/200?6' }
    ];

    const cart = [];

    function displayProducts(filteredProducts) {
      const container = document.getElementById('products-container');
      container.innerHTML = '';
      filteredProducts.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('product-card');
        div.innerHTML = `
          <img src="${product.img}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
          <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        container.appendChild(div);
      });
    }

    function addToCart(name, price) {
      cart.push({ name, price });
      updateCart();
    }

    function updateCart() {
      const list = document.getElementById('cart-items');
      const totalDisplay = document.getElementById('cart-total');
      list.innerHTML = '';
      let total = 0;
      cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price}`;
        list.appendChild(li);
        total += item.price;
      });
      totalDisplay.textContent = total;
    }

    document.getElementById('type-filter').addEventListener('change', e => {
      const selectedType = e.target.value;
      if (selectedType === 'all') {
        displayProducts(products);
      } else {
        const filtered = products.filter(p => p.type === selectedType);
        displayProducts(filtered);
      }
    });

    document.getElementById('search-input').addEventListener('input', e => {
      const query = e.target.value.toLowerCase();
      const filtered = products.filter(p => p.name.toLowerCase().includes(query));
      displayProducts(filtered);
    });

    function navigate(page) {
      document.getElementById('home-section').style.display = page === 'home' ? 'block' : 'none';
      document.getElementById('products-container').style.display = page === 'products' ? 'flex' : 'none';
      document.getElementById('cart-section').style.display = page === 'cart' ? 'block' : 'none';
      document.getElementById('payment-section').style.display = 'none';
      document.getElementById('filters').style.display = page === 'products' ? 'block' : 'none';
      document.getElementById('search-bar').style.display = page === 'products' ? 'block' : 'none';
    }

    function showPayment() {
      document.getElementById('payment-section').style.display = 'block';
      document.getElementById('cart-section').style.display = 'none';
    }

    navigate('home');