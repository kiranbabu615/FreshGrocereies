const products = [
 {id:1,name:'Alphonso Mangoes',category:'Fruits',weight:'1 kg · 4–5 pieces',price:189,old:229,tag:'BESTSELLER',image:'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80'},
 {id:2,name:'Fresh Avocados',category:'Fruits',weight:'2 pieces · approx. 400 g',price:129,old:159,tag:'FARM FRESH',image:'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80'},
 {id:3,name:'Organic Tomatoes',category:'Vegetables',weight:'500 g',price:39,old:49,tag:'DAILY PICK',image:'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&auto=format&fit=crop&q=80'},
 {id:4,name:'Green Broccoli',category:'Vegetables',weight:'1 piece · approx. 300 g',price:59,old:75,tag:'FARM FRESH',image:'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600&auto=format&fit=crop&q=80'},
 {id:5,name:'Farm Fresh Milk',category:'Dairy',weight:'1 litre · toned milk',price:68,old:74,tag:'DAILY ESSENTIAL',image:'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80'},
 {id:6,name:'Country Eggs',category:'Dairy',weight:'Pack of 6',price:72,old:84,tag:'PROTEIN RICH',image:'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=600&auto=format&fit=crop&q=80'},
 {id:7,name:'Butter Croissants',category:'Bakery',weight:'Pack of 2 · baked today',price:99,old:119,tag:'BAKED TODAY',image:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80'},
 {id:8,name:'Roasted Almonds',category:'Snacks',weight:'200 g · lightly salted',price:159,old:189,tag:'CUSTOMER FAVOURITE',image:'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&auto=format&fit=crop&q=80'}
];
let cart = {};
let activeCategory = 'All';
const money = n => '₹' + n.toLocaleString('en-IN');
const grid = document.getElementById('productGrid');
function renderProducts(){
 const query = document.getElementById('searchInput').value.trim().toLowerCase();
 let shown = products.filter(p => (activeCategory==='All'||p.category===activeCategory) && (p.name.toLowerCase().includes(query)||p.category.toLowerCase().includes(query)));
 const sort = document.getElementById('sortSelect').value;
 if(sort==='low') shown.sort((a,b)=>a.price-b.price); if(sort==='high') shown.sort((a,b)=>b.price-a.price);
 document.getElementById('resultCount').textContent = `${shown.length} product${shown.length===1?'':'s'}`;
 grid.innerHTML = shown.length ? shown.map(p=>`<article class="product-card"><div class="product-photo"><img loading="lazy" src="${p.image}" alt="${p.name}"><span class="product-tag">${p.tag}</span></div><div class="product-info"><div class="product-category">${p.category}</div><h3>${p.name}</h3><div class="product-weight">${p.weight}</div><div class="product-bottom"><div><span class="price">${money(p.price)}</span><span class="old-price">${money(p.old)}</span></div><button class="add-btn" onclick="addToCart(${p.id})">＋ Add</button></div></div></article>`).join('') : '<div class="no-results">No products found. Try another search.</div>';
}
function addToCart(id){cart[id]=(cart[id]||0)+1;renderCart();showToast('Added to your cart');}
function changeQty(id,delta){cart[id]=(cart[id]||0)+delta;if(cart[id]<=0)delete cart[id];renderCart();}
function renderCart(){
 const entries=Object.entries(cart);const count=entries.reduce((s,[,q])=>s+q,0);const subtotal=entries.reduce((s,[id,q])=>s+products.find(p=>p.id===Number(id)).price*q,0);const fee=count===0?40:(subtotal>=499?0:40);
 document.getElementById('cartCount').textContent=count;document.getElementById('drawerCount').textContent=`(${count})`;document.getElementById('subtotal').textContent=money(subtotal);document.getElementById('deliveryFee').textContent=fee===0?'FREE':money(fee);document.getElementById('total').textContent=money(subtotal+fee);
 document.getElementById('cartItems').innerHTML=entries.length?entries.map(([id,q])=>{const p=products.find(x=>x.id===Number(id));return `<div class="cart-row"><img src="${p.image}" alt=""><div class="cart-row-info"><strong>${p.name}</strong><small>${p.weight}</small><b>${money(p.price*q)}</b></div><div class="qty"><button onclick="changeQty(${p.id},-1)" aria-label="Decrease quantity">−</button><span>${q}</span><button onclick="changeQty(${p.id},1)" aria-label="Increase quantity">+</button></div></div>`}).join(''):'<div class="empty-cart"><span>🧺</span><h3>Your cart is feeling light</h3><p>Add some fresh favourites to get started.</p></div>';
}
function showToast(message){const toast=document.getElementById('toast');toast.textContent=message;toast.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove('show'),1800)}
function openCart(){document.getElementById('cartDrawer').classList.add('open');document.getElementById('overlay').classList.add('show')}
function closeCart(){document.getElementById('cartDrawer').classList.remove('open');document.getElementById('overlay').classList.remove('show')}
document.getElementById('openCart').addEventListener('click',openCart);document.getElementById('closeCart').addEventListener('click',closeCart);document.getElementById('overlay').addEventListener('click',closeCart);
document.getElementById('searchInput').addEventListener('input',renderProducts);document.getElementById('sortSelect').addEventListener('change',renderProducts);
document.querySelectorAll('.category').forEach(btn=>btn.addEventListener('click',()=>{activeCategory=btn.dataset.category;document.querySelectorAll('.category').forEach(x=>x.classList.toggle('selected',x===btn));renderProducts()}));
document.querySelectorAll('[data-category-link]').forEach(link=>link.addEventListener('click',()=>{activeCategory=link.dataset.categoryLink;document.querySelectorAll('.category').forEach(x=>x.classList.toggle('selected',x.dataset.category===activeCategory));renderProducts()}));
document.getElementById('checkoutBtn').addEventListener('click',()=>showToast('Checkout is a demo — no payment is collected.'));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCart();if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();document.getElementById('searchInput').focus()}});
renderProducts();renderCart();
