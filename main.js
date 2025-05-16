function $(a) {
    return document.getElementById(a);
}

let user = {
    "cash" : 10.00,
    "window" : "library"
}

let session = {
    "on" : false,
    "history" : [],
    "bet" : 0,
    "mult" : 1.00
}

document.addEventListener("DOMContentLoaded", function() {
    updateCash();
    $("nav-library-btn").addEventListener("click", function() {
        home();
    });
    $("nav-coinflip-btn").addEventListener("click", function() {
        redirect("coinflip");
    });
    let betField = $("enter-bet-field");
    if(betField) {
        betField.addEventListener("input", function() {
            console.log("edit");
            makeBetInvalid(betField);
        });

        makeBetInvalid(betField);
    }
   ;
    betField.addEventListener("blur", function() {
        betField.value = parseFloat(betField.value).toFixed(2);
    })

    $("heads-btn").addEventListener("click", function() {
        if(session.on) { coinflip("heads");}
    })
    $("tails-btn").addEventListener("click", function() {
        if(session.on) { coinflip("tails");}
    })
});

function makeBetInvalid(betField) {
    let invalid = checkInvalidBet(betField);
    if(invalid) {
        betField.classList.toggle("invalid", true);
    } else {
        betField.classList.toggle("invalid", false);
    }
}

function redirect(a) {
    window.location.href = "/casino/" + a;
}

function home() {
    window.location.href = "/casino";
}

function checkInvalidBet(betField) {
    return betField.value > user.cash || betField.value < 0.01;
}

// function coinflipSelectCoin(a) {
//     console.log(a + "-btn");
//     console.log($(a+"-btn").classList.contains("noclick"));
//     let playing = true;
//     if($(a + "-btn").classList.contains("noclick")) {
//         playing = false;
//         console.log("no play");
//     }
//     console.log(a);
//     if(playing) {
//         let btns = document.getElementsByClassName("coinside-btn");
//         for(let i = 0; i < btns.length; i++) {
//             $(btns[i].id).classList.toggle("active", false);
//         }
//         $(a + "-btn").classList.toggle("active", true);
//     }
// }

function coinflipPlay() {
    let btns = document.getElementsByClassName("coinside-btn");
    let eventBtn = $("event-btn");
    let invalid = checkInvalidBet($("enter-bet-field"));
    if(invalid) {return;}
    if(session.on == false) {
        for(let i = 0; i < btns.length; i++) {
            $(btns[i].id).classList.toggle("noclick", false);
        }
        eventBtn.classList.toggle("noclick", true);
        eventBtn.innerHTML = "Cashout";

        $("enter-bet-field").classList.toggle("noclick", true);
        $("enter-bet-field").disabled = true;

        $("profit-area").classList.toggle("hidden", false);
        $("profit-field").innerHTML = "0.00";
        $("profit-label").innerHTML = "Total Profit (1.00x)";
        
        session.history = [];
        session.on = true;
        session.mult = 1.00;
        session.bet = $("enter-bet-field").value;

        user.cash -= session.bet;
        updateCash();
        $("coin-history").innerHTML = "";
    } else {
        console.log("cashout");

        let profit = (session.bet * (session.mult - 1)).toFixed(2);
        user.cash += parseFloat(profit);
        updateCash();

        $("event-btn").innerHTML = "Play";
        $("heads-btn").classList.toggle("noclick", true);
        $("tails-btn").classList.toggle("noclick", true);
        $("profit-area").classList.toggle("hidden", true);

        $("enter-bet-field").classList.toggle("noclick", false);
        $("enter-bet-field").disabled = false;
        //$("face-btns-overlay").classList.toggle("hidden", false);

        session.on = false;
    }
}



function coinflip(pick) {
    $("heads-btn").classList.toggle("noclick", true);
    $("tails-btn").classList.toggle("noclick", true);
    $("event-btn").classList.toggle("noclick", true);

    $("coin-img").classList.remove("flipToH", "flipToT");

    let r = Math.ceil( Math.random()*2);
    let side;
    switch(r) {
        case 1:
            side = "heads";
            void $("coin-img").offsetWidth;
            $("coin-img").classList.add("flipToH");
            setTimeout(function() {
                $("coin-img").style.backgroundImage = "url('https://waffold.github.io/casino/images/headsface.png')";
            }, 500);
            break;
        case 2:
            side = "tails";
            void $("coin-img").offsetWidth;
            $("coin-img").classList.add("flipToT");
            setTimeout(function() {
                $("coin-img").style.backgroundImage = "url('https://waffold.github.io/casino/images/tailsface.png')";
            }, 500);
            //$("coin-img").classList.toggle("flipToT", true);
            break;
    }
    setTimeout(function() {
        let icon = document.createElement("div");
        icon.className = "icon";
        let img = document.createElement("img");
        img.src = "https://waffold.github.io/casino/images/" + side + ".png"
        icon.appendChild(img);
        $("coin-history").appendChild(icon);
        session.history.push(side);
        console.log(side, pick);
        if(side == pick) {
            console.log(session.mult);
            if(session.mult == 1) {
                session.mult = 1.96;
                console.log("here", session.mult);
            } else {
                console.log(session.mult);
                session.mult *= 2;
            }
            console.log(session.mult);
            $("profit-label").innerHTML = "Total Profit (" + session.mult + "x)";
            $("profit-field").innerHTML = (session.bet * (session.mult - 1)).toFixed(2);
        } else {
            console.log("lose haha");
            session.on = false;
            $("profit-area").classList.toggle("hidden", true);
            $("event-btn").innerHTML = "Play";
            $("enter-bet-field").disabled = false;
            $("enter-bet-field").classList.toggle("noclick", false);
            makeBetInvalid($("enter-bet-field"));
            //$("face-btns-overlay").classList.toggle("hidden", false);
        }
        if(session.on) {
            $("heads-btn").classList.toggle("noclick", false);
            $("tails-btn").classList.toggle("noclick", false);
        }
        $("event-btn").classList.toggle("noclick", false);
    }, 500);
}


function updateCash() {
    console.log("update")
    $("cash-container").innerHTML = "$" + user.cash.toFixed(2);
}


    // let icon = document.createElement("div");
    // icon.className = "icon";
    // let img = document.createElement("img");
    // img.src = "https://waffold.github.io/casino/images/" + side + ".png"
    // icon.appendChild(img);
    // let r = Math.ceil( Math.random()*2);
    // let side;
    // switch(r) {
    //     case 1:
    //         side = "heads";
    //         break;
    //     case 2:
    //         side = "tails";
    //         break;
    // }
