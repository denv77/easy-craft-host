import {Router} from "@angular/router";
import {routes} from "./routes";
import {manifestService} from './manifest-service';

export const buildDynamicRoutes = (router: Router) => {
    return () => {
        const manifest = manifestService.getManifest();
        if (manifest) {
            router.resetConfig(routes(manifest));
        } else {
            console.error('Manifest is not loaded');
        }
    }
}
