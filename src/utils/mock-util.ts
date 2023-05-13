import {BaseEntity, Query} from "@/types/global";
import Mock from "mockjs";
import moment from "moment";

export default {
	query: function(data: any[], query: Query) {
		let res = data;

		if (query.conditions) {
			query.conditions.forEach(cond => {
				res = res.filter(item => {
					let obj: any = item;
					let prop = cond.prop;
					let idx;
					while (prop && ((idx = prop.indexOf('.')) >= 0)) {
						obj = obj[prop.substring(0, idx)];
						prop = prop.substring(idx + 1);
						if (!obj) return false;
					}

					if (cond.type === 'eq') {
						return obj[prop] === cond.value;
					}
					else if (cond.type === 'lLike') {
						// TODO
					}
					else if (cond.type === 'rLike') {
						// TODO
					}
					else if (cond.type === 'in') {
						return (cond.value as any[]).includes(obj[prop]);
					}
				})
			})
		}

		if (query.pager) {
			const current = query.pager.current || 1;
			const pageSize = query.pager.pageSize || 10;
			const start = (current - 1) * pageSize;
			let total = res.length;

			if (total > start) {
				res = res.slice(start, start + pageSize);
			}
			else {
				total = res.length;
				res = res.slice(0, pageSize);
				query.pager.current = 1;
			}
			query.pager.total = total;
		}

		if (query.withs) {
			// done in Mock file
		}

    return res;
	},

	setBaseEntityAttrs: (entity: BaseEntity) => {
		entity.eid = Mock.Random.increment();
		const date = Date.now();
		entity.createDatetime = moment(date).format('YYYY-MM-DD HH:mm:ss');
		entity.updateDatetime = moment(date).format('YYYY-MM-DD HH:mm:ss');
	}
}