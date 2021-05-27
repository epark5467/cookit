import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

const GetRandomRecipe = () => {

    const [randomRecipe, setRandomRecipe] = useState([]);

    const newRandomRecipe = async () => {
        const response = await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1&tags=vegetarian%2Cdessert", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "cefe136227msh0b059b0dae03856p1ded42jsnfb9274bb08d9",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        });

        
        const result = await response.json();
    
        setRandomRecipe(result.recipes[0]);

    };

    useEffect(() => {
        newRandomRecipe();
    }, [])

    return (
        <div className="random-recipe-container">
          <img alt={randomRecipe.title} src={randomRecipe.image} />
          <Typography variant="h5">
            {randomRecipe.title}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: randomRecipe.summary }} />
        </div>
    );
};

export default GetRandomRecipe;