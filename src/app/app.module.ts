import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import { UserModule, UserService, AuthGuard } from './modules/user';
import { FileUploaderModule } from './modules/ui/fileuploader';
import { EditorModule } from './modules/ui/editor';
import { ValidateModule } from './modules/ui/validate';
import { PaginationModule } from './modules/ui/pagination';
import { ModalModule } from './modules/ui/modal';
import { MaskedInputModule } from './modules/ui/masked-input';
import { NotifyModule, NotifyService } from './modules/ui/notify';
import { UIService } from './modules/ui/ui.service';
import { FileService } from './modules/ui/fileuploader/file.service';

import { AppComponent } from './app.component';
import { NoContentComponent } from './components/no-content';
import { NavMenuComponent } from './components/nav-menu';
import { HomeComponent } from './components/home';
import { AssetListComponent } from './components/asset-list';
import { AssetDetailComponent } from './components/asset-detail';
import { AssetEditComponent } from './components/asset-edit';
import { AssetService } from './services/asset.service';

import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
                  AppComponent, NoContentComponent, NavMenuComponent, HomeComponent,
                  AssetListComponent, AssetDetailComponent, AssetEditComponent
                ],
  imports: [
             BrowserModule, FormsModule, ReactiveFormsModule, HttpModule,
             UserModule, FileUploaderModule, EditorModule, ValidateModule, NotifyModule,
             MaskedInputModule, PaginationModule, ModalModule,
             RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
           ],
  providers: [
               ENV_PROVIDERS, APP_PROVIDERS,
               UserService, UIService, AuthGuard, AssetService, NotifyService, FileService
             ]
})
export class AppModule {

  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  public hmrOnInit(store: StoreType) {

    if (!store || !store.state) {
      return;
    }

    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
