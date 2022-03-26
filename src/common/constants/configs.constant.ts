export enum NODE_ENV {
  local = 'local',
  development = 'development',
}

export const ENV_FILE_PATH = `environments/${process.env.NODE_ENV}/.env`
