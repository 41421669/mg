var StartLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		var size = cc.director.getWinSize();
		
		//简单难度
		var easy_button = cc.MenuItemImage.create(
			res.game_easy,
			res.game_easy_cur,
			this.gameEasy,
			this);
		easy_button.attr({
			anchorX:0.5,anchorY:0.5,
			x:size.width/2,y:size.height/2
		});
		
		//普通简单
		var normal_button = cc.MenuItemImage.create(
				res.game_normal,
				res.game_normal_cur,
				this.gameNormal,
				this);
		normal_button.attr({
			anchorX:0.5,anchorY:0.5,
			x:size.width/2,y:size.height/2 - 60
		});
		
		//LOGO
		var logo_sprite = cc.Sprite.create(res.logo);
		logo_sprite.attr({
			anchorX:0.5,anchorY:0.5,
			x:size.width/2,y:size.height/2 + 100
		});
		
		var menu = cc.Menu.create(easy_button,normal_button,logo_sprite);
		menu.attr({x:0,y:0});
		this.addChild(menu,3);
	},
	
	gameEasy:function(){
		var memoreyScene = cc.Scene.create();
		var layer = new MemoreyLayer(__difficulty__level.easy);
		memoreyScene.addChild(layer);
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.4,memoreyScene));
	},
	
	gameNormal:function(){
		var memoreyScene = cc.Scene.create();
		var layer = new MemoreyLayer(__difficulty__level.normal);
		memoreyScene.addChild(layer);
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.4,memoreyScene));
	}
});

var StartScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new StartLayer();
		this.addChild(layer);
	}
});