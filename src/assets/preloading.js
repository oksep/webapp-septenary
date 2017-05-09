/**
 * Created by renyufeng on 2017/2/8.
 */

const startingTime = new Date().getTime();

// angular框架启动回调
function onBootstrap(maxDelay) {
    const currentTime = new Date().getTime();
    maxDelay = maxDelay || 3000;

    var delay = 0;
    if (currentTime - startingTime < maxDelay) {
        delay = startingTime + maxDelay - currentTime;
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
