function TestUtils() {

}

TestUtils.getContextMocked = function () {
    return mock({
        fillRect:function () {
        },
        beginPath:function() {

        },
        arc:function() {

        },
        closePath:function() {

        },
        fill:function() {

        },
        clearRect:function() {

        }
    });
}
