function formatMoneyInBillions(value) {
    return (value / 1e9).toFixed(2) + "B";
}

function fetchData(token) {
    fetch(`https://api.coingecko.com/api/v3/coins/${token}`)
        .then(response => response.json())
        .then(data => {
            const cryptoData = data;
            document.getElementById("token-name").textContent = cryptoData.name;

            document.getElementById("token-image").src = cryptoData.image.small;
            
            document.getElementById("market-cap").innerHTML = "MARKET CAP<br> $" + formatMoneyInBillions(cryptoData.market_data.market_cap.usd);

            document.getElementById("price").innerHTML = "PRICE<br> $" + cryptoData.market_data.current_price.usd.toLocaleString();

            document.getElementById("volume").innerHTML = "24H TRADING VOLUME<br> $" + formatMoneyInBillions(cryptoData.market_data.total_volume.usd);
        })
        .catch(error => console.error("Error fetching data:", error));
}


const selectElement = document.getElementById("crypto-select");
        selectElement.addEventListener("change", function() {
            const selectedValue = selectElement.value;
            fetchData(selectedValue);
        });
// Call the fetchData function to load data
fetchData(selectElement.value);