function displayResults(meal) {
    let results = document.querySelector('.js-search-results')
    console.log(meal.meals)
    results.innerHTML = ''
    if(meal.meals.length < 1 || !meal.meals.length) {
        results.innerHTML = 'Meal not found.'
    } else {
        for(let i = 0; i<meal.meals.length; i++) {
            results.innerHTML += `      
                            <div>
                                <h4 id="mealName">${meal.meals[i].strMeal}</h4>
                                <p id="mealArea">${meal.meals[i].strArea}</p>
                                <p id ="instructions">${meal.meals[i].strInstructions}</p>
                                <img src="${meal.meals[i].strMealThumb}">
                            </div>
                            `
        }
    }

}
/*
i. Complete meal name
ii. Meal area/cuisine
iii. Meal’s instructions of preparation.
iv. Meal’s picture
*/
function searchMeal(meal) {
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`

    let settings = {
        method: 'Get'
    }

    fetch(url,settings)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw new Error('An error ocurred')
        })
        .then(responseJSON => {
            console.log(responseJSON)
            displayResults(responseJSON)
        })
        .catch(err => {
            let results = document.querySelector('.js-search-results')
            results.innerHTML = 'Meal not found.'
            console.log(err)
        })
}

function init() {
    let searchForm = document.querySelector('.js-search-form')

    searchForm.addEventListener('submit', (event => {
        event.preventDefault()
        let meal = document.querySelector('.js-query').value
        searchMeal(meal)
    }))
}

init()