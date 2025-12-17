# Heights Cleans Website

A professional, modern website for Heights Cleans - a cleaning service company based in Arlington Heights, IL.

## 🌟 Features

- **3 Pages**: Home, Quote Calculator, and Contact
- **Unified Header/Footer**: Consistent navigation across all pages using modular JavaScript
- **Interactive Quote Calculator**: Real-time pricing with distance-based travel fees
- **Responsive Design**: Mobile-friendly, works on all devices
- **Modern UI**: Beautiful gradients, animations, and smooth transitions
- **ZIP Code Validation**: Automatic travel fee calculation for 100-mile service area

## 📁 Project Structure

```
hc1/
├── index.html              # Home page
├── quote.html              # Quote calculator page
├── contact.html            # Contact page
├── scripts/
│   ├── header.js          # Unified header/footer component
│   ├── navigation.js      # Navigation & scroll effects
│   ├── zipCodes.js        # ZIP code database & travel fee logic
│   └── quoteCalculator.js # Pricing calculator & form handling
├── styles/
│   ├── main.css           # Global styles & components
│   ├── quote.css          # Quote page specific styles
│   └── contact.css        # Contact page specific styles
├── PRICING_DOCUMENTATION.md  # Detailed pricing methodology
└── README.md              # This file
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue (#2563eb) - Trust and professionalism
- **Secondary**: Green (#10b981) - Cleanliness and eco-friendly
- **Accent**: Amber (#f59e0b) - Energy and warmth

### Visual Elements
- Gradient backgrounds with dot patterns
- Smooth hover animations on cards and buttons
- Responsive grid layouts
- Modern sans-serif typography
- Box shadows for depth

## 💰 Pricing System

### Residential Cleaning
- **Per Room Method**: $40/bedroom + $35/bathroom
- **Square Footage Method**: $0.12-$0.20/sq ft (depending on clean type)
- **Clean Types**:
  - Standard: 1.0× multiplier
  - Deep: 1.5× multiplier
  - Move In/Out: 1.4× multiplier

### Commercial Cleaning
- **Base Rate**: $0.10/sq ft
- **Minimum**: $150
- **Deep Clean**: 1.6× multiplier

### Travel Fees (Distance-based)
- **0-25 miles**: FREE (114 ZIP codes)
- **25-50 miles**: $25 (198 ZIP codes)
- **50-75 miles**: $50 (139 ZIP codes)
- **75-100 miles**: $75 (221 ZIP codes)
- **100+ miles**: Not serviceable

## 🚀 How to Use

### Opening the Website
1. Navigate to the `hc1` folder
2. Open `index.html` in your web browser
3. All pages are fully functional locally

### Quote Calculator
1. Go to the Quote page
2. Select Residential or Commercial
3. Enter property details
4. Add ZIP code to calculate travel fee
5. Fill in contact information
6. Click "Request This Quote"

### Unified Header Architecture
The header and footer are loaded dynamically on each page:
- Defined once in `scripts/header.js`
- Automatically injected into placeholders
- Active page highlighting
- Mobile-responsive menu

## 📞 Contact Information

- **Phone**: (815) 217-9898
- **Email**: heightscleans54@gmail.com
- **Address**: 1514 W Lillian Ave, Arlington Heights, IL 60004

## 🛠️ Technical Details

### JavaScript Features
- Modular architecture with separated concerns
- Real-time price calculation
- ZIP code distance lookup
- Form validation
- Intersection Observer for scroll animations
- Mobile menu toggle

### CSS Features
- CSS Variables for theming
- Flexbox and Grid layouts
- Media queries for responsiveness
- Keyframe animations
- Pseudo-elements for effects

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6 JavaScript features
- CSS Grid and Flexbox

## 📊 Pricing Research

All pricing is based on 2024-2025 Chicago market research:
- Average Chicago cleaning: $234-$266
- Hourly rates: $45-$50 per cleaner
- Deep clean premium: 1.5-1.6× standard

See `PRICING_DOCUMENTATION.md` for complete methodology and calculations.

## 🎯 Key Pages

### Home Page (`index.html`)
- Hero section with call-to-action
- 6 service cards
- 4 feature highlights
- Mobile responsive

### Quote Page (`quote.html`)
- 4-step process visualization
- Dual mode (Residential/Commercial)
- Real-time price display
- Distance-based fees
- Contact form integration

### Contact Page (`contact.html`)
- Contact information cards
- Service inquiry form
- Business hours
- Service areas map

## 🔄 Future Enhancements

Potential additions:
- Gallery page with before/after photos
- Customer testimonials section
- Online booking/scheduling
- Payment integration
- Blog for cleaning tips
- Service frequency discounts

## 📝 Notes

- All prices include supplies and labor
- Background-checked cleaners
- 100% satisfaction guarantee
- Licensed and insured
- Eco-friendly products available

---

**Built with modern web standards**
**Designed for Heights Cleans, Arlington Heights, IL**
