// ************************************
// ERROR-HANDLING MIDDLEWARE FUNCTIONS
// ************************************

/**
 * Handle req that would produce a 404 status code and respons accordingly.
 */
 export const error404 = (req: any, res: any, next: any) => {
    next({ message: 'Not Found', status: 404 });
  };
  
  /**
   * Handle req that would produce a 500 status code and respons accordingly.
   */
  export const error500 = (error: any, req: any, res: any, next: any) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  };