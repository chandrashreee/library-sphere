import { toast } from 'sonner';

/**
 * Show a success toast message
 * @param {string} message - The message to display
 */
export const showSuccess = (message) => {
    toast.success(message);
};

/**
 * Show an error toast message
 * @param {string} message - The error message to display
 */
export const showError = (message) => {
    toast.error(message);
};

/**
 * Show an info toast message
 * @param {string} message - The info message to display
 */
export const showInfo = (message) => {
    toast.info(message);
};

/**
 * Show a warning toast message
 * @param {string} message - The warning message to display
 */
export const showWarning = (message) => {
    toast.warning(message);
};

/**
 * Show a loading toast with promise resolution
 * @param {Promise} promise - The promise to track
 * @param {Object} messages - Object containing loading, success, and error messages
 */
export const showPromise = (promise, messages) => {
    return toast.promise(promise, {
        loading: messages.loading || 'Loading...',
        success: messages.success || 'Operation completed successfully',
        error: (err) => messages.error || err.message || 'An error occurred',
    });
};

export default {
    success: showSuccess,
    error: showError,
    info: showInfo,
    warning: showWarning,
    promise: showPromise,
}; 