// Getting the global details
const globalEmail = localStorage.getItem("userEmail");
const globalName = localStorage.getItem("userName");
const globalAge = localStorage.getItem("userAge");
const globalGender = localStorage.getItem("userGender");
const globalBirthday = localStorage.getItem("userBirthday");
const globalLevel = localStorage.getItem("userLevel");
const globalGrade = localStorage.getItem("userGrade");
const globalStrand = localStorage.getItem("userStrand");

// Navbar Highlight
document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.getElementById('home-link');
    const aboutLink = document.getElementById('about-link');
    let currentPage = window.location.pathname.split("/").pop();

    if (currentPage === '/' || currentPage.includes('home')) {
        if (homeLink) {
            homeLink.classList.add('text-yellow-500', 'font-bold', '[&::after]:w-full', '[&::after]:-translate-x-1/2');
        }
    } 
    
    if (currentPage.includes('about')) {
        if (aboutLink) {
            aboutLink.classList.add('text-yellow-500', 'font-bold', '[&::after]:w-full', '[&::after]:-translate-x-1/2');
        }
    }
});

// Menu Icon
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const hamburgerIcon = document.getElementById('hamburger-icon');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuBtn.classList.toggle('open');
});

const logoutButtons = document.querySelectorAll('.logoutButton');
const logoutModal = document.getElementById('logoutModal');
const pageOverlay = document.getElementById('pageOverlay');
const confirmLogout = document.getElementById('confirmLogout');
const cancelLogout = document.getElementById('cancelLogout');

// Show modal and backdrop
logoutButtons.forEach(button => {
    button.addEventListener('click', function() {
        logoutModal.classList.remove('hidden');
        pageOverlay.classList.remove('hidden');
    });
});

// Confirm logout action
confirmLogout.addEventListener('click', function() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userAge');
    localStorage.removeItem('userGender');
    localStorage.removeItem('userBirthday');
    localStorage.removeItem('userLevel');
    localStorage.removeItem('userGrade');
    localStorage.removeItem('userStrand');
    window.location.href = '../index.html';
});

// Cancel logout action
cancelLogout.addEventListener('click', function() {
    logoutModal.classList.add('hidden');
    pageOverlay.classList.add('hidden');
});

// Optional: Close modal by clicking the backdrop
pageOverlay.addEventListener('click', function() {
    logoutModal.classList.add('hidden');
    pageOverlay.classList.add('hidden');
});


let totalItems = 0;
let totalPrice = 0;
let documentTracker = {};

// Increment
function increment(id) {
    const quantityElement = document.getElementById(id);
    let quantity = parseInt(quantityElement.innerText);
    const price = parseInt(quantityElement.getAttribute('data-price'));
    const documentName = quantityElement.getAttribute('data-name');

    quantity++;
    quantityElement.innerText = quantity;
    totalItems++;
    totalPrice += price;

    if (documentTracker[documentName]) {
        documentTracker[documentName]++; 
    } else {
        documentTracker[documentName] = 1; 
    }

    console.log(documentTracker);

    updateTotalPriceDisplay();
    updateTotalItemsDisplay();
}

// Decrement
function decrement(id) {
    const quantityElement = document.getElementById(id);
    let quantity = parseInt(quantityElement.innerText);
    const price = parseInt(quantityElement.getAttribute('data-price'));
    const documentName = quantityElement.getAttribute('data-name');

    if (quantity > 0) {
        quantity--;
        quantityElement.innerText = quantity;
        totalPrice -= price;
        totalItems--;

        if (documentTracker[documentName] && documentTracker[documentName] > 0) {
            documentTracker[documentName]--; 
            if (documentTracker[documentName] === 0) {
                delete documentTracker[documentName];
            }
        }        

        console.log(documentTracker);

        updateTotalPriceDisplay();
        updateTotalItemsDisplay();
    }
}

// Total Price
function updateTotalPriceDisplay() {
    const totalPriceElement = document.getElementById('totalPriceDisplay');
    totalPriceElement.innerText = `${totalPrice.toFixed(2)}`;
}

// Total Items
function updateTotalItemsDisplay() {
    const totalItemsElement = document.getElementById('total-items');
    totalItemsElement.innerText = totalItems;
}

// Other documents
function updateDocumentTracker() {
    const otherFormValue = document.getElementById('otherForm').value;
    if (otherFormValue) {
        documentTracker['Other Form'] = otherFormValue;
    }

    const otherCertificateValue = document.getElementById('otherCertificate').value;
    if (otherCertificateValue) {
        documentTracker['Other Certificate'] = otherCertificateValue;
    }

    const otherCTCValue = document.getElementById('ctcotherCTC').value;
    if (otherCTCValue) {
        documentTracker['Other CTC'] = otherCTCValue;
    }

    console.log(documentTracker);  
}

// Reset
document.getElementById('resetBtn').addEventListener('click', function() {
    const formFields = [
        'form137JHS', 'form137SHS', 'form138JHS', 'form138SHS', 'formREG', 'certCOC', 'certCCG', 'certCGSHS', 'certCGC', 'certCGC', 'certCE', 'ctcform137JHS', 'ctcform137SHS', 'ctcform138JHS', 'ctcform138SHS', 'ctcformREG', 'ctccertCOC', 'ctccertCCG', 'ctccertCGSHS', 'ctccertCGC', 'ctccertCE'
    ];

    formFields.forEach(id => {
        document.getElementById(id).innerText = '0';
    });

    document.getElementById('otherForm').value = '';
    document.getElementById('otherCertificate').value = '';
    document.getElementById('ctcotherCTC').value = '';

    document.getElementById('total-items').innerText = '0';
    document.getElementById('totalPriceDisplay').innerText = '0.00';

    for (const key in documentTracker) {
        if (documentTracker.hasOwnProperty(key)) {
            delete documentTracker[key]; 
        }
    }
    
});

// Payment
document.addEventListener("DOMContentLoaded", function () {
    const openModalBtn = document.getElementById("openModalBtn");
    const pageOverlay = document.getElementById("pageOverlay");
    
    const paymentModal = document.getElementById("paymentModal");
    const gcashModal = document.getElementById("gcashModal");
    
    const cancelPayment = document.getElementById("cancelPayment");
    const proceedPayment = document.getElementById("proceedPayment");
    
    const cancelGcash = document.getElementById("cancelGcash");
    const submitPayment = document.getElementById("submitPayment");

    const gcashNumberInput = document.getElementById("gcashNumber");
    const referenceNumberInput = document.getElementById("referenceNumber");

    const gcashNumberError = document.getElementById('gcashNumberError');
    const referenceNumberError = document.getElementById('referenceNumberError');

    openModalBtn.addEventListener("click", () => {
        if (documentTracker && Object.keys(documentTracker).length > 0) {
            updateDocumentTracker();
            paymentModal.classList.remove("hidden");
            pageOverlay.classList.remove("hidden");
        } else {
            alert("Please add documents before proceeding to payment.");
        }
    });

    cancelPayment.addEventListener("click", () => {
        paymentModal.classList.add("hidden");
        pageOverlay.classList.add("hidden");
    });

    proceedPayment.addEventListener("click", () => {
        paymentModal.classList.add("hidden");
        gcashModal.classList.remove("hidden");
    });

    cancelGcash.addEventListener("click", () => {
        gcashNumberInput.value = '';
        referenceNumberInput.value = '';
        gcashModal.classList.add("hidden");
        pageOverlay.classList.add("hidden");
    });

    submitPayment.addEventListener("click", (event) => {
        gcashNumberError.classList.add("hidden");
        referenceNumberError.classList.add("hidden");
        let valid = true;

        const gcashNumber = gcashNumberInput.value.trim();
        const referenceNumber = referenceNumberInput.value.trim();

        const gcashNumberValid = /^9\d{9}$/.test(gcashNumber);
        const referenceNumberValid = /^\d{13}$/.test(referenceNumber);

        if (!gcashNumberValid) {
            gcashNumberInput.classList.add('error');
            gcashNumberError.textContent = "Please enter a valid 10-digit GCash number starting with 9.";
            gcashNumberError.classList.remove("hidden");
            valid = false;
        }
        
        if (!referenceNumberValid) {
            referenceNumberInput.classList.add('error');
            referenceNumberError.textContent = "Please enter a valid 13-digit reference number with digits only.";
            referenceNumberError.classList.remove("hidden");
            valid = false;
        }

        if (valid) {
            gcashNumberInput.value = '';
            referenceNumberInput.value = '';
            gcashNumberInput.classList.remove('error');
            referenceNumberInput.classList.remove('error');
            gcashModal.classList.add("hidden");
            pageOverlay.classList.add("hidden");
            sendEmailWithDetails(gcashNumber, referenceNumber);
        }
    });    
});

function sendEmailWithDetails(gcashNumber, referenceNumber) {
    const userDetails = {
        email: globalEmail,
        name: globalName,
        age: globalAge,
        gender: globalGender,
        birthday: globalBirthday,
        level: globalLevel,
        grade: globalGrade,
        strand: globalStrand,
        gcashNumber: gcashNumber,   
        referenceNumber: referenceNumber,  
    };

    const documentTrackerDetails = documentTracker; 
    const totalItemsCount = totalItems; 
    const totalPriceAmount = totalPrice.toFixed(2); 

    const documentList = Object.entries(documentTrackerDetails)
    .map(([doc, qty]) => 
        `<tr>
            <td>${doc}</td>
            <td style="text-align: center;">${qty}</td>  <!-- Center the quantity -->
        </tr>`
    )
    .join('');

    sendEmail(userDetails, documentList, totalItemsCount, totalPriceAmount);
}

function sendEmail(userDetails, documentList, totalItemsCount, totalPriceAmount) {
    const subject = `New transaction from ${userDetails.name}`;

    const templateParams = {
        to_email: 'alyssa_venisse_aro@bec.edu.ph',
        reply_to: userDetails.email,
        user_name: userDetails.name,
        user_email: userDetails.email,
        user_age: userDetails.age,
        user_gender: userDetails.gender,
        user_birthday: userDetails.birthday,
        user_level: userDetails.level,
        user_grade: userDetails.grade,
        user_strand: userDetails.strand,
        gcash_number: userDetails.gcashNumber,
        reference_number: userDetails.referenceNumber,
        document_tracker: documentList,  
        total_items: totalItemsCount,
        total_price: totalPriceAmount,
    };

    const userParams = {
        to_email: userDetails.email,
        user_email: userDetails.email,
        user_name: userDetails.name,
        date_time: new Date().toLocaleString(),
        gcash_number: userDetails.gcashNumber,
        reference_number: userDetails.referenceNumber,
        document_tracker: documentList,  
        total_items: totalItemsCount,
        total_price: totalPriceAmount,
    };

    emailjs.send('service_zq9s7ii', 'template_zwmg7v8', templateParams)
    .then(response => {
        console.log('Email sent successfully', response);
    }).catch(error => {
        console.error('Error sending email', error);
    });

    emailjs.send('service_zq9s7ii', 'template_mrrmybu', userParams)
    .then(response => {
        console.log('User confirmation email sent successfully', response);
    }).catch(error => {
        console.error('Error sending user confirmation email', error);
    });

    document.getElementById("successModal").classList.remove("hidden");
    document.getElementById("pageOverlay").classList.remove("hidden");
    document.getElementById("closeModal").addEventListener("click", () => {
        document.getElementById("successModal").classList.add("hidden");
        document.getElementById("pageOverlay").classList.add("hidden");
    });
}