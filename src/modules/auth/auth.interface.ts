export type ILoginUser = {
  id: string;
  password: string;
};
export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needPasswordChange?: boolean;
};
export type IChangePasswordResponse = {
  newPassword: string;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
