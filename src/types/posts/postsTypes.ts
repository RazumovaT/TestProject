export type NewPostBody = {
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
  id: string | undefined;
};
export type TokenType = {
  token: string;
};
export type StoredToken = {
  value: string;
  timeStamp?: number;
};
export type DataValues = {
  title: string;
  description: string;
  status: string;
  postType: string;
  text: string;
  comment: string;
};
