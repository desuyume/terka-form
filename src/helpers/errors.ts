import { ERROR_MESSAGES } from '@constants/error';

const isRequiredValidationError = (message: string | undefined) => {
  return message === ERROR_MESSAGES.REQUIRED_ERROR;
};

export { isRequiredValidationError };
