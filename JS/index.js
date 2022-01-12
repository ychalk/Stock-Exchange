const symbol = "AA";

document.getElementById("price");
const stockPriceUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nasdaq`;

console.log(stockPriceUrl);
fetch(stockPriceUrl)
  .then((response) => response.json())
  .then((marqueeData) => {
    console.log(marqueeData);
    //put on a for loop define i
    for (let i = 0; i <= 100; i++) {
      let stocksInMarquee = document.createElement("span");
      price.append(stocksInMarquee);
      stocksInMarquee.innerText = ` | ${marqueeData[i].symbol} ($${marqueeData[
        i
      ].price.toFixed(2)})`;
      console.log(marqueeData[i]);

    }
  });

const formInput = document.getElementById("theForm");
const container = document.getElementById("namesWrapper");
formInput.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("Submitted");
  
  container.innerHTML = "";
 
  stockCode = document.getElementById("formInput").value;
  console.log(stockCode);
  stockUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${stockCode}&limit=10&exchange=NASDAQ`;
  console.log(stockUrl);
  submitButton.disabled = "true";
  submitButton.textContent = "Loading...";

  fetch(stockUrl)
    .then((stockResponse) => stockResponse.json())
    .then((stockData) => {
      for (let i = 0; i < stockData.length; i++) {
        console.log(stockData[i]);
        let stockItem = document.createElement("a");
        stockItem.classList.add("stock-item");
        stockItem.href = `./company.html?symbol=${stockData[i].symbol}`;

        container.append(stockItem);
        stockItem.innerText = `${stockData[i].name} ( ${stockData[i].symbol} )`;
       
        profileUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${stockData[i].symbol}`;
        fetch(profileUrl)
          .then((profileResponse) => profileResponse.json())
          .then((profileData) => {
            console.log(profileData);
         
            let companyImage = document.createElement("img");
            stockItem.prepend(companyImage);
            companyImage.src = profileData.profile.image;

            changeData = profileData.profile.changes.toFixed(2);
            const changes = document.createElement("span");
            changes.textContent = changeData;
            changes.classList.add("changes");
            stockItem.append(changes);

            if (changeData > 0) {
              changes.textContent += `(%)`;
              changes.classList.add("positiveChange");
            } else if (changeData < 0) {
              changes.textContent += ` (%)`;
              changes.classList.add("negativeChange");
            } else {
              changes.textContent += ` (%)`;
            }
            setTimeout(() => {
              submitButton.textContent = "Search";
            }, [1000]);
          });
      }
    });
});


