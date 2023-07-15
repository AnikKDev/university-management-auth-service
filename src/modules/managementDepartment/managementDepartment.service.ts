import { IManagementDepartement } from "./managementDepartment.interface";
import ManagementDepartment from "./managementDepartment.model";

export const createManagementDepartmentService = async (
  data: IManagementDepartement
): Promise<IManagementDepartement | null> => {
  const result = await ManagementDepartment.create(data);
  return result;
};
