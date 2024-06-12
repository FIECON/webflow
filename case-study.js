const challengesCounter = 1;
const actionsCounter = 3;
const resultsCounter = 3;

function onPageLoad() { 
    var challenges = $('.challenge');
    var dividers = $('.divider-default');

    challenges.each(function(index) {
        $(this).toggle(index < challengesCounter);
    });

    dividers.each(function(index) {
        $(this).toggle(index < challengesCounter - 1);
    });

    var actions = $('.action-card');
    actions.each(function(index) {
        $(this).toggle(index < actionsCounter);
    });

    var results = $('.results-text');
    results.each(function(index) {
        $(this).toggle(index < resultsCounter);
    });
}

document.addEventListener("DOMContentLoaded", onPageLoad);