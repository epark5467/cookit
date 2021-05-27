import React, { useEffect, useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';



export default function MealTypes(props) {

    const { classes, mealType, setMealType } = props;

    
    const handleMealClick = (event) => {
        setMealType(event.target.value);
    };
    

    return (
        <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup aria-label="diets" name="diets" value={mealType} onChange={handleMealClick}>
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel value="main course" control={<Radio />} label="Main course" />
                <FormControlLabel value="side dish" control={<Radio />} label="Side dish" />
                <FormControlLabel value="dessert" control={<Radio />} label="Dessert" />
                <FormControlLabel value="appetizer" control={<Radio />} label="Appetizer" />
                <FormControlLabel value="salad" control={<Radio />} label="Salad" />
                <FormControlLabel value="bread" control={<Radio />} label="Bread" />
                <FormControlLabel value="breakfast" control={<Radio />} label="Breakfast" />
                <FormControlLabel value="beverage" control={<Radio />} label="Beverage" />
                <FormControlLabel value="marinade" control={<Radio />} label="Marinade" />
                <FormControlLabel value="sauce" control={<Radio />} label="Sauce" />
                <FormControlLabel value="snack" control={<Radio />} label="Snack" />
                <FormControlLabel value="drink" control={<Radio />} label="Drink" />
            </RadioGroup>
        </FormControl>
    )
}