function getCouter() {
    var couter = function (strat) { };
    couter.interval = 1000;
    couter.reset = function () { };
    return couter;
}
var g = getCouter();
g(10);
g.reset();
g.interval = 2000;
