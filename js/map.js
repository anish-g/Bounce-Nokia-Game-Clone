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
					'BB   BBBBBB          BBB         BB         BBB                  BBB      BB  L   BB               BB         BB',
					'BB   BBBBBB          BBB         R          BB                    BB      BB      BB               BB         BB',
					'BB   BBBBBB   BB     BBB         +          BB         C          BB  BB  BB  BB  BB  BB           BB         BB',
					'BB   BBBBBB   BB     BBB  BBBB  BBBB  BBBB  BB                    BB  BB  BB  BB  BB  BB       BBE-BBE-BB     BB',
					'BB       R    BB          BB     BB     BB                            BB  R   BB  R   BB    BBTBB  C   BBTBB  G#',
					'BB       +    BB T        BB  T     T   BB        T  T   T   T        BB  +   BB  +   BB    BBBBB      BBBBB  ##',
					'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'
				],
				rings : 6
			},
			{
				player: {
					x: 9,
					y: 15
				},
				tiles: [
					'                                                                                                              BBBBBBBBBBBBBBBBBBBBBBBB',
					'                                                                                                              BBC                   BB',
					'                                                                                                              BB          R         BB',
					'                                                                                                              BB          +         BB',
					'                                                                                                              BBBBBBBBBBBBBB        BB',
					'                                                                                                              BB                    G#',
					'                                                                                                              BB                    ##',
					'                                                                                                              BB   BBBBBBBBBBBBBBBBBBB',
					'                                                                                                              BB                    BB',
					'                                                                                                              BB                    BB',
					'                                                                                                              BBBB      BB  BB      BB',
					'                                                                                                              BBC      BB    BB     BB',
					'                                                                                                              BB      BB      BB    BB',
					'                                                                                                              BB     BB   T    BB   BB',
					'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBE-BB',
					'BB                    R   BB      BB     R                        BB        C           BB         BB         R   BB         BB     BB',
					'BB                    +   BB      BB     +                        BB                    BB         BB         +   BB         BB     BB',
					'BB             BBBBBBBBB  BB  BB         BBBBB                    BB        XZ          BB         R          BB  BB    BB   BB  BBBBB',
					'BB             BB     BB  BB  BB         BBBBB                    BB       XBBZ         BB         +          BB  BB  BBBB          BB',
					'BB             BB L           BB         BBBBB                    R       XBBBBZ        R          BB         BB      L BB          BB',
					'BB           T BB             BBP        BBBBB                    +      XBBBBBBZ       +          BB         BB        BB        T BB',
					'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBDDDDDDDDDBBBBBBBBBBBBBBBBBBBBBBBB'
				],
				rings: 8,
				enemies: [
					{
						x: 2,
						y: 15
					},
					{
						x: 4,
						y: 15
					},
					{
						x: 49,
						y: 15
					},
					{
						x: 55,
						y: 15
					},
					{
						x: 61,
						y: 15
					}
				]
			}
		];

		return this.maps[level];
	}
}