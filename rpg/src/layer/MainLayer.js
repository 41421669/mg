var MainLayer = cc.Layer.extend({
	
	winSize:null,
	
	ctor:function(){
		this._super();
		
		this.winSize = cc.director.getWinSize();
		this.init();
		
		return true;
	},
	
	init:function(){
		var uiLayoutLinear = ccui.LinearLayoutParameter.create();
		var ui = ccs.uiReader.widgetFromJsonFile('ui/DemoShop/Json/DemoShop.json');
		var layer = cc.LayerColor.create(cc.color(80,40,40,255), this.winSize.width, this.winSize.height);
		
		this.addChild(ui,2);
		this.addChild(layer,1);
		
		return true;
	},
	
	navMenu:function(){
		var item_1 = cc.MenuItemImage.create(),
			item_2 = cc.MenuItemImage.create(),
			item_3 = cc.MenuItemImage.create(),
			item_4 = cc.MenuItemImage.create();
		
		var menu = cc.Menu.create(item_1,item_2,item_3,item_4);
		return true;
	},
	
});