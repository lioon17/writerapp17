
document.addEventListener('DOMContentLoaded', (event) => {
    showReview(currentReview);

    const serviceDropdown = document.getElementById('serviceDropdown');
    const serviceSelect = document.getElementById('service');

    serviceDropdown.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const selectedText = event.target.textContent;
            updateServiceSelect(selectedText);
        }
    });

    function updateServiceSelect(serviceText) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
            if (serviceSelect.options[i].text === serviceText) {
                serviceSelect.selectedIndex = i;
                updateTotalPrice(); // Update total price when service selection changes
                break;
            }
        }
    }
});

function showReview(index) {
    const reviews = document.querySelectorAll('.review-card');
    reviews.forEach((review, i) => {
        review.classList.remove('active');
        if (i === index) {
            review.classList.add('active');
        }
    });
}

function moveCarousel(step) {
    const reviews = document.querySelectorAll('.review-card');
    currentReview = (currentReview + step + reviews.length) % reviews.length;
    showReview(currentReview);
}

// Sidebar functions
function showSidebar() {
    document.querySelector(".sidebar").style.display = "flex";
}

function closeSidebar() {
    document.querySelector(".sidebar").style.display = "none";
}

function redirectToOrderPage() {
    window.location.href = '/order';
}

// Open a specific tab
function openTab(event, tabName) {
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }

    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Switch customer type and update UI
function switchCustomerType(event, customerType) {
    const customerForms = document.getElementsByClassName("customer-form");
    for (let i = 0; i < customerForms.length; i++) {
        customerForms[i].style.display = "none";
        customerForms[i].classList.remove("active");
    }

    const customerButtons = document.getElementsByClassName("customer-button");
    for (let i = 0; i < customerButtons.length; i++) {
        customerButtons[i].classList.remove("active");
    }

    document.getElementById(customerType).style.display = "block";
    document.getElementById(customerType).classList.add("active");
    event.currentTarget.classList.add("active");
}


//calculator
const basePrices = {
    "masters": { "24hrs": 25, "week": 20 },
    "phd": { "24hrs": 25, "week": 20 },
    "high-school": { "24hrs": 20, "week": 15 },
    "default": { "24hrs": 20, "week": 20 }
};

function calculatePrice() {
    const level = document.getElementById('level').value;
    const pages = parseInt(document.getElementById('pages').value);
    const deadline = new Date(document.getElementById('deadline').value);
    const today = new Date();
    const daysToDeadline = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

    let pricePerPage;
    if (level === 'masters' || level === 'phd') {
        pricePerPage = daysToDeadline <= 1 ? basePrices[level]["24hrs"] : basePrices[level]["week"];
    } else if (level === 'high-school') {
        pricePerPage = daysToDeadline <= 1 ? basePrices["high-school"]["24hrs"] : basePrices["high-school"]["week"];
    } else {
        pricePerPage = daysToDeadline <= 1 ? basePrices["default"]["24hrs"] : basePrices["default"]["week"];
    }

    const totalPrice = pricePerPage * pages;
    document.getElementById('totalPrice').textContent = `$${totalPrice.toFixed(2)}`;
}

document.getElementById('calculatorForm').addEventListener('input', calculatePrice);

function storeFormData() {
    // Code to store form data and proceed with the order
    alert('Order placed!');
}

// Initial calculation
calculatePrice();



