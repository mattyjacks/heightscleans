# Heights Cleans - Pricing Documentation

## Overview
This document explains the pricing model and calculations used in the Heights Cleans quote calculator. All prices are based on 2024-2025 market research for the Chicago, IL area.

## Research Sources
- Sophia's Cleaning Service (Chicago area pricing study)
- Angi.com (Chicago house cleaning costs)
- Housecall Pro (Commercial cleaning rates)
- Average Chicago residential cleaning: $234-$266
- Average hourly rate: $45-$50 per cleaner
- Deep cleaning premium: 1.5-1.6× standard rate

---

## Residential Pricing Model

### Base Pricing Components

#### Per-Room Method
- **Per Bedroom**: $40
- **Per Bathroom**: $35

**Calculation Formula:**
```
Base Price = (Number of Bedrooms × $40) + (Number of Bathrooms × $35)
```

**Example:**
- 3 bedrooms + 2 bathrooms
- Base Price = (3 × $40) + (2 × $35) = $120 + $70 = **$190**

#### Square Footage Method (Alternative)
When square footage is provided, we use per-square-foot pricing:

- **Standard Clean**: $0.12 per sq ft
- **Deep Clean**: $0.20 per sq ft

**Calculation Formula:**
```
Base Price = Square Footage × Price per Sq Ft
```

**Example:**
- 1,500 sq ft home, standard clean
- Base Price = 1,500 × $0.12 = **$180**

### Cleaning Type Multipliers

Different cleaning types apply different multipliers to the base price:

#### Standard Clean (1.0×)
- Regular maintenance cleaning
- Dusting, vacuuming, mopping
- Kitchen and bathroom cleaning
- **Multiplier: 1.0** (no change to base price)

#### Deep Clean (1.5×)
- Intensive cleaning for homes not cleaned in 30+ days
- Includes baseboards, inside cabinets, detailed scrubbing
- More time-intensive than standard
- **Multiplier: 1.5**

**Example Calculation:**
- Base Price: $190
- Deep Clean: $190 × 1.5 = **$285**

#### Move In/Out Clean (1.4×)
- Cleaning for vacant properties
- Extra attention to areas behind/under furniture
- Carpet edges, closets, all surfaces
- **Multiplier: 1.4**

**Example Calculation:**
- Base Price: $190
- Move In/Out: $190 × 1.4 = **$266**

### Complete Residential Example

**Scenario:** 3-bedroom, 2-bathroom home (1,800 sq ft) requesting a deep clean

**Using Room Method:**
1. Base Price = (3 × $40) + (2 × $35) = $190
2. Deep Clean Multiplier = $190 × 1.5 = $285
3. **Subtotal: $285**

**Using Square Footage Method:**
1. Base Price = 1,800 × $0.20 = $360
2. (Deep clean rate already in price per sq ft)
3. **Subtotal: $360**

*Note: Calculator uses square footage method when provided, otherwise uses room method.*

---

## Commercial Pricing Model

### Base Rate
- **Base Price**: $0.10 per square foot
- **Minimum Charge**: $150 (applies to spaces under 1,500 sq ft)

### Cleaning Type Multipliers

#### Standard Clean (1.0×)
- Regular office cleaning
- Common areas, desks, restrooms
- **Multiplier: 1.0**

#### Deep Clean (1.6×)
- Post-construction cleaning
- Detailed sanitization
- Windows, deep carpet cleaning
- **Multiplier: 1.6**

### Complete Commercial Example

**Scenario:** 2,500 sq ft office space requesting deep clean

1. Base Price = 2,500 × $0.10 = $250
2. Deep Clean Multiplier = $250 × 1.6 = $400
3. Check Minimum = $400 > $150 ✓
4. **Subtotal: $400**

**Scenario 2:** 1,200 sq ft small office requesting standard clean

1. Base Price = 1,200 × $0.10 = $120
2. Standard Clean = $120 × 1.0 = $120
3. Check Minimum = $120 < $150, use minimum
4. **Subtotal: $150** (minimum applied)

---

## Travel Fees & Distance-Based Pricing

Heights Cleans is based in Arlington Heights, IL (60004). Travel fees are calculated based on the customer's ZIP code distance from our base location.

### Distance Categories & Fees

| Distance Range | Travel Fee | Number of ZIP Codes |
|---------------|------------|---------------------|
| 0-25 miles    | **$0**     | 114 ZIP codes       |
| 25-50 miles   | **$25**    | 198 ZIP codes       |
| 50-75 miles   | **$50**    | 139 ZIP codes       |
| 75-100 miles  | **$75**    | 221 ZIP codes       |
| 100+ miles    | Not serviceable | N/A            |

### Free Travel Zone (0-25 miles)
Includes all of immediate Arlington Heights area and nearby suburbs:
- Arlington Heights (60004, 60005)
- Mount Prospect (60056)
- Palatine (60067, 60074, 60095)
- Rolling Meadows (60008)
- Elk Grove Village (60007)
- Des Plaines (60016, 60017, 60018)
- Schaumburg (60173, 60193, 60194, 60195, 60196)
- Buffalo Grove (60089, 60090)
- Prospect Heights (60070)
- Wheeling (60090)
- And many more (see zipCodes.js for complete list)

### Travel Fee Example Calculations

**Example 1: Customer in Palatine (60067)**
- Distance Category: 0-25 miles
- Travel Fee: **$0**
- 3-bed, 2-bath standard clean: $190
- **Total: $190 + $0 = $190**

**Example 2: Customer in Naperville (60540)**
- Distance Category: 25-50 miles
- Travel Fee: **$25**
- 3-bed, 2-bath standard clean: $190
- **Total: $190 + $25 = $215**

**Example 3: Customer in Aurora (60506)**
- Distance Category: 50-75 miles
- Travel Fee: **$50**
- Commercial 3,000 sq ft deep clean: $480
- **Total: $480 + $50 = $530**

**Example 4: Customer in Rockford (61101)**
- Distance Category: 75-100 miles
- Travel Fee: **$75**
- 4-bed, 3-bath deep clean: $367.50
- **Total: $367.50 + $75 = $442.50**

---

## Complete Pricing Examples

### Example 1: Local Residential Standard Clean
- **Property**: 3 bedrooms, 2 bathrooms
- **Type**: Standard clean
- **Location**: Arlington Heights (60004)
- **Calculation**:
  - Base: (3 × $40) + (2 × $35) = $190
  - Multiplier: 1.0× = $190
  - Travel: 0-25 miles = $0
  - **TOTAL: $190**

### Example 2: Large Home Deep Clean
- **Property**: 5 bedrooms, 3 bathrooms, 3,200 sq ft
- **Type**: Deep clean
- **Location**: Downers Grove (60515) - 25 miles
- **Calculation**:
  - Base: 3,200 × $0.20 = $640
  - Travel: 25-50 miles = $25
  - **TOTAL: $665**

### Example 3: Commercial Office
- **Property**: 4,500 sq ft office
- **Type**: Standard clean
- **Location**: Elgin (60123) - 40 miles
- **Calculation**:
  - Base: 4,500 × $0.10 = $450
  - Multiplier: 1.0× = $450
  - Travel: 25-50 miles = $25
  - **TOTAL: $475**

### Example 4: Move Out Clean
- **Property**: 2 bedrooms, 1 bathroom
- **Type**: Move in/out clean
- **Location**: Joliet (60435) - 60 miles
- **Calculation**:
  - Base: (2 × $40) + (1 × $35) = $115
  - Multiplier: 1.4× = $161
  - Travel: 50-75 miles = $50
  - **TOTAL: $211**

---

## Pricing Justification

### Why These Rates?

Our pricing is competitive and fair based on:

1. **Market Research**: Average Chicago cleaning costs $234-$266 for standard homes
2. **Labor Costs**: Average $45-$50/hour per cleaner in Chicago market
3. **Time Estimates**: 
   - Standard clean: 3-4 hours (2 cleaners)
   - Deep clean: 5-7 hours (2 cleaners)
   - Move in/out: 4-6 hours (2 cleaners)

4. **Included in Price**:
   - All cleaning supplies and equipment
   - Insurance and bonding
   - Background-checked employees
   - Travel within 25 miles
   - Satisfaction guarantee

### Price Transparency
- No hidden fees
- Real-time calculator
- Travel fees clearly stated upfront
- All supplies included in base price

---

## Implementation Notes

### Calculator Logic Flow
1. User selects residential or commercial
2. User enters property details
3. Calculator computes base price
4. Calculator applies cleaning type multiplier
5. User enters ZIP code
6. System looks up distance category
7. System applies travel fee
8. Display final quote with breakdown

### Key Functions (quoteCalculator.js)
- `calculateResidentialPrice()`: Handles residential calculations
- `calculateCommercialPrice()`: Handles commercial calculations
- `getTravelFee()`: Looks up travel fee by ZIP code
- `getDistanceCategory()`: Determines which distance range
- `updateQuoteDisplay()`: Updates UI with calculated prices

---

## Future Considerations

### Potential Add-Ons (Not Currently in Calculator)
- Window cleaning: +$75-$150
- Carpet deep clean: +$100-$200
- Appliance interior: +$15-$40 per appliance
- Wall washing: +$150-$300
- Post-construction: +$200-$400

### Discount Structure (To Be Implemented)
- Weekly service: 15% off
- Bi-weekly service: 10% off
- Monthly service: 5% off
- Referral bonus: $25 credit

---

## Contact for Custom Quotes

For services not covered by the online calculator:
- **Phone**: (815) 217-9898
- **Email**: heightscleans54@gmail.com
- **Address**: 1514 W Lillian Ave, Arlington Heights, IL 60004

---

*Last Updated: December 2024*
*Based on 2024-2025 Chicago market research*
