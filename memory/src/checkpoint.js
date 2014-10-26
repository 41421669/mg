/*
 * [缩放等级[1,0.85,0.78,0.7,0.59,0.52,0.47,0.44,0.42,0.38](一共九个等级),
 * 类型维度(0-2)暂定3种,
 * 差值维度(0-2)[同差,色差,微差]暂定3种]
 * 
 */
var __difficulty__level = {
		easy:[[1,0,0],									//level0(12)基础教学关卡
		      [1,1,0],									//level0(12)
		      [1,0,1],									//level0(12)
		      [1,1,1]],									//level0(12)
		
		normal:[[0.85,0,0],								//level1(20)
		        [0.78,0,0],								//level2(24)
		        [0.7,1,0],								//level3(30)
		        [0.59,1,0],								//level4(48)
		        [0.52,0,1],								//level5(54)
		        [0.47,0,1],								//level6(70)
		        [0.44,0,1],								//level7(80)
		        [0.42,1,1],								//level8(88)
		        [0.38,1,1]],							//level9(118)

		hard:[],

		hardset:[],

		abyss:[]
}