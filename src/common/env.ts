import { notEqual } from 'assert';

export enum Environment {
  DEVELOPMENT = 'DEVELOPMENT',
  STAGING = 'STAGING'
}

export interface Vars {
  ENVIRONMENT: Environment;
  AWS_QUEUE_URL: string;
  AWS_BUCKET: string;
  AWS_DEFAULT_REGION: string;
}

/**
 * Checks if a variable is set as expected.
 * @param object - enum object
 * @param property - property value of process.env
 */
function isInvalid(object: any, property: any) {
  return !Object.values(object).includes(property);
}

function validateVars(vars: Vars) {
  /* eslint-disable-next-line no-param-reassign */
  if (vars.ENVIRONMENT === undefined) vars.ENVIRONMENT = Environment.DEVELOPMENT;
  if (isInvalid(vars, vars.ENVIRONMENT)) throw new Error(`invalid environment: ${vars.ENVIRONMENT}`);

  if (vars.ENVIRONMENT === Environment.STAGING) {
    notEqual(vars.AWS_DEFAULT_REGION, undefined);
  }
}

let variables: any;

/**
 * Returns environment variables after validating.
 */
export function getEnv(): Vars {
  if (!variables) {
    validateVars(process.env as any as Vars);
    variables = process.env as any;
  }

  return variables as Vars;
}

/**
 * Constructs endpoint URL.
 * @param service - AWS service to use
 */
export function getEndpoint(service: string): string {
  if (variables === undefined) throw new Error('cannot get endpoint - vars not initialized');
  return `https://${service}.${getEnv().AWS_DEFAULT_REGION}.amazonaws.com`;
}
