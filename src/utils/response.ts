import { Response } from 'express';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
  statusCode: number;
}

interface PaginatedResponse<T = any> extends ApiResponse<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Base response function
 */
const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: T,
  errors?: any
): Response => {
  const response: ApiResponse<T> = {
    success,
    message,
    statusCode,
    ...(data && { data }),
    ...(errors && { errors })
  };

  return res.status(statusCode).json(response);
};

/**
 * Success Responses
 */
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Operation completed successfully',
  statusCode: number = 200
): Response => {
  return sendResponse(res, statusCode, true, message, data);
};

export const sendCreated = <T>(
  res: Response,
  data: T,
  message: string = 'Resource created successfully'
): Response => {
  return sendResponse(res, 201, true, message, data);
};

export const sendAccepted = <T>(
  res: Response,
  data: T,
  message: string = 'Request accepted for processing'
): Response => {
  return sendResponse(res, 202, true, message, data);
};

export const sendNoContent = (
  res: Response,
  message: string = 'No content available'
): Response => {
  return sendResponse(res, 204, true, message);
};

/**
 * Paginated Response
 */
export const sendPaginated = <T>(
  res: Response,
  data: T[],
  page: number,
  limit: number,
  total: number,
  message: string = 'Data retrieved successfully'
): Response => {
  const totalPages = Math.ceil(total / limit);
  
  const response: PaginatedResponse<T[]> = {
    success: true,
    message,
    data,
    statusCode: 200,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  };

  return res.status(200).json(response);
};

/**
 * Error Responses
 */
export const sendBadRequest = (
  res: Response,
  message: string = 'Bad request',
  errors?: any
): Response => {
  return sendResponse(res, 400, false, message, undefined, errors);
};

export const sendUnauthorized = (
  res: Response,
  message: string = 'Unauthorized access',
  errors?: any
): Response => {
  return sendResponse(res, 401, false, message, undefined, errors);
};

export const sendForbidden = (
  res: Response,
  message: string = 'Access forbidden',
  errors?: any
): Response => {
  return sendResponse(res, 403, false, message, undefined, errors);
};

export const sendNotFound = (
  res: Response,
  message: string = 'Resource not found',
  errors?: any
): Response => {
  return sendResponse(res, 404, false, message, undefined, errors);
};

export const sendMethodNotAllowed = (
  res: Response,
  message: string = 'Method not allowed',
  errors?: any
): Response => {
  return sendResponse(res, 405, false, message, undefined, errors);
};

export const sendConflict = (
  res: Response,
  message: string = 'Resource conflict',
  errors?: any
): Response => {
  return sendResponse(res, 409, false, message, undefined, errors);
};

export const sendUnprocessableEntity = (
  res: Response,
  message: string = 'Validation failed',
  errors?: any
): Response => {
  return sendResponse(res, 422, false, message, undefined, errors);
};

export const sendTooManyRequests = (
  res: Response,
  message: string = 'Too many requests',
  errors?: any
): Response => {
  return sendResponse(res, 429, false, message, undefined, errors);
};

export const sendInternalServerError = (
  res: Response,
  message: string = 'Internal server error',
  errors?: any
): Response => {
  return sendResponse(res, 500, false, message, undefined, errors);
};

export const sendServiceUnavailable = (
  res: Response,
  message: string = 'Service unavailable',
  errors?: any
): Response => {
  return sendResponse(res, 503, false, message, undefined, errors);
};

/**
 * Validation Error Response
 */
export const sendValidationError = (
  res: Response,
  errors: any,
  message: string = 'Validation failed'
): Response => {
  return sendResponse(res, 422, false, message, undefined, errors);
};

/**
 * Database Error Response
 */
export const sendDatabaseError = (
  res: Response,
  message: string = 'Database operation failed',
  errors?: any
): Response => {
  return sendResponse(res, 500, false, message, undefined, errors);
};

/**
 * Authentication Error Responses
 */
export const sendInvalidCredentials = (
  res: Response,
  message: string = 'Invalid credentials'
): Response => {
  return sendResponse(res, 401, false, message);
};

export const sendTokenExpired = (
  res: Response,
  message: string = 'Token has expired'
): Response => {
  return sendResponse(res, 401, false, message);
};

export const sendInsufficientPermissions = (
  res: Response,
  message: string = 'Insufficient permissions'
): Response => {
  return sendResponse(res, 403, false, message);
};

/**
 * File Upload Responses
 */
export const sendFileUploadSuccess = (
  res: Response,
  data: any,
  message: string = 'File uploaded successfully'
): Response => {
  return sendResponse(res, 200, true, message, data);
};

export const sendFileUploadError = (
  res: Response,
  message: string = 'File upload failed',
  errors?: any
): Response => {
  return sendResponse(res, 400, false, message, undefined, errors);
};

/**
 * Generic Error Response
 */
export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: any
): Response => {
  return sendResponse(res, statusCode, false, message, undefined, errors);
};

export default {
  // Success responses
  sendSuccess,
  sendCreated,
  sendAccepted,
  sendNoContent,
  sendPaginated,
  
  // Error responses
  sendBadRequest,
  sendUnauthorized,
  sendForbidden,
  sendNotFound,
  sendMethodNotAllowed,
  sendConflict,
  sendUnprocessableEntity,
  sendTooManyRequests,
  sendInternalServerError,
  sendServiceUnavailable,
  
  // Specialized responses
  sendValidationError,
  sendDatabaseError,
  sendInvalidCredentials,
  sendTokenExpired,
  sendInsufficientPermissions,
  sendFileUploadSuccess,
  sendFileUploadError,
  sendError
};
