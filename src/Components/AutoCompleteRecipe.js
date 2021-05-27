import React, { useState } from 'react';
import { Grid, TextField, List, ListItem, ListItemText, ListItemAvatar, CircularProgress, \
         Button, IconButton, Popover } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab'; 

function AutoCompleteRecipe() {
  const [ingOptionsOpen, setIngOptionsOpen] = useState(false);
  const [ingOptions, setIngOptions] = useState([]);
  const [ingSelected, setIngSelected] = useState([]);
  const [ingSearchValue, setIngSearchValue] = useState(null);
  const ingOptionsLoading = ingOptionsOpen && ingOptions.length === 0

  const [searchListOpen, setSearchListOpen] = useState(false);

  const [recipeList, setRecipeList] = useState([]);

  const handleIngSearch = () => {
    setSearchListOpen(true);
  }

  const handleIngredientSearch = async (event) => {
    const response = await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?number=10&metaInformation=true&query=" + event.target.value, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key": "8f5f89ce62mshf6142c1be44bfb4p17858fjsn1023f8f2ae78"
    }});

    const results = await response.json();
    setIngOptions(results);
  };

  const handleIngOptionClick = (value) => {
    if(value === null)
      return;
    setIngSelected(ingSelected => [...ingSelected, value]);
    let tempIngList = [...ingSelected];
    tempIngList.push(value);
    updateRecipes(tempIngList);
  };

  const updateRecipes = async (ingList) => {
    console.log("recipe update");
    if(ingList.length < 1)
      return;
    
    let searchIngredients = ingList[0].name;
    for(var i = 1; i < ingList.length; i++) {
      searchIngredients += "%252C"+ingList[i].name;
    }
    const resp = await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ranking=1&ignorePantry=false&ingredients=" + searchIngredients, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "8f5f89ce62mshf6142c1be44bfb4p17858fjsn1023f8f2ae78"
      }
    });
    
    const getResult = await resp.json();

    console.log(getResult);
    setRecipeList(getResult);
  };

    return (
        <div>
          <div>
          <Autocomplete
              value={ingSearchValue}
              options={ingOptions}
              open={ingOptionsOpen}
              onOpen={() => {setIngOptionsOpen(true)}}
              onClose={()=> {setIngOptionsOpen(false)}}
              onChange={(event, newValue) => {handleIngOptionClick(newValue)}}
              getOptionLabel={(option) => option.name}
              renderInput={params => (
                  <TextField 
                      {...params}
                      label="New Item" 
                      variant="outlined" 
                      placeholder="Ingridients"   
                      onChange={handleIngredientSearch} 
                      InputProps={{
                          ...params.InputProps, 
                          endAdornment:(
                              <React.Fragment>
                                  {ingOptionsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                  {params.InputProps.endAdornment}
                              </React.Fragment>
                          ),
                      }}
                  />
              )}
          />  
          </div>
          <div>
            <Button>Button</Button>
            <TextField 
              onChange={handleIngSearch}
              placeholder="search here"
            />
            <Popover
              open={searchListOpen}
            >
              <List>
                <ListItem>
                  Hello
                </ListItem>
              </List>
            </Popover>
          </div>
        </div>
        
    );
}

export default AutoCompleteRecipe;
