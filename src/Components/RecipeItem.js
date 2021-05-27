import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, makeStyles, ListSubheader } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

export default function RecipeItem(props) {
    const { id, open, onClose } = props;
  
    const classes = recipeStyles();

    const [recipeInfo, setRecipeInfo] = useState(null);



    const handleClose = () => {
      onClose();
    };

    useEffect(() => {
      const getRecipeInformation = async () => {      
        if(id !== 0) {
          let response = await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+ id + "/information?includeNutrition=true", {
            "method": "GET",
            "headers": {
              "x-rapidapi-key": "cefe136227msh0b059b0dae03856p1ded42jsnfb9274bb08d9",
              "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
          });

          let result = await response.json();
          setRecipeInfo(result);
        };
      };
      getRecipeInformation();
    }, [id]);
    
    return (
      <Dialog 
        onClose={handleClose} 
        aria-labelledby="recipe-dialog-title" 
        open={open}
        maxWidth="md"
      >
        
        { recipeInfo !== null &&
        <Grid container> 
          <Grid item xs={12}>
            <DialogTitle id="recipe-dialog-title">{recipeInfo.title}</DialogTitle>
          </Grid>
          <Grid item xs={8}>
            <div className={classes.recipeMain}>
              <img src={recipeInfo.image} alt={recipeInfo.title}/>
              <div className={classes.recipeSummary}>
                <div dangerouslySetInnerHTML={{__html: recipeInfo.summary}} />
                <div className={classes.sources}>source: <a href={recipeInfo.sourceUrl}>{recipeInfo.sourceName}</a></div>
              </div>  
            </div>
            <div className={classes.instructions}>
              <div dangerouslySetInnerHTML={{__html: recipeInfo.instructions}} />  
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.keyInfo}>
              <div className={classes.score}>
                <span className={classes.scorePrimary}>{recipeInfo.readyInMinutes}</span> 
                <span className={classes.scoreSecondary}>mins</span>
              </div>
              <Divider orientation="vertical" flexItem />
              <div className={classes.score}>
                <span className={classes.scorePrimary}>{recipeInfo.extendedIngredients.length}</span> 
                <span className={classes.scoreSecondary}>Ingredients</span>
              </div>
              <Divider orientation="vertical" flexItem />
              <div className={classes.score}>
                <span className={classes.scorePrimary}>{recipeInfo.healthScore}</span> 
                <span className={classes.scoreSecondary}>Health score</span>
              </div>
            </div>
            <List 
              className={classes.ingredientList} 
              dense={true} 
              subheader={
                <ListSubheader className={classes.ingredientListHeader} component="div">
                  Ingredients
                </ListSubheader>
              }
            >
              {recipeInfo.extendedIngredients.map((item) => (
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={item.name} src={"https://spoonacular.com/cdn/ingredients_100x100/" + item.image}/>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={item.amount + " " + item.unit}
                />
              </ListItem>
              ))}
            </List>
            <div>
              <h3>Nutrition</h3>
              <div>Serving Size {recipeInfo.servings} ({recipeInfo.nutrition.weightPerServing.amount}{recipeInfo.nutrition.weightPerServing.unit})</div>
              <List dense={true}>
                <ListItem>
                  <ListItemText primary={"Calories " + recipeInfo.nutrition.nutrients[0].amount + " kcal"} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={"Fat " + recipeInfo.nutrition.nutrients[1].amount + "g"} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={"Carbohydrates " + recipeInfo.nutrition.nutrients[3].amount + "g"} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={"Cholesterol " + recipeInfo.nutrition.nutrients[6].amount + "mg"} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={"Potassium " + recipeInfo.nutrition.nutrients[17].amount + "mg"} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={"Protein " + recipeInfo.nutrition.nutrients[8].amount + "g"} />
                </ListItem>
              </List>
            </div>
          </Grid>
        </Grid>
        }
      </Dialog>
    );
}


const recipeStyles = makeStyles((theme) => ({
  recipeMain: {
    margin: theme.spacing(2),
  },
  recipeSummary: {
    display: 'flex',
    flexDirection: 'column',
  },
  sources: {
    alignSelf: 'flex-end',
    fontStyle: 'italic',
  },
  ingredientList: {
    overflow: 'auto',
    maxHeight: 300
  },
  ingredientListHeader: {
    backgroundColor: 'white',
  },
  keyInfo: {
    display: 'flex',
    justifyContent: 'center',
  },
  score : {
    display: 'flex',
    flexDirection : 'column',
    justifyContent : 'center',
    alignItems : 'center',
    margin: '.25rem',
    width: '5rem',
  },
  scorePrimary: {
    fontSize: '2rem',
  },
  scoreSecondary: {
    fontSize: '.7rem',
  },
  instructions: {
    margin: theme.spacing(2),
  },
}));


/***
 * {recipeInfo.extendedIngredients.map((item) => (
                
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={item.name} src={"https://spoonacular.com/cdn/ingredients_100x100/" + item.image}/>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secoundary={item.amount + " " + item.unit}
                />
              </ListItem>
              ))}
 * 
 * 
 * 
 * 
 */