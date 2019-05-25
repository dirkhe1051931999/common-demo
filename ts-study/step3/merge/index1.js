function reverse(x) {
    if (typeof x == 'number') {
        return Number(x
            .toString()
            .split('')
            .reverse()
            .join(''));
    }
    else {
        x.split('')
            .reverse()
            .join('');
    }
}
