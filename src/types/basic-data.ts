import {BaseEntity} from "@/types/global";
import {User} from "@/types/permission";

export interface Organization {
  parentId: number;
  deleted: boolean;
  address: string;
  linkTel: string;
}

export interface Department {
  key?: number;
  title?: string;
  eid?: number;
  name?: string;
  parentId?: number;
  remark?: string;
  officePhoneNumber?: string;
  faxNumber?: string;
  organizationId?: number;
  isLeaf?: boolean;
  children?: Department[];
}

export interface Employee extends BaseEntity {
  department?: Department;
  departmentId?: number;
  userId?: number;
  userName?: string;
  user?: User;
  jobNumber?: string;
  birthDate?: string;
  email?: string;
  linkTel?: string;
  sex?: string;
  hireType?: string;
  positionId?: number;
  deleted?: boolean;
  position?: Position;
}

export interface Position {
  eid?: number;
  name?: string;
  positionLevel?: string;
  professionalTitle?: string;
  positionGrade?: string;
  remark?: string;
}

export interface dictionary extends BaseEntity{
  organizationId?: number;
}

export interface item {
  dictionaryId?: number;
  key?: string;
  value?: string;
  order?: number;
}
