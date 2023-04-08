// code for side nav buttom 
let btn = document.getElementById("btn-slider");
let side = document.getElementById("slider");
let close = document.getElementById("close");

btn.onclick=function (){
    // side.style.removeProperty('left');
    side.classList.add("side-apper");
    side.classList.remove("side-disapper");
    btn.classList.add("hide");
    close.classList.remove("hide");

};

close.onclick=function () {
    side.classList.add("side-disapper");
    side.classList.remove("side-apper");
    close.classList.add("hide");
    btn.classList.remove("hide");

};

/**
 * code for create ui and fetch data from server for main page
 */

// create card ui for main page  
function createUi (dataObj) {
    return `<div class="col-md-3 card1">
    <div  class=" position-relative overflow-hidden rounded-2 ">
        <img class="w-100" src="${dataObj.strMealThumb}" alt="" srcset="">
        <div class="overlay position-absolute d-flex align-items-center text-black p-2">
            <h3>${dataObj.strMeal}</h3>
        </div>
    </div>
</div>`
};
const x = document.getElementById("rowData");

// get the main meals data from server and add the ui to the main page
function fetchData (){
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=").then((res)=>{
        return res.json();
    }).then((res) =>{
        console.log(res);
        for(let i=0; i<res.meals.length;i++){
           const mealCard =  createUi(res.meals[i]);
           x.innerHTML += mealCard;

        }
    })
};

fetchData ();

