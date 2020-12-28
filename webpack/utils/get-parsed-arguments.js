import { argv } from 'yargs';

// Получение и преобразование переданных аргументов при запуске команды
// Например, --env mode=dev --env isDevServer преобразуется в { mode: 'dev', isDevServer: true }
const getParsedArguments = () => {
  let { env = [] } = argv;
  env = Array.isArray(env) ? env : env.split(` `);
  return env.reduce((accumulator, currentValue) => {
    const [key, value = true] = currentValue.split('=');
    return { ...accumulator, [key]: value };
  }, {});
};

export default getParsedArguments;
