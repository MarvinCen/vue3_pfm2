import Mock from 'mockjs';

import './user';
import './message-box';

import '@/views/dashboard/workplace/mock';
/** simple */
import '@/views/dashboard/monitor/mock';

import '@/views/list/card/mock';
import '@/views/list/search-table/mock';

import '@/views/form/step/mock';

import '@/views/profile/basic/mock';

import '@/views/visualization/data-analysis/mock';
import '@/views/visualization/multi-dimension-data-analysis/mock';

import '@/views/user/info/mock';
import '@/views/user/setting/mock';
/** simple end */

/** pfm */
import '@/views/results/result-type/mock';
import '@/views/results/input/mock';
/** pfm end */

Mock.setup({
  timeout: '0-300',
});
