import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Grid, Typography, TextField, Accordion, AccordionDetails, AccordionSummary, 
         GridList, GridListTile, GridListTileBar, ListSubheader, Button, IconButton, makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { MdExpandMore } from 'react-icons/md';
import { IoMdSearch } from 'react-icons/io';
import { GrRestaurant } from 'react-icons/gr';
import IngredientSearch from './IngredientSearch';
import CuisineSelect from './CuisineSelect';
import MealTypes from './MealType';
import Intolerances from './Intolerances';
import Diets from './Diets';
import RecipeItem from './RecipeItem';
import { yellow } from '@material-ui/core/colors';



const StyledAccordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(Accordion);

export default function Home () {

    const classes = homeStyles();
    
    

    

    const [recipeSearchInput, setRecipeSearchInput] = useState("");
    const [expandedAccordion, setExpandedAccordion] = useState(false);

    const [ingIncludeList, setIngIncludeList] = useState([]);
    const [ingExcludeList, setIngExcludeList] = useState([]);
    
    const [cuisineState, setCuisineState] = useState(null);
    const [mealType, setMealType] = useState("all");
    const [intolerancesState, setIntolerancesState] = useState(null);
    const [dietValue, setDietValue] = useState("all");

    const [totalResults, setTotalResults] = useState(0);
    const [offset, setOffset] = useState(0);
    const [searchResults, setSearchResults] = useState([]);

    const [currentRecipe, setCurrentRecipe] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        newRandomRecipe();
    }, [])


    const newRandomRecipe = async () => {
        const response = await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=10", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "cefe136227msh0b059b0dae03856p1ded42jsnfb9274bb08d9",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        });

        
        const result = await response.json();
        setSearchResults(result.recipes);
    };

    const handleRecipeSearch = (e) => {
        setRecipeSearchInput(e.target.value);
    };

    const handleAccordion = (panel) => (event, isExpaned) => {
        setExpandedAccordion(isExpaned ? panel : false);
    };

    const searchRecipes = () => {
        
        let params = {
            ranking: '2',
            number: '10',
            offset: '0',
            addRecipeInformation: 'false'
        };

        if (ingExcludeList.length > 0) {
            params = {...params, excludeIngredients: ingExcludeList.map((item) => { return item.name }).toString()};
        }

        if (ingIncludeList.length > 0) {
            params = {...params, includeIngredients: ingIncludeList.map((item) => { return item.name }).toString()};
        }

        let ints = [];
        for(var item in intolerancesState) {
            if(intolerancesState[item] === true)
                ints.push(item);
        }

        if(ints.length > 0)
            params = {...params, intolerances: ints.toString()};

        
        if(mealType !== "all")
            params = {...params, type: mealType};
        
        
        let cuisines = [];
        for(var item in cuisineState) {
            if(cuisineState[item] === true)
                cuisines.push(item);
        }

        if(cuisines.length > 0)
            params = {...params, cuisine: cuisines.toString()};

        if (recipeSearchInput !== null || recipeSearchInput !== "")
            params = {...params, query: recipeSearchInput};

        
        
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
            params,
            headers: {
              'x-rapidapi-key': 'cefe136227msh0b059b0dae03856p1ded42jsnfb9274bb08d9',
              'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
          };


        
        axios.request(options).then(function (response) {
            setSearchResults(response.data.results);
            setOffset(response.data.offset);
            setTotalResults(response.data.totalResults);
        }).catch(function (error) {
            console.error(error);
        });
    };

    const handleTileClick = (id) => () => {
        setCurrentRecipe(id);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    

    return (
        
        <Container maxWidth="md" >
            <Typography 
                className={classes.title}
                align="center" 
                variant="h2"
                gutterBottom="true"
            >
                <GrRestaurant />
                CookIt!
            </Typography>
            <div className={classes.root}>           
                <Grid 
                    container
                    direction="column"
                    className={classes.searchContainer}
                >
                    <Grid item>
                        <Paper className={classes.recipeSearchContainer}>
                            <TextField 
                                className={classes.recipeSearchInput}
                                id="recipe-search-input"
                                value={recipeSearchInput}
                                variant="outlined"
                                size="small"
                                placeholder="recipes"
                                onChange={handleRecipeSearch}
                            />    
                            <IconButton onClick={searchRecipes}>
                                <IoMdSearch />    
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item className="search-option">
                        
                        <StyledAccordion 
                            expanded={expandedAccordion === 'mealType'} 
                            onChange={handleAccordion('mealType')}
                        >
                            <AccordionSummary
                                expandIcon={<MdExpandMore />}
                                aria-controls="mealType-content"
                                id="mealType-container"
                            >
                                <Typography >Meal Type</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.accordionDetails}>
                                <MealTypes classes={classes} mealType={mealType} setMealType={setMealType} />
                            </AccordionDetails>
                        </StyledAccordion>
                        
                        <StyledAccordion 
                            expanded={expandedAccordion === 'cuisine'} 
                            onChange={handleAccordion('cuisine')}
                            classes={{expanded: classes.accordionExpanded}}
                        >
                            <AccordionSummary
                                expandIcon={<MdExpandMore />}
                                aria-controls="cuisine-content"
                                id="cuisine-container"
                            >
                                <Typography >Cuisine</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.accordionDetails}>
                                <CuisineSelect classes={classes} cuisineState={cuisineState} setCuisineState={setCuisineState} />
                            </AccordionDetails>
                        </StyledAccordion>
                        <StyledAccordion expanded={expandedAccordion === 'ingredients'} onChange={handleAccordion('ingredients')}>
                            <AccordionSummary
                                expandIcon={<MdExpandMore />}
                                aria-controls="ingredient-content"
                                id="ingredient-container"
                            >
                                <Typography >Ingredients</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.accordionDetails}>
                                <IngredientSearch 
                                    classes={classes}
                                    ingIncludeList={ingIncludeList}
                                    ingExcludeList={ingExcludeList}
                                    setIngIncludeList={setIngIncludeList}
                                    setIngExcludeList={setIngExcludeList}
                                />
                            </AccordionDetails>
                        </StyledAccordion>
                        <StyledAccordion expanded={expandedAccordion === 'intolerances'} onChange={handleAccordion('intolerances')}>
                            <AccordionSummary
                                expandIcon={<MdExpandMore />}
                                aria-controls="intolerances-content"
                                id="intolerances-container"
                            >
                                <Typography >Intolerances</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.accordionDetails}>
                                <Intolerances classes={classes} intolerancesState={intolerancesState} setIntolerancesState={setIntolerancesState} />
                            </AccordionDetails>
                        </StyledAccordion>
                        <StyledAccordion expanded={expandedAccordion === 'diets'} onChange={handleAccordion('diets')}>
                            <AccordionSummary
                                expandIcon={<MdExpandMore />}
                                aria-controls="diets-content"
                                id="diets-container"
                            >
                                <Typography >Diets</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.accordionDetails}>
                                <Diets classes={classes} dietValue={dietValue} setDietValue = {setDietValue} />
                            </AccordionDetails>
                        </StyledAccordion>
                    </Grid>
                </Grid>    
                <GridList cellHeight={180} className={classes.displayResults}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Found {totalResults} recipes </ListSubheader>
                    </GridListTile>
                    {searchResults.map((tile) => (
                        
                    <GridListTile key={tile.id}>
                        <Button onClick={handleTileClick(tile.id)}>
                        <img src={tile.image} alt={tile.title} />  
                        </Button>
                        <GridListTileBar
                            title={tile.title}
                        />
                    </GridListTile>
                    ))}
                </GridList>
            </div>
            <RecipeItem id={currentRecipe} open={openDialog} onClose={handleDialogClose} />
        </Container>
    )
}


const homeStyles = makeStyles((theme) => ({
    title: {
        margin: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    root: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    recipeSearchContainer: {
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
    },
    searchContainer: {
        width: '40%',
    },
    displayResults: {
        width: '60%',
    },
    chipImg: {
        objectFit: 'contain',
        width: '100%',
        height: '100%',
    },
    accordionDetails: {
        padding: 0,
    },
    accordionExpanded: {
        marginBottom: theme.spacing(0),
    },
    ingredientSearchContainer: {
        width: '100%',
        margin: theme.spacing(2),
    },
    searchbarRoot: {
        width: '100%',
    },
    formControl: {
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));
