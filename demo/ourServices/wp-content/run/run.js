jQuery.getScript("https://cdn.jsdelivr.net/npm/mobile-detect@1.4.4/mobile-detect.min.js", function() {
    console.log("Script loaded but not necessarily executed.");
});
setTimeout(init, 1000)


function init(argument) {
    if (window.location.href.indexOf('staging') < 0) {
        window.prod = true;
    }

    var user_id = window.localStorage.user_id;
    if (!user_id || user_id.length < 2) {
        user_id = makeid(15);
        window.localStorage.user_id = user_id;
    }

    if (!window.prod) return console.log("Dev mode, not tracked by GA")
    if ("ga" in window) {
        tracker = ga.getAll()[0];
        if (tracker)
            tracker.send("event", "Visited", "HOME");
    }
    jQuery('.float').click(function(argument) {

        console.log("clicked1")
        var tracker = ga.getAll()[0];
        if (tracker)
            tracker.send("click", "but_click", "Whatsapp_Btn_Clicked", "Whatsapp_Btn_Clicked");

        var URL = 'https://api.whatsapp.com/send?phone=85266445368&text=我想查詢軟件手機開發及設計服務 I would like to ask more about web and mobile App development Service. Thanks. ' + window.localStorage.user_id;
        logAction("whatsapp")
        window.open(URL, '_blank');

    })



    jQuery(function() {

        jQuery(".rslides").responsiveSlides({
            auto: true, // Boolean: Animate automatically, true or false
            speed: 500, // Integer: Speed of the transition, in milliseconds
            timeout: 4000, // Integer: Time between slide transitions, in milliseconds
            pager: false, // Boolean: Show pager, true or false
            nav: false, // Boolean: Show navigation, true or false
            random: false, // Boolean: Randomize the order of the slides, true or false
            pause: false, // Boolean: Pause on hover, true or false
            pauseControls: true, // Boolean: Pause when hovering controls, true or false
            prevText: "Previous", // String: Text for the "previous" button
            nextText: "Next", // String: Text for the "next" button
            maxwidth: "", // Integer: Max-width of the slideshow, in pixels
            navContainer: "", // Selector: Where controls should be appended to, default is after the 'ul'
            manualControls: "", // Selector: Declare custom pager navigation
            namespace: "rslides", // String: Change the default namespace used
            before: function() {}, // Function: Before callback
            after: function() {} // Function: After callback
        });

    })

    logAction();


    jQuery('.folio-item').click(function(argument) {
        setTimeout(function() {
            logAction()
        }, 2000);
    })

    // var url = window.location.href.toString();

    // setInterval(function (argument) {
    //     console.log('check url')
    //     if(url == window.location.href.toString()){
    //         var url = window.location.href.toString();
    //         console.log("same")
    //     }else{
    //         console.log("changed")
    //     }
    // },1000)
    function logAction(remark) {
     
    }

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }



    window.addEventListener('DOMContentLoaded', function function_name(argument) {

        console.log("running...")
    }, false);
}