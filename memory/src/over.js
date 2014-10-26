var OverLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		var size = cc.director.getWinSize();
		
		//返回
		var back_button = cc.MenuItemImage.create(
				res.back,
				res.back_cur,
				this.gameStart,
				this);
		back_button.attr({
			anchorX:0.5,anchorY:0.5,
			x:size.width/2,y:size.height/2 - 60
		});

		//gameover
		var game_over = cc.Sprite.create(res.game_over);
		game_over.attr({
			anchorX:0.5,anchorY:0.5,
			x:size.width/2,y:size.height/2 + 100
		});

		var menu = cc.Menu.create(back_button,game_over);
		menu.attr({x:0,y:0});
		this.addChild(menu,3);
	},
	
	gameStart:function(){
		var StartScene = cc.Scene.create();
		var layer = new StartLayer();
		StartScene.addChild(layer);
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.4,StartScene));
	}
});

var OverScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new OverLayer();
		this.addChild(layer);
	}
});