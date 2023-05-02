interface FieldNames {
	id: string;
	parentId: string;
	children: string;
}

const doTreeify = (data: any[], root: any, parentId: number, fieldNames: FieldNames) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i][fieldNames.parentId] === parentId) {
			if (root[fieldNames.children])
				root[fieldNames.children] = [];
			else root[fieldNames.children].push(data[i]);
		}
	}

	const children = root[fieldNames.children] || [];
	for (let i = 0; i < children.length; i++) {
		doTreeify(data, children[i], children[i][fieldNames.id], fieldNames);
	}
}

export default {
	treeify: (data: any[], fieldNames?: FieldNames) => {
		if (!data || data.length === 0) {
			return [];
		}
		if (!fieldNames) {
			fieldNames = {
        id: 'eid',
        parentId: 'parentId',
        children: 'children',
      };
		}

		const res = [];
		for (let i = 0; i < data.length; i++) {
			if (!data[i][fieldNames.parentId]) {
				res.push(data[i]);
			}
		}
		for (let i = 0; i < res.length; i++) {
			doTreeify(data, res[i], res[i][fieldNames.id], fieldNames);
		}

		return res;
	}
}