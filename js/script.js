
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) header.style.boxShadow = '0 8px 30px rgba(106,76,147,0.4)';
        else header.style.boxShadow = '0 4px 20px rgba(106,76,147,0.3)';
    });

    
    const current = window.location.pathname.split('/').pop() || 'home.html';
    document.querySelectorAll('nav a').forEach(a => {
        if(a.getAttribute('href') === current) a.classList.add('active');
    });
});


function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:none;align-items:center;justify-content:center;z-index:9999;cursor:pointer;';
    lightbox.innerHTML = '<img id="lightbox-img" style="max-width:90%;max-height:85%;border-radius:15px;box-shadow:0 0 50px rgba(255,255,255,0.2);"><span style="position:absolute;top:20px;right:30px;color:white;font-size:40px;">&times;</span>';
    document.body.appendChild(lightbox);
    lightbox.addEventListener('click', () => lightbox.style.display = 'none');
}
createLightbox();

document.querySelectorAll('.product-card img, .price-card img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
        document.getElementById('lightbox-img').src = img.src;
        document.getElementById('lightbox').style.display = 'flex';
    });
});


const heroImages = [
    'images/poster-2L-5L.jpg',
    'images/product-4bottles.jpg',
    'images/product-5L-purple.jpg',
    'images/product-5L-light.jpg'
];
let heroIndex = 0;
const hero = document.querySelector('.hero');
if(hero){
    setInterval(() => {
        heroIndex = (heroIndex + 1) % heroImages.length;
        hero.style.backgroundImage = `linear-gradient(rgba(122,92,168,0.2), rgba(122,92,168,0.2)), url('${heroImages[heroIndex]}')`;
        hero.style.transition = 'background-image 1s ease-in-out';
    }, 4000);
}


function orderWhatsApp(product, price){
    const phone = '27712345678'; // CHANGE TO YOUR NUMBER
    const qty = prompt(`How many ${product} do you want?`, '1');
    if(!qty) return;
    const message = `Hi Aseptic! 👋%0AI want to order:%0A*Product:* ${product}%0A*Price:* ${price}%0A*Quantity:* ${qty}%0A*Total:* approx R${parseInt(price.replace('R','')) * qty}%0A%0APlease confirm delivery.`;
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    showToast(`Added ${qty} x ${product} - Opening WhatsApp`);
}


document.querySelectorAll('.btn-order').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = e.target.closest('.price-card, .product-card');
        const product = card.querySelector('h3').innerText;
        const price = card.querySelector('.price') ? card.querySelector('.price').innerText : 'R75';
        orderWhatsApp(product, price);
    });
});


function setupForms(){
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]')?.value;
            const phone = form.querySelector('input[type="tel"]')?.value;
            
            if(email && !email.includes('@')){ showToast('Please enter valid email', true); return; }
            if(phone && phone.length < 10){ showToast('Phone number too short', true); return; }

            
            const btn = form.querySelector('button');
            const oldText = btn.innerText;
            btn.innerText = '✓ Sent! We will contact you';
            btn.style.background = '#4CAF50';
            
            
            const name = form.querySelector('input[name="fullname"], input[name="name"]')?.value || '';
            const msg = form.querySelector('textarea')?.value || '';
            const phoneNum = '27712345678';
            const waMsg = `New Enquiry from ${name}%0AEmail: ${email}%0APhone: ${phone}%0AMessage: ${msg}`;
            setTimeout(() => {
                window.open(`https://wa.me/${phoneNum}?text=${waMsg}`, '_blank');
                btn.innerText = oldText;
                btn.style.background = '';
                form.reset();
            }, 1200);
            
            showToast('Enquiry sent! Opening WhatsApp...');
        });
    });
}
setupForms();


function showToast(message, isError=false){
    let toast = document.getElementById('toast');
    if(!toast){
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#2d1b4e;color:white;padding:12px 25px;border-radius:30px;z-index:10000;display:none;box-shadow:0 5px 20px rgba(0,0,0,0.3);font-weight:500;';
        document.body.appendChild(toast);
    }
    toast.style.background = isError ? '#e53935' : '#2d1b4e';
    toast.innerText = message;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 3000);
}


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.animation = 'fadeUp 0.8s ease forwards';
            entry.target.style.opacity = '1';
        }
    });
}, {threshold: 0.1});

document.querySelectorAll('.product-card, .price-card, .feature').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});


const topBtn = document.createElement('button');
topBtn.innerHTML = '↑';
topBtn.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#6a4c93;color:white;border:none;width:45px;height:45px;border-radius:50%;font-size:20px;display:none;cursor:pointer;z-index:999;box-shadow:0 4px 15px rgba(0,0,0,0.2);';
document.body.appendChild(topBtn);
window.addEventListener('scroll', () => topBtn.style.display = window.scrollY > 400 ? 'block' : 'none');
topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));


function addCalculator(){
    const bulkBanner = document.querySelector('.bulk-banner');
    if(bulkBanner){
        const calcHTML = `<div style="margin-top:15px;"><input type="number" id="calc-qty" placeholder="Enter quantity" style="padding:8px;border-radius:10px;border:1px solid #d4af37;width:150px;"> <button onclick="calcBulk()" style="padding:8px 15px;border-radius:10px;background:#6a4c93;color:white;border:none;cursor:pointer;">Calculate Price</button> <span id="calc-result" style="margin-left:10px;font-weight:bold;"></span></div>`;
        bulkBanner.innerHTML += calcHTML;
    }
}
addCalculator();
window.calcBulk = () => {
    const qty = document.getElementById('calc-qty').value;
    if(!qty) return;
    let price = 130; let discount = 0;
    if(qty >= 20) { discount = 25; price = 97.5; }
    else if(qty >= 10) { discount = 15; price = 110.5; }
    else if(qty >= 5) { discount = 10; price = 117; }
    const total = (price * qty).toFixed(2);
    document.getElementById('calc-result').innerHTML = `Total: R${total} (${discount}% OFF)`;
    showToast(`For ${qty} bottles: R${total}`);
}
