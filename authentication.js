document.getElementById('switch-to-signup').addEventListener('click', function() {
    fadeOut(document.getElementById('login-form'), function() {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'block';
        fadeIn(document.getElementById('signup-form'));
    });
});

document.getElementById('switch-to-login').addEventListener('click', function() {
    fadeOut(document.getElementById('signup-form'), function() {
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
        fadeIn(document.getElementById('login-form'));
    });
});

function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = 'block';
    let last = +new Date();
    let tick = function() {
        element.style.opacity = +element.style.opacity + (new Date() - last) / 50;
        last = +new Date();
        if (+element.style.opacity < 1) {
            requestAnimationFrame(tick);
        }
    };
    tick();
}

function fadeOut(element, callback) {
    element.style.opacity = 1;
    let last = +new Date();
    let tick = function() {
        element.style.opacity = +element.style.opacity - (new Date() - last) / 50;
        last = +new Date();
        if (+element.style.opacity > 0) {
            requestAnimationFrame(tick);
        } else {
            callback();
        }
    };
    tick();
} 