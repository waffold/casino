function $(a) {
    return document.getElementById(a);
}

let user = {
    "cash" : 0,
    "window" : "library"
}

document.addEventListener("DOMContentLoaded", function() {
    $("nav-library-btn").addEventListener("click", function() {
        home();
    });
    $("nav-coinflip-btn").addEventListener("click", function() {
        redirect("coinflip");
    })
});

function redirect(a) {
    window.location.href = "/casino/" + a;
}

function home() {
    window.location.href = "/casino";
}

function coinflipSelectCoin(a) {
    console.log(a + "-btn");
    console.log($(a+"-btn").classList.contains("noclick"));
    let playing = true;
    if($(a + "-btn").classList.contains("noclick")) {
        playing = false;
        console.log("no play");
    }
    console.log(a);
    if(playing) {
        let btns = document.getElementsByClassName("coinside-btn");
        for(let i = 0; i < btns.length; i++) {
            $(btns[i].id).classList.toggle("active", false);
        }
        $(a + "-btn").classList.toggle("active", true);
    }
}

function coinflipPlay() {
    let btns = document.getElementsByClassName("coinside-btn");
    for(let i = 0; i < btns.length; i++) {
        $(btns[i].id).classList.toggle("noclick", true);
    }
    $("coinflip-play").classList.toggle("noclick", true);
}
