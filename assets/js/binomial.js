/**
 * pythonic range
 * @param {Number} start, beginning of range, inclusive
 * @param {Number} stop, end of range, exclusive
 * @param {Number} step, increment
 * @return{Array} [start, stop)
 */
function range(start, stop, step) {
    if(arguments.length == 1) {
        stop = start;
        start = 0;
    }
    stop = stop || 0;
    step = step || 1;
    for(var ret = []; (stop - start) * step > 0; start += step) {
        ret.push(start);
    }
    return ret;
}

/**
 * finds factorial of a number
 * @param {Number} n
 * @return {Number} factorial(n)
 */
function factorial(n) {
    var f = [1, 1, 2, 6, 24, 120, 720, 5040, 40320,
             362880, 3628800, 39916800, 479001600,
             6227020800, 87178291200, 1307674368000,
             20922789888000, 355687428096000,
             6402373705728000, 121645100408832000,
             2432902008176640000 ];

    if(f[n] > 0)
        return f[n];
    return f[n] = factorial(n-1) * n;
}


/**
 * simple combination
 * @param {Number} n
 * @param {Number} k
 * @return {Number} n choose k
 */
function combination(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
}


/**
 * probability mass function
 * @param {Number} x, successes
 * @param {Number} n, number of trials
 * @param {Number} p, probability of success per trial
 * @return {Number} probability of exactly x successes
 */
function pmf(x, n, p) {
    return combination(n, x) * Math.pow(p, x) * Math.pow((1 - p), (n - x));
}


/**
 * cumulative density function
 * @param {Number} x, successes
 * @param {Number} n, number of trials
 * @param {Number} p, probability of success per trial
 * @return {Number} probability of less than or equal to x successes
 */
function cdf(x, n, p) {
    var P = 0;
    for(var i = 0; i < (x + 1); i++) {
        P += pmf(i, n, p);
    }
    return P;
}


/**
 * CDF Greater Than Or Equal
 * @param{Number} n
 * @param{Number} p
 * @return{Array}
 */
function cdfGreaterThanOrEqual(n, p) {
    var data = {
        xVals: range(1, n + 1),
        yVals: range(1, n + 1),
    };
    for(var i = 0; i < n; i++) {
        data.yVals[i+1] = Math.abs(1 - cdf(data.xVals[i] -1, n, p));
    }
    return data;
}


/**
 * Find necessary dice pool given x and p
 * @param{Number} x, desired successes
 * @param{Number} p, deisred probability
 * @return{Number}
 */
function find_n(x, p) {
    var n = 0;
    n += (x);
    var found = false;
    while(!found) {
        test = (1 - cdf(x-1, n, (1/3)))
        if  ( test >= p ) {
            found = true;
        } else {
            n += 1;
        }
    }
    return n;
}
