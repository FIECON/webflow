// Function to map country names to ISO codes
function getCountryCode(countryName) {
    const countryMap = {
        'United States': 'us',
        'United States of America': 'us',
        'USA': 'us',
        'United Kingdom': 'gb',
        'UK': 'gb',
        'Great Britain': 'gb',
        'Poland': 'pl',
        'Germany': 'de',
        'France': 'fr',
        'Spain': 'es',
        'Italy': 'it',
        'Netherlands': 'nl',
        'Belgium': 'be',
        'Switzerland': 'ch',
        'Austria': 'at',
        'Sweden': 'se',
        'Norway': 'no',
        'Denmark': 'dk',
        'Finland': 'fi',
        'Ireland': 'ie',
        'Portugal': 'pt',
        'Greece': 'gr',
        'Czech Republic': 'cz',
        'Slovakia': 'sk',
        'Hungary': 'hu',
        'Romania': 'ro',
        'Bulgaria': 'bg',
        'Croatia': 'hr',
        'Slovenia': 'si',
        'Estonia': 'ee',
        'Latvia': 'lv',
        'Lithuania': 'lt',
        'Luxembourg': 'lu',
        'Malta': 'mt',
        'Cyprus': 'cy'
    };

    // Try to find the country code, case-insensitive
    const normalizedName = countryName.trim();
    const code = countryMap[normalizedName] || countryMap[Object.keys(countryMap).find(key => 
        key.toLowerCase() === normalizedName.toLowerCase()
    )];
    
    return code || 'us'; // Default to US if country not found
}

// Function to display country flag using flagcdn.com
function displayFlagSVG(countryCode, containerSelector = '.flag') {
    try {
        // Convert country name to code if it's a full name
        const code = typeof countryCode === 'string' && countryCode.length > 2 
            ? getCountryCode(countryCode) 
            : countryCode.toLowerCase();
            
        const flagUrl = `https://flagcdn.com/w80/${code}.png`;
        
        $(containerSelector).html(`<img src="${flagUrl}" alt="${countryCode} flag" style="width: 100%; height: auto; max-height: 64px; border-radius: 50%;" />`);
    } catch (error) {
        console.error('Error displaying flag:', error);
    }
}

// Decryption function using Caesar Cipher with shift of 3 and replacing underscore with space
function selectCountry(country) {
    console.log(country);
    displayFlagSVG(country);
}

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    let country = urlParams.get('country') || 'United States';
    selectCountry(country);
});
