class Tile {
	static isSolid(tile) {
		return ['B', 'F', '-'].includes(tile);
	}

	static isPickable(tile) {
		return ['L'].includes(tile);
	}

	static isLethal(tile) {
		return ['T'].includes(tile);
	}
}

Tile.size = 45;