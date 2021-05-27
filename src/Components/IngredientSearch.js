import React, { useEffect, useState, useRef } from 'react';
import { TextField, CircularProgress, Grid, List, ListItem, ListItemAvatar, ListItemText, Avatar, 
         ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab'; 
import { MdDelete } from 'react-icons/md';
import './RecipeItem';
import RecipeItem from './RecipeItem';


function IngredientSearch(props) {

  const { classes, ingIncludeList, setIngIncludeList, ingExcludeList, setIngExcludeList } = props;

  const [ingIncludeOptionsOpen, setIngIncludeOptionsOpen] = useState(false);
  const [ingIncludeOptions, setIngIncludeOptions] = useState([]);
  const [ingIncludeSearchInput, setIngIncludeSearchInput] = useState("");
  const ingIncludeOptionsLoading = ingIncludeOptionsOpen && ingIncludeOptions.length === 0;

  const [ingExcludeOptionsOpen, setIngExcludeOptionsOpen] = useState(false);
  const [ingExcludeOptions, setIngExcludeOptions] = useState([]);
  const [ingExcludeSearchInput, setIngExcludeSearchInput] = useState("");
  const ingExcludeOptionsLoading = ingExcludeOptionsOpen && ingExcludeOptions.length === 0;

  const handleIngIncludeSearch = async (event) => {
    setIngIncludeSearchInput(event.target.value);
    const response = await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?number=100&metaInformation=true&query=" + event.target.value, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "cefe136227msh0b059b0dae03856p1ded42jsnfb9274bb08d9",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    });

    let results = await response.json();
    setIngIncludeOptions(results);
  };

  const handleIngExcludeSearch = async (event) => {
    setIngExcludeSearchInput(event.target.value);
    const response = await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?number=100&metaInformation=true&query=" + event.target.value, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "cefe136227msh0b059b0dae03856p1ded42jsnfb9274bb08d9",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    });

    let results = await response.json();
    setIngExcludeOptions(results);
  };

  const handleIngIncludeOptionClick = (value) => {
    if(value === null)
      return;
    setIngIncludeList(ingIncludeList => [...ingIncludeList, value]);
    setIngIncludeSearchInput("");
  };

  const handleIngExcludeOptionClick = (value) => {
    if(value === null)
      return;
    setIngExcludeList(ingExcludeList => [...ingExcludeList, value]);
    setIngExcludeSearchInput("");
  };

  const handleDeleteIngInclude = (name) => {
    let newList = ingIncludeList.filter(item => item.name !== name);
    setIngIncludeList(newList);
  };

  const handleDeleteIngExclude = (name) => {
    let newList = ingExcludeList.filter(item => item.name !== name);
    setIngExcludeList(newList);
  };


  return (
    <div className={classes.ingredientSearchContainer}>
        <Autocomplete
          id="ingredient-search-autocomplete"
          inputValue={ingIncludeSearchInput}
          options={ingIncludeOptions}
          getOptionLabel={(option) => option.name}
          open={ingIncludeOptionsOpen}
          onOpen={() => {setIngIncludeOptionsOpen(true)}}
          onClose={()=> {setIngIncludeOptionsOpen(false)}}
          onChange={(event, newValue) => {handleIngIncludeOptionClick(newValue)}}
          renderInput={params => (
            <TextField 
              {...params}
              variant="outlined"
              placeholder="Ingredients"
              onChange={handleIngIncludeSearch}
              InputProps={{
                ...params.InputProps,
                endAdornment:(
                  <React.Fragment>
                    {ingIncludeOptionsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />

        <List className="ingredient-include-list">
          { ingIncludeList.length > 0 && 
            ingIncludeList.map((item) => {
              return  <ListItem key={item.id}>
                        <ListItemAvatar>
                          <Avatar>
                            <img className={classes.chipImg} alt={item.name} src={"https://spoonacular.com/cdn/ingredients_100x100/" + item.image} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                          {item.name}    
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete" onClick={handleDeleteIngInclude.bind(this, item.name)}>
                            <MdDelete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                  }) }
          </List>   
        <Autocomplete
            id="ingredient-search-autocomplete"
            inputValue={ingExcludeSearchInput}
            options={ingExcludeOptions}
            getOptionLabel={(option) => option.name}
            open={ingExcludeOptionsOpen}
            onOpen={() => {setIngExcludeOptionsOpen(true)}}
            onClose={()=> {setIngExcludeOptionsOpen(false)}}
            onChange={(event, newValue) => {handleIngExcludeOptionClick(newValue)}}
            renderInput={params => (
              <TextField 
                {...params}
                variant="outlined"
                placeholder="Ingredients"
                onChange={handleIngExcludeSearch}
                InputProps={{
                  ...params.InputProps,
                  endAdornment:(
                    <React.Fragment>
                      {ingExcludeOptionsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />

          <List className="ingredient-list">
            { ingExcludeList.length > 0 && 
              ingExcludeList.map((item) => {
                return  <ListItem key={item.id}>
                          <ListItemAvatar>
                            <Avatar>
                              <img className={classes.chipImg} alt={item.name} src={"https://spoonacular.com/cdn/ingredients_100x100/" + item.image} />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText>
                            {item.name}    
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={handleDeleteIngExclude.bind(this, item.name)}>
                              <MdDelete />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                    }) }
          </List> 
    </div>
  );
}

export default IngredientSearch;

