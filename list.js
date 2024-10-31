function filterDatesByYear(dateSelector, year) {
    $('.collection-item').show();

    $(dateSelector).each(function() {
        const dateText = $(this).text();
        const fullYear = parseInt(dateText.split(', ')[1].trim(), 10);
        
        if (fullYear !== year) {
            $(this).closest('.collection-item').hide();
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    filterDatesByYear(".date", currentYear);

    $('.year').on('click', function() {
        const selectedYear = parseInt($(this).attr('id'), 10);
        $('.year').removeClass('active');
        $(this).addClass('active');
        filterDatesByYear('.date', selectedYear);
    });
});