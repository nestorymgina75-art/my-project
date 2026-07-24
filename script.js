document.addEventListener('DOMContentLoaded', function() {

let products = JSON.parse(localStorage.getItem('luketuloProducts')) || [];

// CHUKUA VIPENGELE VYOTE
const modal = document.getElementById('adminModal');
const adminBtn = document.getElementById('adminBtn');
const closeBtn = document.querySelector('.close');
const productForm = document.getElementById('productForm');

// FUNGUWA MODAL
if(adminBtn){
  adminBtn.addEventListener('click', function() {
    modal.style.display = 'block';
  });
}

// FUNGA MODAL
if(closeBtn){
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });
}

// FUNGA UKIBONYEZA NJE
window.addEventListener('click', function(e) {
  if(e.target == modal) {
    modal.style.display = 'none';
  }
});

// ORODHA YA BIDHAA
function displayProducts() {
  const gallery = document.getElementById('productGallery');
  const adminList = document.getElementById('adminProductList');
  if(!gallery) return;

  gallery.innerHTML = '';
  adminList.innerHTML = '';

  if(products.length === 0){
    gallery.innerHTML = '<p>Hakuna bidhaa bado. Ingia Admin uongeze.</p>';
  }

  products.forEach((p, index) => {
    // Kwa wateja
    gallery.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p><b>Bei:</b> ${p.price} TSh</p>
        <p><b>Mahali:</b> ${p.location}</p>
        <p><b>Piga:</b> <a href="tel:${p.contact}">${p.contact}</a></p>
      </div>
    `;
    // Kwa Admin
    adminList.innerHTML += `
      <div class="admin-item">
        <span>${p.name} - ${p.price} TSh</span>
        <button onclick="deleteProduct(${index})">Futa</button>
      </div>
    `;
  });
}

// KUONGEZA BIDHAA
if(productForm){
  productForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const file = document.getElementById('productImage').files[0];
    if(!file){ alert('Tafadhali chagua picha'); return; }

    const reader = new FileReader();
    reader.onload = function(event) {
      const newProduct = {
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
        location: document.getElementById('productLocation').value,
        contact: document.getElementById('productContact').value,
        image: event.target.result
      };
      products.push(newProduct);
      localStorage.setItem('luketuloProducts', JSON.stringify(products));
      displayProducts();
      productForm.reset();
      alert('Bidhaa imehifadhiwa!');
    }
    reader.readAsDataURL(file);
  });
}

// KUFUTA BIDHAA
window.deleteProduct = function(index) {
  if(confirm('Una uhakika unataka kufuta?')){
    products.splice(index, 1);
    localStorage.setItem('luketuloProducts', JSON.stringify(products));
    displayProducts();
  }
}

// PAKIA MARA YA KWANZA
displayProducts();

});