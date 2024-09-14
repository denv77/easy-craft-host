import { UserInfo } from '@easy-craft/auth';

export declare module '@easy-craft/auth' {
  interface UserInfo {
    scope: string; // e.g.: "dashboard.add:r dashboard.edit:r"
  }
}
