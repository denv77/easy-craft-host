import {Router} from "@angular/router";
import {routes} from "./routes";

export const buildDynamicRoutes = (router: Router) => {
  return () => {
    router.resetConfig(
      routes((window as any).MICROFRONTEND_MANIFEST)
    );
  };
}
