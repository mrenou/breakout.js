require(["Breakout"], function(Breakout) {
    var elem = document.getElementById('canvasElem');
    if (!elem || !elem.getContext) {
        return;
    }
    new Breakout(elem);
});