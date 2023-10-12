
export class CustomAPIError extends Error {
    static BadRequestError: any;
    static UnauthenticatedError: any;
    constructor(message:string) {
      super(message)
    }
  }
  
  