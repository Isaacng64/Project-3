
export {arrayRemove}

function arrayRemove(arr, value) { /* https://love2dev.com/blog/javascript-remove-from-array/#remove-from-array-splice-value */
    
    let A = arr.filter(function(ele){ 
        return ele != value; 
    });

    return A;
}

