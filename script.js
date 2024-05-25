
const countryList ={
    USA: "US",
    AED: "AE",
    AFN: "AF",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    ARS: "AR",
    AUD: "AU",
    AWG: "AW",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    BTN: "BT",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    EGP: "EG",
    ERN: "ER", 
    ETB: "ET",
    EUR: "EU",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    NGN: "NG",
    NIO: "NI",
    NOK: "NO",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    INR: "IN",
}

const url = "https://v6.exchangerate-api.com/v6/298983e92de5ae6db8eed9c2/latest/USD";
const dropdowns = document.querySelectorAll(".dropdown select");
const rsButton = document.querySelector(".rs-btn");

// add the dropdown 

for(let select of dropdowns) {
    for (let code in countryList) {
        const option = document.createElement("option");

        option.value = code;
        option.textContent = code;

        if(select.name === "from" && code === "USD"){
            option.selected = true;
        }else if(select.name === "to" && code === "INR"){
            option.selected = true;
        } 
        select.appendChild(option);
     }
     select.addEventListener("change", (event)=>{
        updateFlag(event.target);
     })
}


const updateFlag = (select) => {
    const currcode = select.value
    // console.log(currcode)
    let countryCode = countryList[currcode]
    // console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    // console.log(newSrc);
    let img = select.parentElement.querySelector("img");
    img.src = newSrc;
}




rsButton.addEventListener("click", async () => {
    const amount = parseFloat(document.querySelector(".amount").value) || 1;
    const fromCurrency = document.querySelector("#from").value;
    const toCurrency = document.querySelector("#to").value;
    const rsInput = document.querySelector("#rs");

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === "success") {
            const exchangeRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount * exchangeRate).toFixed(2);
            // console.log(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
            rsInput.value = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            
            // Display the converted amount on the UI
        } else {
            console.error("Failed to fetch exchange rates:", data.error);
        }
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
    }
});
