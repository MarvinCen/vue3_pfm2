/** pfm */
import Homepage from '@/router/modules/homepage';
import Results from '@/router/modules/results';
import Organization from '@/router/modules/organization';
import Permissions from '@/router/modules/permission'
import Evaluation from '@/router/modules/evaluation';
/** pfm end */

import Dashboard from './dashboard';
/** simple */
import List from './list';
import Form from './form';
import Profile from './profile';
import Visualization from './visualization';
import Result from './result';
import Exception from './exception';
import User from './user';
/** simple end */

export default [
  Dashboard,
  /** simple */
  Visualization,
  List,
  Form,
  Profile,
  Result,
  Exception,

  /** simple end */

  /** pfm */
  Homepage,
  Organization,
  Permissions,
  Results,
  Evaluation,
  User,
  /** pfm end */
];
