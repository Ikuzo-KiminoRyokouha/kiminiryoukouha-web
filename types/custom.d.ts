declare global {
  interface Window {
    Tmapv2: any;
  }
  interface Array {
    deduplication(): Array<any>;
    filterTarget(target: any): Array<any>;
  }
}

declare module "axios" {
  interface AxiosRequestConfig extends AxiosRequestConfig {
    cookie?: string;
  }
}
export default {};
