import axios from "@/lib/axios";

/**
 * Query to confirm user email
 * @param token - User token
 */
export const confirmEmail = async (token: string) => {
  const response = await axios.get(`/users/confirmation/${token}`);
  return response.data;
};

/**
 * Query to request a password reset link
 * @param email - User email
 */

export const forgotPassword = async (email: string) => {
  const response = await axios.post("/send-mail-reset-password/", { email });
  return response.data;
};

/**
 * Query to reset user password
 * @param token - User token
 * @param newPassword
 * @param confirmPassword
 */
export const resetPassword = async (
  token: string,
  newPassword: string,
  confirmPassword: string,
) => {
  const response = await axios.post(`/reset-password/`, {
    token,
    newPassword,
    confirmPassword,
  });
  return response.data;
};
