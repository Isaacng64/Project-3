

/* Approximate normalized guitar frequency spectrum as a function of the nth harmonic to the fundamental  (n=0 is f0)*/
function guitarDistribution(n){
    switch(n){
        case 0:
            return 0.1;
            break;
        case 1:
            return 1.0;
            break;
        case 2:
            return 0.35;
            break;
        case 3:
            return 0.55;
            break;
        case 4:
            return 0.30;
            break;
        case 5:
            return 0.1;
            break;
        case 6:
            return 0.07;
            break;
        case 7:
            return 0.05;
            break;
        case 8:
            return 0.03;
            break;
        case 9:
            return 0.02;
            break;
    }
}

export {guitarDistribution}