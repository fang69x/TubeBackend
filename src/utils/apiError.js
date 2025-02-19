class ApiError extends Error {
    constructor(
      statusCode,                   // HTTP status code (e.g., 404, 500)
      message = "Something went wrong", // Default error message
      errors = [],                  // An optional array to capture additional error details
      stack = ""                    // Optional custom stack trace
    ) {
      super(message);               // Call the parent Error class constructor with the message
      this.statusCode = statusCode; // Set the HTTP status code
      this.data = null;             // Initialize any additional data (if needed)
      this.message = message;       // Set the error message
      this.success = false;         // Typically, API errors indicate a failure
      this.errors = errors;         // Store the array of additional error details
  
      // If a stack trace is provided, use it; otherwise, capture the current stack trace.
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  export { ApiError };
  