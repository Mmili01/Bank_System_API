import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-api";

class UnauthorisedError extends CustomAPIError{
    public statusCodes : StatusCodes

    constructor(message:string){
        super(message)
        this.statusCodes = StatusCodes.FORBIDDEN
    }

}

export default UnauthorisedError