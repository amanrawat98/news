let searchbar = document.getElementById("search");
let btn = document.getElementById("btn");
let cont = document.querySelector(".container");
let ul = document.querySelector("ul");
let links = document.getElementsByClassName("topics");

let pagebtn = document.getElementById("page");
let page = 1;

var query = "";

let getdata = async (inputdata, page = 1) => {
  let url = `https://newsapi.org/v2/everything?q=${inputdata}&pageSize=10&page=${page}&apiKey=4947050dc60d4962bb67a92d81c2c16b`;

  try {
    let data = await (await fetch(url)).json();
    console.log("data", data);

    let { articles } = data;
    console.log("articles", articles);
    newsapiarticles = articles;
  } catch (error) {
    console.log("error", error);
  }

  return newsapiarticles;
};

let getquery = (query) => {
  let inputdata = searchbar.value;
  query = inputdata;
  console.log(query);
  return query;
};

let displaydata = async (newsapiarticles) => {
  console.log("newsapiarticles", newsapiarticles);

  newsapiarticles.forEach((element) => {
    cont.innerHTML += `<div class="post">
    <img
      src=${element.urlToImage}
      alt="bitcoin"
      class="sourceimg"
    />
    <div class="info-container">
      <h2 id="title">${element.title.slice(0, 60)}</h2>
      <div class="upload">
        <span class="content">${element.source.name}</span>
        <span class="content">${new Date(
          element.publishedAt
        ).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</span>
      </div>
      <span class="content">${element.content.slice(0, 180)}</span>

    </div>
  </div> `;
  });
};

btn.addEventListener("click", async function () {
  let pageid = btn.getAttribute("id");
  console.log("page id", pageid);
  let inputdata = getquery();
  let value = await getdata(inputdata);
  console.log("the api", value);
  displaydata(value);
});

function print() {
  let pageid = pagebtn.getAttribute("id");

  getdata(pageid);
}

window.onload = function () {
  window.addEventListener("scroll", async function () {
    let srrollheight = window.scrollY;
    let offsetheight = document.documentElement.scrollHeight;
    let viewport = window.innerHeight;
    console.log(srrollheight, offsetheight);

    if (srrollheight + viewport + 10 >= offsetheight) {
      let inputdata = searchbar.value;
      console.log("q  inputdata", inputdata);
      ++page;
      let data = await getdata(inputdata, page);
      displaydata(data);
    }
  });
};



for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", async function (e) {
    console.log("the event is", e);
    console.log("Clicked element:", e.currentTarget.innerHTML); // Accessing the clicked element

    let value = e.currentTarget.innerHTML;
    let data = await getdata(value, 1);
    cont.innerHTML = '';
    searchbar.value = value;
    displaydata(data);
  });
}
