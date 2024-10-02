// Decryption function using Caesar Cipher with shift of 3 and replacing underscore with space
function decryptCaesarCipher(str, shift) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        
        // Check if the character is uppercase
        if (charCode >= 65 && charCode <= 90) {
            result += String.fromCharCode(((charCode - 65 - shift + 26) % 26) + 65);
        }
        // Check if the character is lowercase
        else if (charCode >= 97 && charCode <= 122) {
            result += String.fromCharCode(((charCode - 97 - shift + 26) % 26) + 97);
        }
        // Replace underscore with space
        else if (str[i] === '_') {
            result += ' ';
        } else {
            // If it's not a letter, add it as is
            result += str[i];
        }
    }
    return result;
}

// Test the decryption with one of the hashed names
let hashedName = "Vdqmhhy_Edox"; // Example hashed name
let decryptedName = decryptCaesarCipher(hashedName, 3);
console.log(decryptedName); // Outputs: "Sanjeev Balu"


document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    let hashedName = urlParams.get('id');
    
    if (hashedName) {
        console.log("Hashed Name:", hashedName);
        hashedName = decryptCaesarCipher(hashedName, 3);
        $('#name').text(hashedName);
        // You can use hashedName for further processing here
    } else {
        window.location.href = 'https://fiecon.com';
    }
});
