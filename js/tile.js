class Tile {
	static isSolid(tile) {
		return ['B', 'F', '#'].includes(tile);
	}

	static isPickable(tile) {
		return ['D', 'L', 'R','E', '+', '-', '=', '$'].includes(tile);
	}

	static isLethal(tile) {
		return ['T'].includes(tile);
	}
}

Tile.size = 45;