import {getParsedArguments} from './';

const parsedArguments = getParsedArguments();

export default parsedArguments.mode ?? 'production';
