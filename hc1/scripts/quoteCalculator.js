const pricingData = {
    residential: {
        basePricePerBedroom: 40,
        bathroomPrice: 35,
        standardCleanMultiplier: 1.0,
        deepCleanMultiplier: 1.5,
        moveInOutMultiplier: 1.4,
        squareFootPriceStandard: 0.12,
        squareFootPriceDeep: 0.20
    },
    commercial: {
        basePricePerSqFt: 0.10,
        standardCleanMultiplier: 1.0,
        deepCleanMultiplier: 1.6,
        minimumCharge: 150
    }
};

let currentQuote = null;

function initializeQuoteForm() {
    const quoteType = document.querySelectorAll('input[name="quoteType"]');
    const residentialFields = document.getElementById('residentialFields');
    const commercialFields = document.getElementById('commercialFields');
    
    quoteType.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'residential') {
                residentialFields.style.display = 'block';
                commercialFields.style.display = 'none';
            } else {
                residentialFields.style.display = 'none';
                commercialFields.style.display = 'block';
            }
            updateQuoteDisplay();
        });
    });
    
    const allInputs = document.querySelectorAll('#quoteForm input, #quoteForm select');
    allInputs.forEach(input => {
        input.addEventListener('input', updateQuoteDisplay);
        input.addEventListener('change', updateQuoteDisplay);
    });
}

function calculateResidentialPrice(bedrooms, bathrooms, cleanType, squareFeet = null) {
    let basePrice = 0;
    
    if (squareFeet && squareFeet > 0) {
        if (cleanType === 'deep') {
            basePrice = squareFeet * pricingData.residential.squareFootPriceDeep;
        } else {
            basePrice = squareFeet * pricingData.residential.squareFootPriceStandard;
        }
    } else {
        basePrice = (bedrooms * pricingData.residential.basePricePerBedroom) +
                    (bathrooms * pricingData.residential.bathroomPrice);
    }
    
    let multiplier = 1.0;
    switch(cleanType) {
        case 'standard':
            multiplier = pricingData.residential.standardCleanMultiplier;
            break;
        case 'deep':
            multiplier = pricingData.residential.deepCleanMultiplier;
            break;
        case 'moveInOut':
            multiplier = pricingData.residential.moveInOutMultiplier;
            break;
    }
    
    return basePrice * multiplier;
}

function calculateCommercialPrice(squareFeet, cleanType) {
    let basePrice = squareFeet * pricingData.commercial.basePricePerSqFt;
    
    let multiplier = 1.0;
    if (cleanType === 'deep') {
        multiplier = pricingData.commercial.deepCleanMultiplier;
    }
    
    const totalPrice = basePrice * multiplier;
    return Math.max(totalPrice, pricingData.commercial.minimumCharge);
}

function updateQuoteDisplay() {
    const quoteType = document.querySelector('input[name="quoteType"]:checked');
    if (!quoteType) return;
    
    let subtotal = 0;
    let breakdown = [];
    
    if (quoteType.value === 'residential') {
        const bedrooms = parseInt(document.getElementById('bedrooms').value) || 0;
        const bathrooms = parseInt(document.getElementById('bathrooms').value) || 0;
        const cleanType = document.getElementById('cleanType').value;
        const squareFeet = parseInt(document.getElementById('squareFeet').value) || 0;
        
        if (bedrooms > 0 || bathrooms > 0 || squareFeet > 0) {
            subtotal = calculateResidentialPrice(bedrooms, bathrooms, cleanType, squareFeet);
            
            if (squareFeet > 0) {
                breakdown.push(`${squareFeet} sq ft @ $${cleanType === 'deep' ? pricingData.residential.squareFootPriceDeep : pricingData.residential.squareFootPriceStandard}/sq ft`);
            } else {
                if (bedrooms > 0) breakdown.push(`${bedrooms} bedroom${bedrooms > 1 ? 's' : ''} × $${pricingData.residential.basePricePerBedroom}`);
                if (bathrooms > 0) breakdown.push(`${bathrooms} bathroom${bathrooms > 1 ? 's' : ''} × $${pricingData.residential.bathroomPrice}`);
            }
            
            const cleanTypeText = cleanType === 'standard' ? 'Standard Clean' : 
                                 cleanType === 'deep' ? 'Deep Clean (1.5× base)' : 
                                 'Move In/Out Clean (1.4× base)';
            breakdown.push(cleanTypeText);
        }
    } else {
        const squareFeet = parseInt(document.getElementById('commercialSquareFeet').value) || 0;
        const cleanType = document.getElementById('commercialCleanType').value;
        
        if (squareFeet > 0) {
            subtotal = calculateCommercialPrice(squareFeet, cleanType);
            breakdown.push(`${squareFeet} sq ft @ $${pricingData.commercial.basePricePerSqFt}/sq ft`);
            if (cleanType === 'deep') {
                breakdown.push('Deep Clean (1.6× base)');
            }
            if (subtotal === pricingData.commercial.minimumCharge) {
                breakdown.push(`Minimum charge: $${pricingData.commercial.minimumCharge}`);
            }
        }
    }
    
    const zipCode = document.getElementById('zipCode').value;
    let travelFee = 0;
    let distanceMessage = '';
    
    if (zipCode && zipCode.length === 5) {
        travelFee = getTravelFee(zipCode);
        const category = getDistanceCategory(zipCode);
        
        if (travelFee === "not_available") {
            distanceMessage = 'Sorry, this location is outside our service area (100+ miles)';
            subtotal = 0;
        } else if (travelFee === 0) {
            distanceMessage = 'Within 25 miles - Free travel!';
        } else {
            distanceMessage = `${category.replace('-', ' to ')} miles away`;
            breakdown.push(`Travel fee: $${travelFee}`);
        }
    }
    
    const total = subtotal + (typeof travelFee === 'number' ? travelFee : 0);
    
    currentQuote = {
        subtotal: subtotal,
        travelFee: typeof travelFee === 'number' ? travelFee : 0,
        total: total,
        breakdown: breakdown,
        distanceMessage: distanceMessage
    };
    
    displayQuoteResults();
}

function displayQuoteResults() {
    const resultsDiv = document.getElementById('quoteResults');
    const breakdownList = document.getElementById('priceBreakdown');
    const subtotalEl = document.getElementById('subtotalAmount');
    const travelFeeEl = document.getElementById('travelFeeAmount');
    const totalEl = document.getElementById('totalAmount');
    const distanceEl = document.getElementById('distanceMessage');
    const requestQuoteBtn = document.getElementById('requestQuoteBtn');
    
    if (!currentQuote || currentQuote.total === 0) {
        resultsDiv.style.display = 'none';
        return;
    }
    
    resultsDiv.style.display = 'block';
    
    breakdownList.innerHTML = '';
    currentQuote.breakdown.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        breakdownList.appendChild(li);
    });
    
    subtotalEl.textContent = `$${currentQuote.subtotal.toFixed(2)}`;
    travelFeeEl.textContent = `$${currentQuote.travelFee.toFixed(2)}`;
    totalEl.textContent = `$${currentQuote.total.toFixed(2)}`;
    distanceEl.textContent = currentQuote.distanceMessage;
    
    if (currentQuote.distanceMessage.includes('outside our service area')) {
        distanceEl.style.color = '#dc2626';
        requestQuoteBtn.disabled = true;
        requestQuoteBtn.textContent = 'Outside Service Area';
    } else {
        distanceEl.style.color = currentQuote.travelFee === 0 ? '#10b981' : '#6b7280';
        requestQuoteBtn.disabled = false;
        requestQuoteBtn.textContent = 'Request This Quote';
    }
}

function handleQuoteSubmit(e) {
    e.preventDefault();
    
    if (!currentQuote || currentQuote.total === 0) {
        showQuoteMessage('Please complete the quote calculator first.', 'error');
        return;
    }
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const zipCode = formData.get('zipCode');
    const notes = formData.get('notes');
    
    if (!name || !email || !phone || !address || !zipCode) {
        showQuoteMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showQuoteMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    if (!validatePhone(phone)) {
        showQuoteMessage('Please enter a valid phone number.', 'error');
        return;
    }
    
    const quoteData = {
        customerInfo: { name, email, phone, address, zipCode },
        quote: currentQuote,
        notes: notes,
        timestamp: new Date().toISOString()
    };
    
    console.log('Quote Request Submitted:', quoteData);
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        showQuoteMessage(`Thank you, ${name}! We've received your quote request for $${currentQuote.total.toFixed(2)}. We'll contact you within 24 hours at ${phone} or ${email} to schedule your cleaning service.`, 'success');
        
        e.target.reset();
        document.getElementById('quoteResults').style.display = 'none';
        currentQuote = null;
        
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

function showQuoteMessage(text, type) {
    const messageDiv = document.getElementById('quoteMessage');
    if (messageDiv) {
        messageDiv.textContent = text;
        messageDiv.className = 'quote-message ' + type;
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 8000);
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        initializeQuoteForm();
        quoteForm.addEventListener('submit', handleQuoteSubmit);
    }
});
