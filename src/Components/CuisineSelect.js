import React, { useEffect, useState } from 'react';
import { FormControl, FormGroup, FormControlLabel, Checkbox, makeStyles } from '@material-ui/core';



const cuisines = [
    'African',
    'American',
    'British',
    'Cajun',
    'Caribbean',
    'Chinese',
    'Eastern European',
    'European',
    'French',
    'German',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Japanese',
    'Jewish',
    'Korean',
    'Latin American',
    'Mediterranean',
    'Mexican',
    'Middle Eastern',
    'Nordic',
    'Southern',
    'Spanish',
    'Thai',
    'Vietnamese'
]


export default function CuisineSelect(props) {

    const { classes, cuisineState, setCuisineState } = props;
    
    useEffect(() => {
        setCuisineState({
            'African': true,
            'American': true,
            'British': true,
            'Cajun': true,
            'Caribbean': true,
            'Chinese': true,
            'Eastern European': true,
            'European': true,
            'French': true,
            'German': true,
            'Greek': true,
            'Indian': true,
            'Irish': true,
            'Italian': true,
            'Japanese': true,
            'Jewish': true,
            'Korean': true,
            'Latin American': true,
            'Mediterranean': true,
            'Mexican': true,
            'Middle Eastern': true,
            'Nordic': true,
            'Southern': true,
            'Spanish': true,
            'Thai': true,
            'Vietnamese': true
        });
    },[]);



    const handleCuisineClick = (event) => {
        setCuisineState({ ...cuisineState, [event.target.name]: event.target.checked });
    };
    

    return (
        <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
                {cuisineState !== null &&
                    cuisines.map((item) => (
                    <FormControlLabel
                        control={<Checkbox checked={cuisineState[item]} onChange={handleCuisineClick} name={item} />}
                        label={item}
                    />
                ))}
            </FormGroup>
        </FormControl>
    )
}