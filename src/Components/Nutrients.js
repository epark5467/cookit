import React, { useEffect, useState } from 'react';
import { Slider } from '@material-ui/core';


function valueText(value) {
    return `${value}`;
}

export default function Nutrients(props) {
    const { nutrientsValue, setNutrientsValue } = props;


    const handleNutrientChange = name => (event, newValue) => {
        setNutrientsValue({...nutrientsValue, [name]: newValue});
    }; 

    return (
        <div>
            <span>Calories</span>
            <Slider
                value={nutrientsValue.Calories}
                valueLabelDisplay="auto"
                onChange={handleNutrientChange('Calories')}
                getAriaValueText={valueText}
            />
            <span>Carbohydrates</span>
            <Slider
                onChange={handleNutrientChange}
            />
            <span>Fat</span>
            <Slider
                onChange={handleNutrientChange}
            />
            <span>Protein</span>
            <Slider
                onChange={handleNutrientChange}
            />
            <span>Cholesterol</span>
            <Slider
                onChange={handleNutrientChange}
            />
            <span>Sodium</span>
            <Slider
                onChange={handleNutrientChange}
            />
            <span>Potassium</span>
            <Slider
                onChange={handleNutrientChange}
            />
            <span>VitaminA</span>
            <Slider
                onChange={handleNutrientChange}
            />
            <span>Calcium</span>
            <Slider
                onChange={handleNutrientChange}
            />
            <span>Vitamin C</span>
            <Slider
                onChange={handleNutrientChange}
            />
            <span>Iron</span>
            <Slider
                onChange={handleNutrientChange}
            />
        </div>
    );
}