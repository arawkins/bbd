
import android.database.Cursor;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.os.MessageQueue.IdleHandler;
import android.provider.MediaStore;

class BBGameService extends ActivityDelegate {
	Activity _activity;
	GameHelper mHelper;
	BBGameService parent;
	GameHelper.GameHelperListener listener;
	
	boolean _running;
	
	int _result=-1;
	int REQUEST_LEADERBOARD = 9101;
	int REQUEST_ACHIEVEMENTS = 9102;
	
	class GameServiceThread extends Thread{
		
		GameServiceThread(){
			_running=true;	
		}
		
		public void run(){

			Looper.prepare();
			
			MessageQueue queue = Looper.myQueue();
			queue.addIdleHandler(new IdleHandler() {
				int mReqCount = 0;
				
				@Override
				public boolean queueIdle() {
				if (++mReqCount == 2) {
					Looper.myLooper().quit();
					return false;
				} else
					return true;
				}
            });

			mHelper = new GameHelper(_activity, GameHelper.CLIENT_GAMES);
    		mHelper.setup(parent.listener);
			
			Looper.loop();
		}
	}
	
	@Override
    public void onStart() {
        super.onStart();
		mHelper.onStart(_activity);
    }

    @Override
    public void onStop() {
        super.onStop();
		mHelper.onStop();
    }
	
	@Override	
	public void onActivityResult( int requestCode,int resultCode,Intent data ){
		super.onActivityResult(requestCode, resultCode, data);
		mHelper.onActivityResult(requestCode, resultCode, data);
	}
	
	public BBGameService(){

		_activity=BBAndroidGame.AndroidGame().GetActivity();
		parent = this;
		
		listener = new GameHelper.GameHelperListener() {
	       @Override
		    public void onSignInSucceeded() {
				// handle sign-in succeess - reserved for later use
		    }
			@Override
			public void onSignInFailed() {
				// handle sign-in failure - reserved for later use
			}
	    };
		
		GameServiceThread thread=new GameServiceThread();
		_running=true;
		thread.start();
		
		BBAndroidGame.AndroidGame().AddActivityDelegate( this );
		
	}
	
	public void submitHighscore(String id, int points) {
		Games.Leaderboards.submitScore(mHelper.getApiClient(), id, points);
	}
	
	public void unlockAchievement(String id) {
		Games.Achievements.unlock(mHelper.getApiClient(), id);
	}
	
	public void revealAchievement(String id) {
		Games.Achievements.reveal(mHelper.getApiClient(), id);
	}
	
	public void incrementAchievement(String id, int step) {
		Games.Achievements.increment(mHelper.getApiClient(), id, step);
	}
	
	public void showLeaderBoard(String id) {
		_activity.startActivityForResult(Games.Leaderboards.getLeaderboardIntent(mHelper.getApiClient(), id), REQUEST_LEADERBOARD);
	}
	
	public void showAchievements() {
		_activity.startActivityForResult(Games.Achievements.getAchievementsIntent(mHelper.getApiClient()), REQUEST_ACHIEVEMENTS);
	}
	
	public boolean isLoggedIn() {
		return mHelper.isSignedIn();
	}
	
	public void signOut() {
		mHelper.signOut();
	}
	
	public void beginUserSignIn() {
		mHelper.beginUserInitiatedSignIn();
	}
	
	public void setMaxUserSignIns(int count) {
		mHelper.setMaxAutoSignInAttempts(count);
	}
		
}