import {loadRemoteModule} from '@angular-architects/native-federation';
import {Routes} from "@angular/router";
import {MfConfig} from "./config";
import {NotFoundComponent} from "../404/404.component";

export function routes(options: MfConfig[]): Routes {

  const lazyRoutes: Routes = Array.from(options).map(o => ({
    path: o.routePath,
    loadChildren: () => loadRemoteModule(o).then(m => m[o.ngModuleName]),
  }));

  return [
    ...lazyRoutes,
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {path: '404', component: NotFoundComponent},
    {
      path: '**',
      redirectTo: '404',
      pathMatch: 'full',
    },
  ];
}
