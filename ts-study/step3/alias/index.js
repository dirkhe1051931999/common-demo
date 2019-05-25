function getName(n) {
    if (typeof n === 'string') {
        return n;
    }
    else {
        n();
        return n();
    }
}
