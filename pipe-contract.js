/**
 * PipeContract.
 */
var PipeContract = {

  /**
   * Implements and enforces a contract on a pipe object.
   * @param {Object} pipe An instantiated communication pipe from pipe-core.
   * @param {Object} contract A contract mapping events to definitions.
   */
  implement: function(pipe, contract) {
    // Update pipe.request.
    var oldRequest = pipe.request;
    pipe.request = function(resource, params) {

      // Validate that we have a definition for this resource.
      if (!contract[resource]) {
        throw new Error('Resource not found in contract.');
      }

      // Validate worker context.
      // ...

      // Validate param list.
      // ...

      // Return the original response.
      return oldRequest(resource, params);
    };
  }
};
