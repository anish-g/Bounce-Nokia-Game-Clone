class LevelMap {
	constructor(level) {
		this.maps = [
			{
				player: {
					x: 2,
					y: 1
				},
				tiles: [
					'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
					'BB   BBBBBB          BBB         BB         BBB                  BBB      BB      BB               BB         BB',
					'BB   BBBBBB          BBB         R          BB                    BB      BB      BB               BB         BB',
					'BB   BBBBBB   BB     BBB         +          BB         D          BB  BB  BB  BB  BB  BB           BB         BB',
					'BB   BBBBBB   BB     BBB  BBBB  BBBB  BBBB  BB                    BB  BB  BB  BB  BB  BB       BBE+BBE+BB     BB',
					'BB       R    BB          BB     BB     BB                            BB  R   BB  R   BB    BBTBB  D   BBTBB  G-',
					'BB       +    BB T        BB  T     T   BB        T  T   T   T        BB  +   BB  +   BB    BBBBB      BBBBB  --',
					'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'
				]
			},
			{
				// player: {
				// 	x: 9,
				// 	y: 1
				// },
				// tiles: [
				// 	'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'
				// ]
			}
		];

		return this.maps[level];
	}
}