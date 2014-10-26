var MemoreyLayer = cc.Layer.extend({
	level:null,				//当前关卡
	winSize:null,			//画布大小
	picArray:null,			//图片数组
	picSize:null,			//图片大小
	eScale:null,			//图片缩放
	eSize:null,				//图片大小
	eDistc:null,			//图片间距
	eIndex:null,			//同差索引范围
	eXNum:null,				//类型维度
	eYNum:null,				//差值维度
	mstType:null,			//最大类型范围
	tempEl:null,			//临时元素
	selNum:null,			//翻拍次数
	shutNum:null,			//解决数

	//构造函数
	ctor:function (diff,lvl) {
		if(!lvl)lvl = 0;
		this._super();
		this.winSize = cc.director.getWinSize();
		this.level = lvl;
		this.eScale = diff[this.level][0];
		this.eXNum = diff[this.level][1];
		this.eYNum = diff[this.level][2];
		this.eSize = 80;
		this.eDistc = 10;
		this.eIndex = 12;
		this.mstType = 2;
		this.selNum = 0;
		this.shutNum = 0;
		this.level = lvl;
		this.init();
		return true;
	},

	//game init
	init:function(){
		this._super();
		var _this = this;
		var e_distc = this.eScale * this.eDistc;											//元素距离（缩放后）
		var e_size = this.eScale * this.eSize;												//元素大小（缩放后）
		var win_width = this.winSize.width;													//游戏区域宽
		var win_height = this.winSize.height - 50;											//游戏区域高
		var mst_column = (win_width - win_width%(e_size + e_distc))/(e_size + e_distc);		//最大列数
		var mst_row = (win_height - win_height%(e_size + e_distc))/(e_size + e_distc);		//最大行数
		var mst_num = mst_column * mst_row;													//总数
		var pic_batch = cc.SpriteBatchNode.create(res.texture,50);

		//点击事件监听
		var listener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE, 		//TOUCH_ONE_BY_ONE 为单次触摸事件监听器
			swallowTouches: true,

			onTouchBegan:function(touch,event){
				var tag = event.getCurrentTarget();
				var locationInNode = tag.convertToNodeSpace(touch.getLocation());
				var s = tag.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);
				var rect_bool = cc.rectContainsPoint(rect, locationInNode);

				_this.coreLogic(rect_bool,tag,mst_num);
				return false;
			}
		});

		pic_batch.attr({
			x: (win_width - (e_distc + e_size) * mst_column)/2 + e_distc/2,
			y: (win_height - (e_distc + e_size) * mst_row)/2 + e_distc/2
		});

		this.layoutFunc(pic_batch,mst_num,mst_column,e_size,e_distc,listener);
		this.addChild(pic_batch);
		return true;
	},

	//元素布局
	layoutFunc:function(pic_batch,mst_num,column,size,distc,listener){
		var pic_array = this.getCheckPoint(mst_num);						//得到管卡元素信息数组
		var cur_row = 0;													//当前行
		
		for(var i=0;i<mst_num;i++){
			var minY = pic_array[i].y * this.eSize;
			var minX = pic_array[i].x * this.eSize;
			var sprite = cc.Sprite.create(pic_batch.getTexture(),cc.rect(minX,minY,this.eSize,this.eSize));
			var mask = cc.Sprite.create(pic_batch.getTexture(),cc.rect(0,1920,this.eSize,this.eSize));

			//图片
			sprite.attr({
				anchorX: 0,
				anchorY: 0,
				scaleX: this.eScale,
				scaleY: this.eScale,
				x: (i % column) * (size + distc),
				y: cur_row * (size + distc)
			});

			//遮罩
			mask.attr({
				anchorX: 0,
				anchorY: 0,
				scaleX: this.eScale,
				scaleY: this.eScale,
				x: (i % column) * (size + distc),
				y: cur_row * (size + distc),
				type: {
					x: pic_array[i].x,
					y: pic_array[i].y
				},														//图片类型编号
				index: i												//索引
			});

			cc.eventManager.addListener(listener.clone(),mask);			//派发事件
			pic_batch.addChild(sprite,i,i);
			pic_batch.addChild(mask,mst_num+i,mst_num+i);
			if(i % column == column - 1)cur_row ++;						//换行
		}
	},

	/*游戏核心逻辑
	rectBool：是否在目标范围内
	tag：事件目标
	mst_num：元素总数*/
	coreLogic:function(rect_bool,tag,mst_num){
		var _this = this;

		if(rect_bool && !this.selNum) {															//翻第一张
			tag.visible = false;																//不显示
			this.selNum = 1;
			this.tempEl = tag;
			return true;
		}else if(rect_bool && this.selNum == 1 && tag.index != this.tempEl.index){				//翻第二张
			tag.visible = false;
			this.selNum = 2;

			if(this.tempEl.type.x == tag.type.x && this.tempEl.type.y == tag.type.y){			//类型相同
				this.shutNum ++;
				cc.eventManager.removeListeners(this.tempEl);
				cc.eventManager.removeListeners(tag);
				this.selNum = 0;
				if(this.shutNum == mst_num/2){													//判断过关
					this.level++;
					if(this.level > 2)this.gameOver();											//判断通关
					else this.levelUp();
				}
			}else{
				setTimeout(function(){
					_this.tempEl.visible = true;												//显示
					tag.visible = true;
					_this.selNum = 0;
				},1000);
			}
			return true;
		}
	},

	//关卡升级
	levelUp:function(){
		var memoreyScene = cc.Scene.create();
		var layer = new MemoreyLayer(__difficulty__level.easy,this.level);
		memoreyScene.addChild(layer);
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.4,memoreyScene));
	},

	//游戏结束
	gameOver:function(){
		var overScene = cc.Scene.create();
		var layer = new OverLayer();
		overScene.addChild(layer);
		cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.4,overScene));
	},

	//合并两个数组并返回新数组
	arrayAdd:function(arr1,arr2){
		Array.prototype.push.apply(arr1,arr2);
		return arr1;
	},
	
	//获取关卡元素信息
	getCheckPoint:function(num){
		var arr =[];
		var e_index = this.eIndex + this.eIndex*this.eYNum;				//当前差值最大索引范围（决定难度）

		for(i = 0;i < e_index;i ++){
			arr.push(i);
		}
		//判断类型复杂度
		if(this.eXNum == 0){
			var e_type = Math.floor(Math.random()*this.mstType) + 1;	//随即类型
			var arr1 = this.getArrayItems(arr,num/2);					//随机取N不重复个组成新数组
			
			arr1 = this.arrayAdd(arr1,arr1);							//镜像数组的值
			arr1 = this.getArrayItems(arr1,num,e_type);					//随机排列
			return arr1;

		}else if(this.eXNum == 1){
			var e_type_arr = [];										//随即类型数组
			var arr1 = this.getArrayItems(arr,num/4);					//随机取N不重复个组成新数组
			var arr2 = this.getArrayItems(arr,num/4);
			var arr3 = [];
			
			
			for(i = 0;i < this.mstType;i ++){
				e_type_arr.push(i);
			}
			e_type_arr = this.getArrayItems(e_type_arr,this.mstType);
			arr1 = this.arrayAdd(arr1,arr1);							//镜像数组的值
			arr2 = this.arrayAdd(arr2,arr2);
			arr1 = this.getArrayItems(arr1,num,e_type_arr[0]+1);		//随机排列
			arr2 = this.getArrayItems(arr2,num,e_type_arr[1]+1);
			arr3 = this.arrayAdd(arr1,arr2);							//合并两组类型数组
			arr3 = this.getArrayItems(arr3,num);						//随即排列
			return arr3;

		}else{

		}
	},

	getArrayItems:function(arr,num,type) {
		//新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
		var temp_array = new Array();
		for (var index in arr) {
			temp_array.push(arr[index]);
		}
		//取出的数值项,保存在此数组
		var return_array = new Array();
		if(!type){
			for (var i = 0; i<num; i++) {
				//判断如果数组还有可以取出的元素,以防下标越界
				if (temp_array.length>0) {
					//在数组中产生一个随机索引
					var arrIndex = Math.floor(Math.random()*temp_array.length);
					//将此随机索引的对应的数组元素值复制出来
					return_array[i] = temp_array[arrIndex];
					//然后删掉此索引的数组元素,这时候temp_array变为新的数组
					temp_array.splice(arrIndex, 1);
				} else {
					//数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
					break;
				}
			}
		}else{
			for (var i = 0; i<num; i++) {
				//判断如果数组还有可以取出的元素,以防下标越界
				if (temp_array.length>0) {
					//在数组中产生一个随机索引
					var arrIndex = Math.floor(Math.random()*temp_array.length);
					//将此随机索引的对应的数组元素值复制出来
					return_array[i] = {};
					return_array[i].y = temp_array[arrIndex];
					return_array[i].x = type - 1;
					//然后删掉此索引的数组元素,这时候temp_array变为新的数组
					temp_array.splice(arrIndex, 1);
				} else {
					//数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
					break;
				}
			}
		}

		return return_array;
	}

});

var MemoreyScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new MemoreyLayer();
		this.addChild(layer);
	}
});