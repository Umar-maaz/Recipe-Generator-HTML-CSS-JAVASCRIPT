// Function to fetch recipe data based on user input
function generate() {
    // Get the user's input from the recipe name input field
    const recipeName = document.getElementById("recipeName").value;

    // Get references to HTML elements for displaying results and errors
    const resultDiv = document.getElementById("result");
    const errorEmpty = document.getElementById("none");
    const errorFetch = document.getElementById("not");

    // Clear any previous results and error messages
    resultDiv.innerHTML = "";
    errorEmpty.style.display = "none";
    errorFetch.style.display = "none";

    // Check if the input field is empty
    if (recipeName.trim() === "") {
        errorEmpty.style.display = "block";
        return; // Exit the function if the input is empty
    }

    // Replace 'YOUR_APP_ID' and 'YOUR_APP_KEY' with your Edamam API credentials
    const appId = '20cc9701';
    const appKey = '70e52a72b4255bade1a6beca0ef18a8b';

    // Create the URL for the Edamam API endpoint
    const apiUrl = `https://api.edamam.com/search?q=${recipeName}&app_id=${appId}&app_key=${appKey}`;

    // Make an API request to fetch recipe data
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Check if there are any recipes in the response
            if (data.hits.length === 0) {
                errorFetch.style.display = "block";
                return; // No recipes found, so exit the function
            }

            // Iterate through the recipes and display them
            data.hits.forEach((recipe) => {
                const recipeData = recipe.recipe;
                const recipeItem = document.createElement("div");
                recipeItem.classList.add("details");
                recipeItem.innerHTML = `
                    <img src="${recipeData.image}" alt="${recipeData.label}">
                    <h2>${recipeData.label}</h2>
                    <p>${recipeData.source}</p>
                    <ul>
                        <li>Calories: ${Math.round(recipeData.calories)}</li>
                        <li>Servings: ${recipeData.yield}</li>
                        <li>Diet Labels: ${recipeData.dietLabels.join(", ")}</li>
                    </ul>
                    <div class="center-button">
                        <a class="rec" href="${recipeData.url}" target="_blank">View Recipe</a>
                    </div>
                `;
                resultDiv.appendChild(recipeItem);
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}
