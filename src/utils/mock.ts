import {Query} from "@/types/global";

export default {
	query: function(data: any[], query: Query) {
		let res = data;

		if (query.conditions) {
			query.conditions.forEach(cond => {
				res = res.filter(item => {
					if (cond.type === 'eq') {
						return item[cond.prop] = cond.value;
					}
					else if (cond.type === 'lLike') {
						// TODO
					}
					else if (cond.type === 'rLike') {
						// TODO
					}
					else if (cond.type === 'in') {
						return (cond.value as any[]).includes(item[cond.prop]);
					}
				})

			})
		}

		if (query.pager) {
			const current = query.pager.current || 1;
			const pageSize = query.pager.pageSize || 10;
			const start = (current - 1) * pageSize;
			if (res.length > start)
				res = res.slice(start, start + pageSize);
			else {
				res = res.slice(0, pageSize);
				query.pager.current = 1;
			}
			query.pager.total = res.length;
		}

		if (query.withs) {
			// done in Mock file
		}

    return res;
	},
}