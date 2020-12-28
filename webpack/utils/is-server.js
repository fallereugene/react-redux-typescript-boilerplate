import {getParsedArguments} from '.';

const parsedArguments = getParsedArguments();

export default parsedArguments.isDevServer ?? false;
