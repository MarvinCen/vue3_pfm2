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

export interface Employee {
  eid?: number;
  name?: string;
  status?: string;
  remark?: string;
  jobNumber?: string;
  birthDate?: string;
  email?: string;
  linkTel?: string;
  sex?: string;
  hireType?: string;
  psum?: string;
  postSequenceLevel?: string;
}

export interface position {
  name?: string;
  positionLevel?: string;
  professionalTitle?: string;
  positionGrade?: string;
  remark?: string;
}
