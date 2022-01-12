const titleText = window.location.search.replace("?symbol=", "");
console.log(titleText);
console.log(window.location.search.replace("?symbol=", ""));
const title = document.getElementById("title");

const url =
  `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/` +
  titleText;
console.log(url);

const stocksUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${titleText}`;

console.log(stocksUrl);

fetch(stocksUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const pageWrapper = document.getElementById("pageWrapper");

    const headWrapper = document.createElement("a");
    headWrapper.classList.add("headWrapper");
    headWrapper.href = data.profile.website;

    console.log(data.profile.image);
    const image = document.getElementById("images");
    image.src = data.profile.image;

    console.log(data.profile.companyName);
    const companyName = document.createElement("div");
    companyName.textContent = data.profile.companyName;
    companyName.classList.add("companyName");

    console.log(data.profile.website);
    const website = document.createElement("div");
    website.href = data.profile.website;
    website.classList.add("website");

    const stocksWrapper = document.createElement("div");
    stocksWrapper.classList.add("stocksWrapper");

    console.log(data.profile.price);
    const price = document.createElement("div");
    price.textContent = data.profile.price;
    price.classList.add("price");
    price.textContent += `($)`;

    changeData = data.profile.changes.toFixed(2);
    const changes = document.createElement("div");
    changes.textContent = changeData;
    changes.classList.add("changes");

    console.log(data.profile.description);
    const description = document.createElement("div");
    description.textContent = data.profile.description;
    description.classList.add("description");

    headWrapper.append(image, companyName, website);

    if (changeData > 0) {
      changes.textContent += `(%)`;
      changes.classList.add("positiveChange");
    } else if (changeData < 0) {
      changes.textContent += ` (%)`;
      changes.classList.add("negativeChange");
    } else {
      changes.textContent += ` (%)`;
    }

    stocksWrapper.append(price, changes);

    pageWrapper.append(headWrapper, website, stocksWrapper, description);
  });

console.log(fetch(stocksUrl));

const stocksHistoryUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${titleText}?serietype=line`;

console.log(stocksHistoryUrl);
fetch(stocksHistoryUrl)
  .then((response) => response.text())
  .then((historyData) => {
    console.log(historyData);
    
    const dateArray = [];
    const closeArray = [];
    for (let i = 0; i <= 100; i++){
      

      dateArray.push(historyData[i].date);
      closeArray.push(historyData[i].close);
    }

    console.log(dateArray);
    console.log(closeArray);

  
  });


