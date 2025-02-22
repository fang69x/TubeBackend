        //  A class to standardize your API responses


class ApiResponse {
    constructor(statusCode, data, message = "Success") {
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
      this.success = statusCode < 400;
    }
  }
  
  export { ApiResponse };
  
/*
  Explanation
Constructor:
The constructor method initializes the class instance. It accepts:
statusCode: The HTTP status code.
data: The data to be returned in the response.
message: An optional message with a default value of "Success".
Success Property:
The success property is computed based on the status code. If the statusCode is less than 400,
 it sets success to true (indicating a successful response). Otherwise, it would be false.
*/