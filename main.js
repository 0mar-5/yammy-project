
window.onload = ()=>{ document.getElementById("loading").style.display = "none" };

// code for side nav buttom
let btn = document.getElementById("btn-slider");
let side = document.getElementById("slider");
let close = document.getElementById("close");

btn.onclick = function () {
  // side.style.removeProperty('left');
  side.classList.add("side-apper");
  side.classList.remove("side-disapper");
  btn.classList.add("hide");
  close.classList.remove("hide");
};

close.onclick = function () {
  side.classList.add("side-disapper");
  side.classList.remove("side-apper");
  close.classList.add("hide");
  btn.classList.remove("hide");
};

/**
 * code for create ui and fetch data from server for main page
 */

// create card ui for main page
 function createUi(dataObj) {
  return `<div class="col-md-3 card1" id="${dataObj.idMeal}"  onclick="detailsOnClick(this)">
    <div  class=" position-relative overflow-hidden rounded-2 ">
        <img class="w-100" src="${dataObj.strMealThumb}" alt="" srcset="">
        <div class="overlay position-absolute d-flex align-items-center text-black p-2">
            <h3>${dataObj.strMeal}</h3>
        </div>
    </div>
</div>`;
}
const x = document.getElementById("rowData");


let myData = [];

function detailsOnClick(event) {
  if (!myData.length) {
    return;
  }
  let targetObj = {};
  myData.forEach((obj) => {
    if (obj.idMeal == event.id) {
      targetObj = obj;
    }
  });
  const createDetailsUi = createInstructionsUi(targetObj);

  x.innerHTML = createDetailsUi;
}

async function fetchData() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    const data = await response.json();
    myData = data.meals;

    for (let i = 0; i < data.meals.length; i++) {
      const mealCard = createUi(data.meals[i]);
      x.innerHTML += mealCard;
    }
  } catch (e) {
    console.log("There was a problem fetching the data .");
  }
}

fetchData();

// create Instructions ui

function createDynmLi(objData) {
  const mapedData = mapingIngredient(objData);
  console.log(mapedData);
  const liData = Object.values(mapedData);
  let liUi = "";
  liData.forEach((arr) => {
    liUi += ` <li class="alert alert-info m-2 p-1">${arr[1]}${arr[0]}</li>`;
  });
  return liUi;
}
function mapingIngredient(objData) {
  const objKeys = Object.keys(objData);
  let counter = 1;
  //val1: [ingrKey, musre]

  const resObj = {};
  objKeys.forEach((key) => {
    if (key == `strIngredient${counter}`) {
      if (objData[key]) {
        resObj["val" + counter] = [
          objData[key],
          objData[`strMeasure${counter}`],
        ];
      }
      counter++;
    }
  });
  return resObj;
}

 function goBack(){
  x.innerHTML = "";
  let mealCard2;
  for (let i = 0; i < myData.length; i++) {
     mealCard2 = createUi(myData[i]);
    x.innerHTML += mealCard2;
  }

  return mealCard2;
}

function createInstructionsUi(myData) {
  const createLi = createDynmLi(myData);
  return `
  <button type="button" onclick="goBack()"class="btn btn-light" id="btn">Go Back</button>
    <div class="row py-5 g-4 detail" id="rowData">
    <div class="col-md-4">
         <img class="w-100 rounded-3" src="${myData.strMealThumb}" alt="">
         <h2>${myData.strMeal}</h2>
    </div>
        <div class="col-md-8">
                <h2>Instructions</h2>
                <p> ${myData.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${myData.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${myData.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${createLi}               
                    </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    
                    <li class="alert alert-danger m-2 p-1">Streetfood</li>
                    <li class="alert alert-danger m-2 p-1"> Onthego</li>
                </ul>

                <a target="_blank" href="${myData.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${myData.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
        </div>
    
    `;
}
//Search area

const searchBtn = document.getElementById("Search");
  
function createSerch (){
  x.innerHTML = "";

  return  x.innerHTML = 
  `
  <button type="button" onclick="goBack()"class="btn btn-light" id="btn">Go Back</button>
  <div class="container w-75" id="searchContainer">
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input  class="form-control bg-transparent text-white" type="text" placeholder="Search By Name" >
        </div>
        <div class="col-md-6">
            <input  maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div></div>
  `
};

searchBtn.addEventListener('click',createSerch) ;



