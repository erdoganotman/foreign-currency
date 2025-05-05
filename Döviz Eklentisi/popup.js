document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "https://api.exchangerate-api.com/v4/latest/TRY"; 
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const convertButton = document.getElementById("convert");
    const resultText = document.getElementById("result");
    const eurRate = document.getElementById("eur-rate");
    const usdRate = document.getElementById("usd-rate");
    const gbpRate = document.getElementById("gbp-rate"); 
    const switchButton = document.getElementById("switch");

    // Verileri çek ve seçenekleri oluştur
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            eurRate.innerText = (1 / data.rates["EUR"]).toFixed(2); 
            usdRate.innerText = (1 / data.rates["USD"]).toFixed(2); 
            gbpRate.innerText = (1 / data.rates["GBP"]).toFixed(2); 

            const currencies = Object.keys(data.rates);
            fromCurrency.innerHTML = '';
            toCurrency.innerHTML = '';
            currencies.forEach(currency => {
                let option1 = document.createElement("option");
                option1.value = currency;
                option1.text = currency;
                fromCurrency.appendChild(option1);
                
                let option2 = document.createElement("option");
                option2.value = currency;
                option2.text = currency;
                toCurrency.appendChild(option2);
            });

            // Varsayılan değerler
            fromCurrency.value = "TRY";
            toCurrency.value = "USD";
        });

    // Dönüştür butonuna tıklandığında işlem yap
    convertButton.addEventListener("click", function() {
        const amount = document.getElementById("amount").value;

        // Boş giriş kontrolü
        if (amount === "" || isNaN(amount) || amount <= 0) {
            resultText.innerText = "Lütfen geçerli bir miktar girin.";
            return;
        }

        const from = fromCurrency.value;
        const to = toCurrency.value;

        fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[to];
                const convertedAmount = (amount * rate).toFixed(2);
                resultText.innerText = `${amount} ${from} = ${convertedAmount} ${to}`;
            })
            .catch(error => {
                resultText.innerText = "Hata oluştu. Lütfen tekrar deneyin.";
                console.error(error);
            });
    });

    // Dönüştürücü butonunun değerlerini değiştir
    switchButton.addEventListener("click", function() {
        const temp = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = temp;
    });
});
