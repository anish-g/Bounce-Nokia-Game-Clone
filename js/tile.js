class Tile {
	static isSolid(tile) {
		return ['B', 'F', 'D', 'P', '#'].includes(tile);
	}

	static isPickable(tile) {
		return ['C', 'L', 'R','E', '+', '-', '=', '$'].includes(tile);
	}

	static isLethal(tile) {
		return ['T'].includes(tile);
	}
}

Tile.size = 45;
Tile.ballSize = 45;