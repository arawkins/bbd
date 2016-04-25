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

BBGameService.prototype.showLeaderBoard = function(id) {
    return false;
}

BBGameService.prototype.showAllLeaderBoards = function() {
    return false;
}

BBGameService.prototype.setMaxUserSignIns = function(count) {
    return;
}

BBGameService.prototype.unlockAchievement = function(id) {
    return;
}

BBGameService.prototype.revealAchievement = function(id) {
    return;
}

BBGameService.prototype.incrementAchievement = function(id, steps) {
    return;
}

BBGameService.prototype.showAchievements = function() {
    return;
}
