/**
 * Created by renyufeng on 2017/2/8.
 */

const startingTime = new Date().getTime();

// angular框架启动回调
function onBootstrap() {
    const currentTime = new Date().getTime();

    var delay = 0;
    if (currentTime - startingTime < 3 * 1000) {
        delay = startingTime + 3 * 1000 - currentTime;
    }

    setTimeout(
        function removeLoadingScreen() {
            var preBootstrapContainer = document.getElementById("pre-bootstrap-container");
            var preBootstrap = document.getElementById("pre-bootstrap");
            preBootstrap.className = "loaded";
            setTimeout(function () {
                preBootstrapContainer.parentNode.removeChild(preBootstrapContainer);
            }, 300);
        },
        delay
    );
}


function sayHello(msg) {
    console.log('SayHello', msg);
    onBootstrap();
}