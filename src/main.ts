import {initFederation} from '@angular-architects/native-federation';
import {fetchManifest} from "./app/utils/init";
import {Manifest, MfConfig} from "./app/utils/config";

fetchManifest()
  .then((config: MfConfig[]) => {

    (window as any).MICROFRONTEND_MANIFEST = config;
    // appConfig.providers.push(
    //   {provide: MANIFEST_TOKEN, useValue: config},
    // )
    const manifest: Manifest = {};

    config.forEach(mf => {
      if (mf.remoteName && mf.remoteEntry) {
        manifest[mf.remoteName] = mf.remoteEntry
      }
    })

    return manifest;
  })
  .then(m => initFederation(m)
    .catch(err => console.error(err))
    .then(_ => import('./bootstrap'))
    .catch(err => console.error(err))
  )


