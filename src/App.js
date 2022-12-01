import "./App.css";
import { useState, useEffect } from "react";
import { RecipeImage } from "./components/RecipeImage";
import { RecipeTitle } from "./components/RecipeTitle";
import { RecipeSteps } from "./components/RecipeSteps";
import { IngredientList } from "./components/IngredientList";

function App() {
  const [recipe, setRecipe] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [prepared, setPrepared] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    fetch("./recipes.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data.recipes[0]);
        setIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (recipe?.ingredients) {
      setPrepared(recipe.ingredients.every((i) => i.prepared));
    }
  }, [recipe]);

  const handleIngredientClick = (index) => {
    const updateRecipe = { ...recipe };
    updateRecipe.ingredients[index].prepared =
      !updateRecipe.ingredients[index].prepared;

    setRecipe(updateRecipe);
  };
  return (
    <article className="container">
      {!isLoaded && <p>Loading...</p>}
      {isLoaded && recipe && (
        <>
          <RecipeImage image={recipe?.image} title={recipe.title} />
          <RecipeTitle title={recipe?.title} feedback={recipe.feedback} />
          <IngredientList
            ingredients={recipe?.ingredients}
            onIngredientClick={handleIngredientClick}
          />
          <h2 className="subtitle">
            {prepared ? "👨‍🍳 Prep work done!" : "🍳 Just Keep chopping"}
          </h2>
          <RecipeSteps steps={recipe?.steps} />
        </>
      )}
    </article>
  );
}

export default App;
