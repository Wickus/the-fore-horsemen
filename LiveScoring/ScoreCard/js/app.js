let USERNAME = "";
let COARSE = "benoni-country-club";
$(document).ready(function () {
    checkUser();
});

function checkUser() {
    if (Storage) {
        USERNAME = localStorage.getItem("username");
        if (USERNAME != null) {
            DATABSE.ref()
                .child("players")
                .child(USERNAME)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        $("#score-card").scoreCard({
                            coarse: COARSE,
                        });
                        $("form[name='access']").remove();
                    } else {
                        alert("Username not found");
                        $("form[name='access']").show();
                    }
                });
        } else {
            $("form[name='access']").show();
        }
    } else {
        alert("Browser not supported");
    }
}

function setUserName(event, form) {
    event.preventDefault();
    localStorage.setItem("username", $(form).find("input").val().toLowerCase());
    checkUser();
}
