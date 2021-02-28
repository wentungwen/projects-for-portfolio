const submit = document.getElementById("submit"),
  search = document.getElementById("search"),
  random = document.getElementById("random"),
  resultHeading = document.getElementById("result-heading"),
  mealsEl = document.getElementById("meals"),
  singleMealEl = document.getElementById("single-meal");

function searchMeal(e) {
  e.preventDefault();
  singleMealEl.innerText = "";
  const term = search.value;

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search Results of "${term}".</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>Search Results of nothing.</h2>`;
        } else {
          //    mealsEl.innerHTML=
          mealsEl.innerHTML = data.meals.map((meal) => {
            // console.log(meal);
            return `<div class="meal">
            <img src="${meal.strMealThumb}"> 
            <div class="meal-info" data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
               
            </div>
            </div>`;
          });
          search.value = "";
        }
      });
  } else {
    alert("Please enter something.");
  }
}

function getMealByID(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      // console.log(meal);
      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  console.log(111);
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(ingredient + "-" + measure);
    } else {
      break;
    }
  }

  singleMealEl.innerHTML = `
    <h2>Meal Name | ${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="single-meal-info">
      <p>Area | ${meal.strArea}</p>
      <p>Catogory | ${meal.strCategory}</p>
      <ul id="aaa">Ingredients | 
        <li>
         ${addIngredients(ingredients)}
        </li>
      </ul>
    </div>
    `;

  function addIngredients(ingredients) {
    // const ing = document.createElement("div");
    // ing.classList.add("ingredientEl");
    // ing.innerText = ingredients[0];
    console.log(ingredients[0]);
    return ingredients[0];
  }
}

submit.addEventListener("submit", searchMeal);
mealsEl.addEventListener("click", (e) => {
  // 目的:要找出點擊要回傳ID
  // 找出含有meal-info class的元素，並得到ID
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealByID(mealID);
  }
});
