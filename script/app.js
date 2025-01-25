'use strict';

const foodItems = [
    {
        img: "./assets/images/unsplash_MqT0asuoIcU.png",
        description: "Home made pizza",
        price: "₹190",
        rateIcon: "./assets/icons/star.svg",
        rating: "3.7",
        time: "50-79 min",
        cartIcon: "./assets/icons/plus.svg"
    },
    {
        img: "./assets/images/unsplash_UxRhrU8fPHQ.png",
        description: "Tandoori Chicken", 
        price: "₹350",
        rateIcon: "./assets/icons/star.svg",
        rating: "4.2",
        time: "45-60 min",
        cartIcon: "./assets/icons/plus.svg"
    },
    {
        img: "./assets/images/unsplash_CbNAuxSZTFo.png",
        description: "Chicken Biryani",
        price: "₹250", 
        rateIcon: "./assets/icons/star.svg",
        rating: "4.5",
        time: "30-45 min",
        cartIcon: "./assets/icons/plus.svg"
    },
    {
        img: "./assets/images/unsplash_Y6OgisiGBjM.png",
        description: "Paneer Butter Masala",
        price: "₹220",
        rateIcon: "./assets/icons/star.svg",
        rating: "4.0",
        time: "25-40 min",
        cartIcon: "./assets/icons/plus.svg"
    },
    {
        img: "./assets/images/unsplash_nP11TkjxJ7s.png",
        description: "Masala Dosa",
        price: "₹120",
        rateIcon: "./assets/icons/star.svg",
        rating: "4.3",
        time: "20-30 min",
        cartIcon: "./assets/icons/plus.svg"
    },
    {
        img: "./assets/images/unsplash_60nzTP7_hMQ.png",
        description: "Butter Naan",
        price: "₹40",
        rateIcon: "./assets/icons/star.svg",
        rating: "4.1",
        time: "15-25 min",
        cartIcon: "./assets/icons/plus.svg"
    },
    {
        img: "./assets/images/unsplash_sejqj6Eaqe8.png",
        description: "Dal Makhani",
        price: "₹180",
        rateIcon: "./assets/icons/star.svg",
        rating: "4.4",
        time: "30-45 min",
        cartIcon: "./assets/icons/plus.svg"
    },
    {
        img: "./assets/images/unsplash_33GPuoFI7v8.png",
        description: "Veg Thali",
        price: "₹160",
        rateIcon: "./assets/icons/star.svg",
        rating: "4.2",
        time: "25-35 min",
        cartIcon: "./assets/icons/plus.svg"
    },
    {
        img: "./assets/images/unsplash_MqT0asuoIcU.png",
        description: "Home made pizza",
        price: "₹190",
        rateIcon: "./assets/icons/star.svg",
        rating: "3.7",
        time: "50-79 min",
        cartIcon: "./assets/icons/plus.svg"
    },
    {
        img: "./assets/images/unsplash_UxRhrU8fPHQ.png",
        description: "Tandoori Chicken",
        price: "₹350",
        rateIcon: "./assets/icons/star.svg",
        rating: "4.2",
        time: "45-60 min",
        cartIcon: "./assets/icons/plus.svg"
    },
    {
        img: "./assets/images/unsplash_CbNAuxSZTFo.png",
        description: "Chicken Biryani",
        price: "₹250",
        rateIcon: "./assets/icons/star.svg",
        rating: "4.5",
        time: "30-45 min",
        cartIcon: "./assets/icons/plus.svg"
    },
    {
        img: "./assets/images/unsplash_Y6OgisiGBjM.png",
        description: "Paneer Butter Masala",
        price: "₹220",
        rateIcon: "./assets/icons/star.svg",
        rating: "4.0",
        time: "25-40 min",
        cartIcon: "./assets/icons/plus.svg"
    }
];

// DOM Elements
const DOM = {
    foodGridContainer: document.getElementById('middle3'),
    carouselTrack: document.querySelector('.carousel-track'),
    prevButton: document.getElementById('btn-rev'),
    nextButton: document.getElementById('btn-for')
};

// Food Grid Renderer
const foodGridRenderer = {
    render() {
        if (!DOM.foodGridContainer) return;
        DOM.foodGridContainer.innerHTML = foodItems.map(item => `
            <div class="block">
                <div class="details">
                    <div>
                        <img src="${item.img}" alt="${item.description}" class="img4"/>
                    </div>
                    <div class="row">
                        <p>${item.description}</p>
                        <p>${item.price}</p>
                    </div>
                    <div class="row">
                        <div class="rate">
                            <div class="rating">
                                <img src="${item.rateIcon}" alt="rating"/>
                                <p>${item.rating}</p>
                            </div>
                            <div class="time">
                                <p>${item.time}</p>
                            </div>
                        </div>
                        <div class="plus" onclick="addToCart(${JSON.stringify(item)})">
                            <img src="${item.cartIcon}" alt="add to cart"/>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
};

// Carousel Controller
const carouselController = {
    currentIndex: 0,
    isAnimating: false,

    init() {
        if (!DOM.carouselTrack) return;
        this.updateDisplay();
        DOM.prevButton?.addEventListener('click', () => {
            if (!this.isAnimating) this.slide('prev');
        });
        DOM.nextButton?.addEventListener('click', () => {
            if (!this.isAnimating) this.slide('next');
        });
    },

    slide(direction) {
        if (this.isAnimating) return; 
        this.isAnimating = true;

        if (direction === 'next') {
            this.currentIndex = (this.currentIndex + 1) % foodItems.length;
        } else {
            this.currentIndex = (this.currentIndex - 1 + foodItems.length) % foodItems.length;
        }
        this.updateDisplay();

        // Reset isAnimating after transition completes
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    },

    updateDisplay() {
        const itemsToShow = 3;
        let items = [];
        
        for (let i = 0; i < itemsToShow; i++) {
            const index = (this.currentIndex + i) % foodItems.length;
            items.push(foodItems[index]);
        }

        DOM.carouselTrack.style.opacity = '0';
        setTimeout(() => {
            DOM.carouselTrack.innerHTML = items.map(item => this.createItemHTML(item)).join('');
            
            const carouselItems = DOM.carouselTrack.querySelectorAll('.carousel-item');
            carouselItems.forEach((item, index) => {
                if (index === 1) { // Middle card
                    item.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
                    item.style.zIndex = '2';
                }
            });

            DOM.carouselTrack.style.opacity = '1';
        }, 300);
    },

    createItemHTML(item) {
        return `
            <div class="carousel-item">
                <div class="details">
                    <div>
                        <img src="${item.img}" alt="${item.description}" class="img4"/>
                    </div>
                    <div class="row">
                        <p>${item.description}</p>
                        <p>${item.price}</p>
                    </div>
                    <div class="row">
                        <div class="rate">
                            <div class="rating">
                                <img src="${item.rateIcon}" alt="rating"/>
                                <p>${item.rating}</p>
                            </div>
                            <div class="time">
                                <p>${item.time}</p>
                            </div>
                        </div>
                        <div class="plus" onclick="addToCart(${JSON.stringify(item)})">
                            <img src="${item.cartIcon}" alt="add to cart"/>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
};

// Modal Controllers
let modal = document.getElementsByClassName("background-blured")[0];
let modal2 = document.getElementsByClassName("background-blured")[1];

function openModal() {
    modal.classList.remove("hide1");
    const body = document.body;
    body.style.height = '100vh';
    body.style.overflowY = 'hidden';
}

function closeModal() {
    modal.classList.add("hide1");
    const body = document.body;
    body.style.height = '';
    body.style.overflowY = '';
}

function openModal2() {
    modal2.classList.remove("hide2");
    const body = document.body;
    body.style.height = '100vh';
    body.style.overflowY = 'hidden';
}

function closeModal2() {
    modal2.classList.add("hide2");
    const body = document.body;
    body.style.height = '';
    body.style.overflowY = '';
}

// Cart Functions
let cartItems = [];

function addToCart(item) {
    cartItems.push(item);
    updateCartIndicator();
    openModal();
}

function updateCartIndicator() {
    const indicator = document.querySelector('.alert');
    if (indicator) {
        indicator.style.display = cartItems.length ? 'block' : 'none';
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    foodGridRenderer.render();
    carouselController.init();
    
    document.querySelector('.img2')?.addEventListener('click', openModal);
    document.querySelector('.request-button')?.addEventListener('click', openModal2);

    document.querySelectorAll('.background-blured').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                if (modal.classList.contains('hide1')) {
                    closeModal();
                } else {
                    closeModal2();
                }
            }
        });
    });

    updateCartIndicator();
});

function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const message = document.getElementById('contactMessage');
    
    if (!name.value.trim()) {
        alert('Please enter your name');
        name.focus();
        return;
    }
    
    if (!email.value.trim()) {
        alert('Please enter your email');
        email.focus();
        return;
    }
    
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        alert('Please enter a valid email address');
        email.focus();
        return;
    }
    
    if (!message.value.trim()) {
        alert('Please enter your message');
        message.focus();
        return;
    }
    
    // If all validations pass
    const formData = {
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim()
    };
    
    console.log('Form submitted:', formData);
    event.target.reset();
    alert('Thank you! We will contact you within 48 hours.');
}