import {initFederation} from '@angular-architects/native-federation';
import {Manifest, manifestService, MfConfig} from './app/utils/manifest-service';

manifestService.loadManifest()
    .then((config: MfConfig[]) => {

        const manifest: Manifest = {};

        config.forEach(mf => {
            if (mf.remoteName && mf.remoteEntry) {
                manifest[mf.remoteName] = mf.remoteEntry;
            }
        });

        return manifest;
    })
    .then((m: Manifest) => initFederation(m)
        .catch(err => console.error(err))
        .then(_ => import('./bootstrap'))
        .catch(err => console.error(err))
    );


