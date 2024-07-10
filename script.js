const country_currency_code = {
    "AED": "ae", "AFN": "af", "XCD": "ag", "ALL": "al", "AMD": "am", "ANG": "ai", "AOA": "ao", "AQD": "aq",
    "ARS": "ar", "AUD": "au", "AZN": "az", "BAM": "ba", "BBD": "bb", "BDT": "bd", "XOF": "be", "BGN": "bg",
    "BHD": "bh", "BIF": "bi", "BMD": "bm", "BND": "bn", "BOB": "bo", "BRL": "br", "BSD": "bs", "NOK": "bv",
    "BWP": "bw", "BYR": "by", "BZD": "bz", "CAD": "ca", "CDF": "cd", "XAF": "cf", "CHF": "ch", "CLP": "cl",
    "CNY": "cn", "COP": "co", "CRC": "cr", "CUP": "cu", "CVE": "cv", "CYP": "cy", "CZK": "cz", "DJF": "dj",
    "DKK": "dk", "DOP": "do", "DZD": "dz", "ECS": "ec", "EEK": "ee", "EGP": "eg", "ETB": "et", "EUR": "eu",
    "FJD": "fj", "FKP": "fk", "GBP": "gb", "GEL": "ge", "GGP": "gg", "GHS": "gh", "GIP": "gi", "GMD": "gm",
    "GNF": "gn", "GTQ": "gt", "GYD": "gy", "HKD": "hk", "HNL": "hn", "HRK": "hr", "HTG": "ht", "HUF": "hu",
    "IDR": "id", "ILS": "il", "INR": "in", "IQD": "iq", "IRR": "ir", "ISK": "is", "JMD": "jm", "JOD": "jo",
    "JPY": "jp", "KES": "ke", "KGS": "kg", "KHR": "kh", "KMF": "km", "KPW": "kp", "KRW": "kr", "KWD": "kw",
    "KYD": "ky", "KZT": "kz", "LAK": "la", "LBP": "lb", "LKR": "lk", "LRD": "lr", "LSL": "ls", "LTL": "lt",
    "LVL": "lv", "LYD": "ly", "MAD": "ma", "MDL": "md", "MGA": "mg", "MKD": "mk", "MMK": "mm", "MNT": "mn",
    "MOP": "mo", "MRO": "mr", "MTL": "mt", "MUR": "mu", "MVR": "mv", "MWK": "mw", "MXN": "mx", "MYR": "my",
    "MZN": "mz", "NAD": "na", "XPF": "nc", "NGN": "ng", "NIO": "ni", "NPR": "np", "NZD": "nz", "OMR": "om",
    "PAB": "pa", "PEN": "pe", "PGK": "pg", "PHP": "ph", "PKR": "pk", "PLN": "pl", "PYG": "py", "QAR": "qa",
    "RON": "ro", "RSD": "rs", "RUB": "ru", "RWF": "rw", "SAR": "sa", "SBD": "sb", "SCR": "sc", "SDG": "sd",
    "SEK": "se", "SGD": "sg", "SKK": "sk", "SLL": "sl", "SOS": "so", "SRD": "sr", "STD": "st", "SVC": "sv",
    "SYP": "sy", "SZL": "sz", "THB": "th", "TJS": "tj", "TMT": "tm", "TND": "tn", "TOP": "to", "TRY": "tr",
    "TTD": "tt", "TWD": "tw", "TZS": "tz", "UAH": "ua", "UGX": "ug", "USD": "us", "UYU": "uy", "UZS": "uz",
    "VEF": "ve", "VND": "vn", "VUV": "vu", "YER": "ye", "ZAR": "za", "ZMK": "zm", "ZWD": "zw"
};

const dropList = document.querySelectorAll(".drop-list select"),
    fromCurrency = document.querySelector(".from select"),
    toCurrency = document.querySelector(".to select"),
    getButton = document.querySelector("form button");

// Populate dropdowns with options and load flags on page load
window.addEventListener("load", () => {
    populateDropdowns();
    getExchangeRate();
});

// Event listener for button click
getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

// Event listener for exchange icon click
const exchangeIcon = document.querySelector(".icon");
exchangeIcon.addEventListener('click', () => {
    swapCurrencies();
});

// Function to populate dropdowns with options and load flags
function populateDropdowns() {
    for (let i = 0; i < dropList.length; i++) {
        for (let currency_code in country_currency_code) {
            let selected = (i === 0 && currency_code === "EUR") || (i === 1 && currency_code === "TRY") ? "selected" : "";
            let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
            dropList[i].insertAdjacentHTML("beforeend", optionTag);
        }
        loadFlag(dropList[i]);
        dropList[i].addEventListener("change", e => {
            loadFlag(e.target);
        });
    }
}

// Function to load flag based on selected currency
function loadFlag(element) {
    let currency_code = element.value;
    let imgTag = element.parentElement.querySelector("img");
    imgTag.src = `https://flagcdn.com/h20/${country_currency_code[currency_code]}.png`;
}

// Function to swap currencies
function swapCurrencies() {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
}

// Function to get exchange rate
function getExchangeRate() {
    let amount = document.querySelector(".amount input").value || 1;
    let exchangeRateText = document.querySelector(".exchange-rate");
    let url = `https://v6.exchangerate-api.com/v6/4a1e285bfd5009f2adb516a1/latest/${fromCurrency.value}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let exchangeRate = data.conversion_rates[toCurrency.value];
            let totalExchangeRate = (amount * exchangeRate).toFixed(2);
            exchangeRateText.innerHTML = `<span style="color: #333">${amount} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}</span>`;
        })
        .catch(() => {
            exchangeRateText.innerText = "Something went wrong";
        });
}

// Function to reset values
function clearVal() {
    document.querySelector(".amount input").value = "1";
    fromCurrency.value = "EUR";
    toCurrency.value = "TRY";
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
}
