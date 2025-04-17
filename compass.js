// Decryption function using Caesar Cipher with shift of 3 and replacing underscore with space
function selectCountry(country) {
    console.log(country);

    
}

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    let country = urlParams.get('country') || 'US';
    selectCountry(country);
});
