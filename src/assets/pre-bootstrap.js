/**
 * Created by renyufeng on 2017/2/8.
 */

const startingTime = new Date().getTime();

// angular框架启动回调
function onBootstrap() {
    // return;
    var preBootstrapContainer = document.getElementById("pre-bootstrap-container");
    var preBootstrap = document.getElementById("pre-bootstrap");
    // Add the class-name to initiate the transitions.
    preBootstrap.className = "loaded";
    // Remove the bootstrap container after the transition has
    // completed (based on the known transition time).

    const currentTime = new Date().getTime();

    var delay = 0;
    if (currentTime - startingTime < 3 * 1000) {
        delay = startingTime + 3 * 1000 - currentTime;
    }

    setTimeout(
        function removeLoadingScreen() {
            preBootstrapContainer
                .parentNode
                .removeChild(preBootstrapContainer)
            ;
        },
        delay
    );
}


function sayHello(msg) {
    console.log('SayHello', msg);
    onBootstrap();
}