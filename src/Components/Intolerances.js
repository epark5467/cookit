import React, { useEffect, useState } from 'react';
import { FormControl, FormGroup, FormControlLabel, Checkbox, makeStyles } from '@material-ui/core';



const intolerances = [
    'Dairy',
    'Egg',
    'Gluten',
    'Grain',
    'Peanut',
    'Seafood',
    'Sesame',
    'Shellfish',
    'Soy',
    'Sulfite',
    'Tree Nut',
    'Wheat'
];


export default function Intolerances(props) {

    const { classes, intolerancesState, setIntolerancesState } = props;
    
    useEffect(() => {
        setIntolerancesState({
            'Dairy': false,
            'Egg': false,
            'Gluten': false,
            'Grain': false,
            'Peanut': false,
            'Seafood': false,
            'Sesame': false,
            'Shellfish': false,
            'Soy': false,
            'Sulfite': false,
            'Tree Nut': false,
            'Wheat': false
        });
    },[]);



    const handleIntolerancesClick = (event) => {
        setIntolerancesState({ ...intolerancesState, [event.target.name]: event.target.checked });
    };
    

    return (
        <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
                {intolerancesState !== null &&
                    intolerances.map((item) => (
                    <FormControlLabel
                        control={<Checkbox checked={intolerancesState[item]} onChange={handleIntolerancesClick} name={item} />}
                        label={item}
                    />
                ))}
            </FormGroup>
        </FormControl>
    )
}