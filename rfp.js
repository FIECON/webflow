var selectedService;
const jsonData = {
    "CEM": {
        "title": "Cost-effectiveness model",
        "description": "Assess the cost-effectiveness of your treatment at early stages of development to identify return on investment or informing pricing and negotiations with payers.",
        "includes": "The core scope includes kick-off, model draft, and model final delivery. ",
        "phase3": true,
        "costs": {
        "US": "120000-140000",
        "UK": "95000-110000",
        "EU": "110000-130000"
        },
        "addons": {
        "Strategic-recommendations": "20",
        "Systematic-Literature-Review": "50",
        "Sensitivity-analysis": "5",
        "Model-training-session": "10",
        "External-payer-validation": "3",
        "Technical-report": "30",
        "Summary-presentation": "8",
        "One-page-budget-impact-model": "10"
        },
        "steps": [
        "Kick off meeting",
        "Protocol development",
        "External validation of protocol",
        "Targeted literature searches",
        "Model development"
        ]
    },
    "BIM": {
        "title": "Budget impact model",
        "description": "Assess the adoption costs of a product from a payer’s perspective managing spend in a category of care, encompassing direct acquisition costs and offsets.",
        "includes": "The core scope includes kick-off, model draft, and model final delivery. ",
        "phase3": false,
        "costs": {
        "US": "70000-90000",
        "UK": "55000-70000",
        "EU": "65000-85000"
        },
        "addons": {
        "Technical-report": "25",
        "Summary-presentation": "20",
        "Targeted-literature-review": "10",
        "Protocol": "10",
        "AMCP-dossier-section-4": "15",
        "External-payer-validation": "5",
        "Strategic-and-technical-review": "20"
        },
        "steps": [
        "Kick off meeting",
        "Protocol development",
        "External validation of protocol",
        "Targeted literature searches",
        "Model development"
        ]
    },
    "HTA": {
        "title": "HTA submission",
        "description": "Prepare a NICE HTA submission for a product, encompassing preparation, submission, and post submission negotiation. ",
        "includes": "",
        "phase3": false,
        "costs": {
        "US": "160000-180000",
        "UK": "125000-150000",
        "EU": "150000-170000"
        },
        "addons": {
        "External-ratification": "10",
        "Response-to-EAG-questions": "25",
        "Response-to-technical-report": "25",
        "Appraisal-meeting-support": "10",
        "ACD-response": "20",
        "FAD-response": "5"
        },
        "steps": [
        "Kick off meeting",
        "Response to draft scope",
        "Decision problem meeting proforma",
        "Draft Document A, Document B and Appendices, and budget impact analysis template",
        "Summary of information for patients",
        "Reference list and pack"
        ]
    },
    "VD": {
        "title": "Value pack",
        "description": "Prepare a compendium of value evidence information to be used for value communication with global, regional and local payers.",
        "includes": "",
        "phase3": false,
        "costs": {
        "US": "70000-90000",
        "UK": "55000-70000",
        "EU": "65000-85000"
        },
        "addons": { 
        "Systematic-Literature-Review": "60",
        "Summary-presentation": "20",
        "Reference-pack": "10",
        "Targeted-literature-review": "25",
        "Dossier": "95",
        "Citation-upload": "5"
        },
        "steps": [
        "Kick off meeting",
        "Data deep dive",
        "Dossier draft, 2 rounds of review, final delivery"
        ]
    },
    "PMA": {
        "title": "P&MA strategy",
        "description": "Develop a pricing, access, and reimbursement strategy for global markets and validate with payers and key opinion leaders.",
        "includes": "The core scope includes a P&MA strategy with price potential, evidence generation strategy and launch sequence. ",
        "phase3": false,
        "costs": {
        "US": "30000-50000",
        "UK": "20000-40000",
        "EU": "25000-45000"
        },
        "addons": {
        "Market-access-landscape": "25",
        "Analogue-assessment": "25",
        "Pricing-research-payers": "100",
        "Pricing-research-analogues": "50",
        "Market-access-roadmap": "30",
        "Stakeholder-mapping": "30",
        "Training": "25"
        },
        "steps": [
        "Kick off meeting",
        "Data deep dive",
        "Internal workshop"
        ]
    }
    };

function filterCheckboxesByServiceAddons(serviceArea) {
    $('.radio-group label.w-checkbox').css('display', 'none');
    
    if (jsonData[serviceArea]) {
        const addons = jsonData[serviceArea].addons;
        
        for (let addon in addons) {
        $('#' + addon).closest('.w-checkbox').css('display', 'flex');
        }
    }

    jsonData[serviceArea].phase3? $('#phase3').removeClass('hide') : $('#phase3').addClass('hide');
    $('#RFP-category').text(jsonData[serviceArea].title);
    $('#RFP-description').text(jsonData[serviceArea].description);
    $('#RFP-includes').text(jsonData[serviceArea].includes + "Which additional add-ons would you like to include?");
    }

function determineCurrencyDisplay() {
        let currency = 'US';
        let userLang = navigator.language || navigator.userLanguage;
    
        let euCountryCodes = 'at|be|bg|hr|cy|cz|dk|ee|fi|fr|de|gr|hu|ie|it|lv|lt|lu|mt|nl|pl|pt|ro|sk|si|es|se';
        
        if (userLang.startsWith('en-GB')) {
        currency = 'UK';
        } else if (userLang.match(new RegExp('^(?:' + euCountryCodes + ')-', 'i'))) {
        currency = 'EU';
        } else if (userLang.startsWith('en-US')) {
        currency = 'US';
        }
        return currency;
    }

function convertToCurrencySymbol(location) {
    switch(location) {
        case 'EU':
        return '€';
        case 'UK':
        return '£';
        case 'US':
        return '$';
        default:
        return '';
    }
    }

function calculateValues(serviceArea) {
    let sum = 0;
    const addons = jsonData[serviceArea].addons;
    let activeAddons = [];
    // Iterate over checked checkboxes
    $('.radio-group input[type="checkbox"]:checked').each(function() {
        const checkboxName = $(this).attr('name');
        const addonValue = addons[checkboxName];
        
        if (addonValue) {
            activeAddons.push(checkboxName);
            sum += parseInt(addonValue, 10);
        }
    });
    
    let multiply = 1 + sum/100;
    let location = determineCurrencyDisplay();
    let [start, end] = jsonData[serviceArea].costs[location].split('-').map(Number);
    start = Math.round(start * multiply);
    end = Math.round(end * multiply);
    let currency = convertToCurrencySymbol(location);

    $('#RFP-result-category').text(jsonData[serviceArea].title);
    let presentedPrice = currency + start.toLocaleString() + ' - ' + currency + end.toLocaleString();
    $('#RFP-price').text(presentedPrice);
    $('#presented-price').text(presentedPrice);

    // Render steps
    let html = '';
    jsonData[serviceArea].steps.forEach(item => {
        html += `<div class="radio-input radio-results" style="margin-bottom: 8px"><img src="https://uploads-ssl.webflow.com/64024978031181fc8c1e2e3e/65fed6f861e9120bf58c5b7d_tick.svg" loading="lazy" alt=""><div class="body-2">${item}</div></div>`;
        });
    activeAddons.forEach(item => {
        html += `<div class="radio-input radio-results" style="margin-bottom: 8px"><img src="https://uploads-ssl.webflow.com/64024978031181fc8c1e2e3e/65fed6f861e9120bf58c5b7d_tick.svg" loading="lazy" alt=""><div class="body-2">Add on – ${item}</div></div>`;
        });
    html += `<div class="radio-input radio-results"><img src="https://uploads-ssl.webflow.com/64024978031181fc8c1e2e3e/65fed6f861e9120bf58c5b7d_tick.svg" loading="lazy" alt=""><div class="body-2">Teleconferences, meeting minutes, and project management</div></div>`;
    $('#steps').html(html);

    $('#RFP-request').attr('href', 'mailto:bd@fiecon.com?subject=' + encodeURIComponent('Full RFP request from: ' + $('#First-name').val() + ' ' + $('#Last-name').val()));
    }

function onPageLoad() { 

    $('#continue').click(function(e) {
        e.preventDefault();
        selectedService = $('input[name="services"]:checked').val();
        filterCheckboxesByServiceAddons(selectedService)

        $('#step1').addClass('hide');
        $('#step2').removeClass('hide');
        $('html, body').animate({
            scrollTop: 400
            }, 'slow');
    });
    $('#back').click(function(e) {
        e.preventDefault();

        $('#step1').removeClass('hide');
        $('#step2').addClass('hide');
        $('html, body').animate({
            scrollTop: 400
            }, 'slow');
    });
    $('#submit').click(function(e) {
        calculateValues(selectedService);
        $('html, body').animate({
            scrollTop: 400
            }, 'slow');
    });
}

document.addEventListener("DOMContentLoaded", onPageLoad);