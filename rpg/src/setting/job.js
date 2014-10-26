var jobs = {
		
		soldier: {
			growth_attr: {
				pow: 3,
				wis: 0,
				agi: 2,
				con: 3,
			},
			talent: {
				weapons: {
					sharp: 1.2,
					blunt: 1.2,
					giant_weapon: 1.2,
					puncture: 1.1
				},
				attr: {
					pow: 1.2,
					wis: 1,
					agi: 1.15,
					con: 1.25
				},
				skill:{
					charge: {
						use_state: 'Before',		//Before battling after
						probaility: 1,
						consumption: null,
						target: 'random',
						hurt: null,
						symptom: 'vertigo',
						duration: 1
					},
					bash: {
						use_state: 'battling',		//Before battling after
						probaility: 0.2,
						consumption: null,
						target: 'random',
						hurt: 2,
						symptom: null,
						duration: null
					}
				}
			}
		},
		
		magicer: {},
		
		minister: {},
		
		robbers: {}
		
}