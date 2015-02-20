[![Build Status](https://travis-ci.org/KevinGrandon/pipe-contract.svg?branch=master)](https://travis-ci.org/KevinGrandon/pipe-contract)

# pipe-contract

Pipe contract is a library which validates pipe methods and arguments. This protects developers and helps control API methods.

## Get the code
```
bower install KevinGrandon/pipe-contract
```

## Example Usage

*Include pipe-contract.js in your page*
```
<script defer src="/bower_components/pipe-core/pipe.js"></script>
<script defer src="/bower_components/pipe-contract/pipe-contract.js"></script>
```

*Usage*
```js
var pipe = new Pipe();
PipeContract.implement(pipe, contract);
```

*Example Contract Syntax*
```js
var contract = {
  getAll: {
    args: {
      filter: Object
    },
    context: 'SharedWorker'
  },
  getOne: {
    args: {
      id: Number
    },
    context: 'Worker'
  },
  save: {
    args: {
      id: Number,
      name: String
    },
    context: 'SharedWorker'
  },
  cacheInfo: {
    args: {
      id: String
    },
    context: 'ServiceWorker'
  }
};
```
