import { LoadRemoteModuleOptions } from "@angular-architects/native-federation";

export declare type Manifest = {
  [key: string]: string;
};

export type MfConfig = LoadRemoteModuleOptions & {
  displayName: string;
  routePath: string;
  ngModuleName: string;
};
