/**
 * PipeContract.
 */
var PipeContract = {

  _getDefinition: function(contract, resource) {
    if (!contract || !Object.keys(contract)) {
      throw new Error('Empty contract supplied.');
    }

    var definition = contract[resource];

    // Validate that we have a definition for this resource.
    if (!definition) {
      throw new Error('Resource not found in contract.');
    }

    return definition;
  },

  /**
   * Implements and enforces a contract on a pipe object.
   * @param {Object} pipe An instantiated communication pipe from pipe-core.
   * @param {Object} contract A contract mapping events to definitions.
   */
  implement: function(pipe, contract) {
    // Update pipe.handle.
    var oldHandle = pipe.handle;
    pipe.handle = function(resource, params) {
      var definition = PipeContract._getDefinition(contract, resource);

      // Validate worker context.
      // TODO...

      // Validate param list.
      // TODO...

      // Return the original response.
      return oldHandle.apply(pipe, Array.slice(arguments));
    };


    // Update pipe.request.
    var oldRequest = pipe.request;
    pipe.request = function(resource, params) {

      var definition = PipeContract._getDefinition(contract, resource);

      // Validate worker context.
      // TODO...

      // Validate param list.
      if (definition.args) {
        for (var i in definition.args) {
          if (!params || !params[i]) {
            throw new Error('Missing argument ', i, ' in contract for resource ', resource);
          } else if (params[i] === String && typeof params[i] !== "string") {
            throw new Error('Expected string, but received ', typeof(params[i]), resource);
          } else if (params[i] === Number && typeof params[i] !== "number") {
            throw new Error('Expected number, but received ', typeof(params[i]), resource);
          } else if (params[i] === Boolean && typeof params[i] !== "boolean") {
            throw new Error('Expected boolean, but received ', typeof(params[i]), resource);
          } else if (params[i] === Array && typeof !Array.isArray(params[i])) {
            throw new Error('Expected array, but received ', typeof(params[i]), resource);
          } else if (params[i] === Object && typeof params[i] !== "object") {
            throw new Error('Expected object, but received ', typeof(params[i]), resource);
          }
        }
      }

      // Return the original response.
      return oldRequest.apply(pipe, Array.slice(arguments));
    };
  }
};
