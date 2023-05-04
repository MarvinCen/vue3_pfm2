import { BaseEntity } from "@/types/global";
import moment from "moment";

interface FieldNames {
	id: string;
	parentId: string;
	children: string;
	isLeaf: string;
}

const doTreeify = (data: any[], root: any, parentId: number, fieldNames: FieldNames) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i][fieldNames.parentId] === parentId) {
			root[fieldNames.children] = root[fieldNames.children] || [];
			root[fieldNames.children].push(data[i]);
			root[fieldNames.isLeaf] = false;
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
				isLeaf: 'isLeaf',
      };
		}

		for (let i = 0; i < data.length; i++) {
			data[i][fieldNames.children] = undefined;
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
	},

	formatDirectors(directors: any[]) {

	}
}