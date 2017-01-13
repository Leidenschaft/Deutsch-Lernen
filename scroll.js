var scrollFunction;
$(document).ready(function () {
    var height_total = $(window).height();//at such time $(window).scrollTop()=0;
    var width;
    scrollFunction = function scrollController(amount, parameter) {
        var offset;
        
        if (parameter.length) {
            offset = parseInt(amount * height_total / parseInt(parameter));
        }
        else {
            //20
            offset = parseInt(amount * height_total / 630);
        }
        window.scroll(0, offset);
    }
});
