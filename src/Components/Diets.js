import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';



export default function Diets(props) {

    const { classes, dietValue, setDietValue } = props;

    const handleDietClick = (event) => {
        setDietValue(event.target.value);
    };
    

    return (
        <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup aria-label="diets" name="diets" value={dietValue} onChange={handleDietClick}>
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel value="gluten free" control={<Radio />} label="Gluten Free" />
                <FormControlLabel value="ketogenic" control={<Radio />} label="Ketogenic" />
                <FormControlLabel value="vegetarian" control={<Radio />} label="Vegetarian" />
                <FormControlLabel value="lacto-vegetarian" control={<Radio />} label="Lacto-Vegetarian" />
                <FormControlLabel value="ovo-vegetarian" control={<Radio />} label="Ovo-Vegetarian" />
                <FormControlLabel value="vegan" control={<Radio />} label="Vegan" />
                <FormControlLabel value="paleo" control={<Radio />} label="Paleo" />
                <FormControlLabel value="primal" control={<Radio />} label="Primal" />
                <FormControlLabel value="whole30" control={<Radio />} label="Whole30" />
            </RadioGroup>
        </FormControl>
    )
}