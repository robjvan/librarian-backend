import { IConfig, IDirectories, IEnvironment, ISecrets } from "./config.interface";
import * as path from "path";
import { defaultConfigFactory, defaultSecretConfigFactory, environmentConfigFactory } from "./config.factory";

export const rootDirectory: string = path.normalize(__dirname + "/../..");
export const assetDirectory: string = path.normalize(__dirname + "/../assets");

let config: IConfig;
let secrets: ISecrets;

export async function initializeConfig(): Promise<IConfig> {
  if (config) return config;

  const directories: IDirectories = {
      rootDirectory,
      assetDirectory,
  };

  const environment: IEnvironment = environmentConfigFactory(process.env);

  secrets = await defaultSecretConfigFactory(environment);
  config = defaultConfigFactory(environment, directories);

  return config;
}