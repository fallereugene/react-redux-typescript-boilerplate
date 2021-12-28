import getParsedArguments from './get-parsed-arguments';

const parsedArguments = getParsedArguments();

export default parsedArguments.isDevServer ?? false;
