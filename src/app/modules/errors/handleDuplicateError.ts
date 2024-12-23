/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorSource, TGenericErrorResponse } from "../../config/error";


const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources: TErrorSource = [
      {
        path: '',
        message: extractedMessage,
      },
    ];
    const statusCode = 400;
  
    return {
      statusCode,
      message: 'Already exist',
      errorSources,
    };
  };
  
  export default handleDuplicateError;
  