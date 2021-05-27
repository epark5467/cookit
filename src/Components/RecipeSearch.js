import React, { useState } from 'react';
import { TextField, CircularProgress, Grid, GridList, GridListTile, ListSubheader } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import './RecipeItem';


function RecipeSearch(props) {
    
    const {classes} = props;

    const [recipeList, setRecipeList] = useState([]);
    const [recipeOptionsOpen, setRecipeOptionsOpen] = useState(false);
    const [recipeOptions, setRecipeOptions] = useState([]);
    const [recipeSearchInput, setRecipeSearchInput] = useState("");
    const recipeOptionsLoading = recipeOptionsOpen && recipeOptions.length === 0
    
  
  
    const handleRecipeSearch = async (event) => {
        setRecipeSearchInput(event.target.value);
        const response = await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=" + recipeSearchInput + "&number=100", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "cefe136227msh0b059b0dae03856p1ded42jsnfb9274bb08d9",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        });
  
      let results = await response.json();
      console.log(results);
      setRecipeList(results);
    };
  
  
    return (
      <Grid container className="recipe-search-container">
        <Grid item>
            <TextField 
                value={recipeSearchInput}
                variant="outlined"
                placeholder="recipes"
                onChange={handleRecipeSearch}
            />
        </Grid>
        <Grid item>
            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }} >
                    <ListSubheader component="div">Found {recipeList.length} recipes</ListSubheader>
                </GridListTile>
                
            </GridList> 
        </Grid>
      </Grid>
    );
  }
  
  export default RecipeSearch;
  
  /**
   * 
   * {recipeList.map((item) => (
                    <RecipeItem id={item.id} title={item.title} image={item.image} />
                ))}
   */