function BBGameService() {}

BBGameService.prototype.beginUserSignIn = function() {
    console.log("Start html5 user sign in process");
    console.log(gapi);
}

BBGameService.prototype.isLoggedIn = function() {
    console.log("I don't know if I'm logged in yet.");
    return false;
}

BBGameService.prototype.signOut = function() {
    console.log("sign out please");
    return false;
}

BBGameService.prototype.isNetworkAvailable = function() {
    return true;
}

BBGameService.prototype.showLeaderBoard = function() {
    return false;
}

BBGameService.prototype.showAllLeaderBoards = function() {
    return false;
}
