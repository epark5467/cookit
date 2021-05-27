import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Grid } from '@material-ui/core';


const RecipeDetail = (thisRecipe) => {
    const [open, setOpen] = useState(false);
    
    return (
        <Dialog
            maxWidth="xs"
            aria-labelledby="recipe-dialog-title"
            open={open}
        >
            <DialogTitle id="recipe-dialog-title">
                {thisRecipe.title}
            </DialogTitle>
            <DialogContent dividers>
                
            </DialogContent>
        </Dialog>
    )
};

export default RecipeDetail;