'use strict';
/* Copies the icons and the node metadata files (*.node.json) next to the compiled nodes (what the n8n starter does with gulp). No dependencies. */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
let copied = 0;
for (const dir of ['nodes', 'credentials']) {
	const walk = (rel) => {
		const abs = path.join(root, rel);
		if (!fs.existsSync(abs)) return;
		for (const name of fs.readdirSync(abs)) {
			const r = path.join(rel, name);
			const a = path.join(root, r);
			if (fs.statSync(a).isDirectory()) { walk(r); continue; }
			if (/\.(svg|png|node\.json)$/.test(name)) {
				const target = path.join(root, 'dist', r);
				fs.mkdirSync(path.dirname(target), { recursive: true });
				fs.copyFileSync(a, target);
				copied++;
			}
		}
	};
	walk(dir);
}
console.log('copied ' + copied + ' assets into dist/');
