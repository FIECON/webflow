function filterDatesByYear(dateSelector, year) {
    // Find all elements matching the date selector using jQuery
    $(dateSelector).each(function() {
        // Get the date text and parse it
        const dateText = $(this).text();
        const fullYear = parseInt(dateText.split(', ')[1].trim(), 10);
        
        // If the year doesn't match the filter year
        if (fullYear !== year) {
            // Find the closest parent with class 'collection-item' and hide it
            $(this).closest('.collection-item').hide();
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    filterDatesByYear(".date", currentYear);
});