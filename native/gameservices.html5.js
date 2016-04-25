function BBGameService() {}

BBGameService.prototype.user = {};
BBGameService.prototype.loggedIn = false;
BBGameService.prototype.apiReady = false;
BBGameService.prototype.beginUserSignIn = function() {

    if (gapi != null) {
        console.log("gapi is not null, so let's proceed");
        var self = this;
        gapi.auth.authorize({
            client_id : '221954390295-agd8rpgh06imb5k3gd2563igqd6q36uh.apps.googleusercontent.com',
            immediate : true
        }, function(auth) {
              if (auth && auth.error == null) {
                gapi.client.load('games','v1',function(response) {
                    console.log("games api is ready to rock");
                    self.apiReady = true;
                    console.log(gapi.client.games);
                });
                self.loggedIn = true;
              } else {
                // Common reasons are immediate_failed and user_signed_out
                if (auth && auth.hasOwnProperty('error')) {
                  console.log('Sign in failed because: ', auth.error);
                }
              }
        });
    } else {
        console.log('gapi is null...');
    }

}

BBGameService.prototype.isLoggedIn = function() {

    return this.loggedIn;

}

BBGameService.prototype.signOut = function() {

    return false;

}

BBGameService.prototype.isNetworkAvailable = function() {

    return true;

}

BBGameService.prototype.showLeaderBoard = function(id) {

    return false;

}

BBGameService.prototype.getLeaderBoard = function(id) {

    var request = gapi.client.games.scores.list(
      {
          collection : 'PUBLIC',
          leaderboardId: id,
          timeSpan : 'ALL_TIME'
      }
    );

    request.execute(function(response) {
      // Do something interesting with the response
      console.log(response);
      return response;
    });

}

BBGameService.prototype.showAllLeaderBoards = function() {

    var request = gapi.client.games.leaderboards.list(
      {maxResults: 15}
    );
    request.execute(function(response) {
      // Do something interesting with the response
      console.log(response);
    });

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

BBGameService.prototype.renderSignInButton = function() {

    gapi.signin2.render("signInButton", {
        onsuccess : function(user) {
            console.log("Signed in ok!!!!");
            console.log(user);
            console.log(this);
        }
    });

}
