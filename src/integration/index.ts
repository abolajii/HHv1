import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const prod = true;

const baseUrl = prod ? process.env.API_LOG : process.env.TEST_ENV;

export const updateAppHealth = async (appId: number, healthy: boolean) => {
  console.log(
    `[UPDATE_APP_HEALTH] Starting with appId: ${appId}, healthy: ${healthy}`
  );
  console.log(
    `[UPDATE_APP_HEALTH] API endpoint: ${baseUrl}applications/health-update`
  );

  try {
    const requestBody = { appId, healthy };
    console.log(`[UPDATE_APP_HEALTH] Request body:`, requestBody);

    const response = await axios.post(
      `${baseUrl}/applications/health-update`,
      requestBody
    );
    console.log(`[UPDATE_APP_HEALTH] API response status: ${response.status}`);
    console.log(`[UPDATE_APP_HEALTH] API response data:`, response.data);

    return { success: true, data: response.data };
  } catch (error: any) {
    console.log(`[UPDATE_APP_HEALTH] Error occurred:`, error.message);
    console.log(
      `[UPDATE_APP_HEALTH] Error response data:`,
      error.response?.data
    );

    return {
      success: false,
      error: error.response?.data || error.message || "Unknown error",
    };
  }
};

export const createLog = async (
  appId: number,
  appName: string,
  logData: {
    logType: string;
    message: string;
    statusCode: number;
    responseTime?: number;
    endpoint: string;
    method: string;
    additionalData?: any;
  }
) => {
  const payload = {
    appId,
    appName,
    ...logData,
  };
  console.log(`[CREATE_LOG] Sending log:`, payload);

  console.log(`[CREATE_LOG] API endpoint: ${baseUrl}logs`);
  try {
    const response = await axios.post(`${baseUrl}/logs`, payload);

    console.log(`[CREATE_LOG] Log sent successfully:`, response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    // console.log(`[CREATE_LOG] Error sending log:`, error.message);
    console.log(`[CREATE_LOG] Error sending log:`, error);
    return { success: false, error: error.response?.data || error.message };
  }
};
