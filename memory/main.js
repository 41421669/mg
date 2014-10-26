cc.game.onStart = function(){
    cc.view.setDesignResolutionSize(320, 480, cc.ResolutionPolicy.EXACT_FIT);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
    	cc.director.runScene(new StartScene());
    }, this);
};
cc.game.run();