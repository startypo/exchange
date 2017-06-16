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

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

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
import { AssetService } from './services/asset.service';
import { HandService } from './services/hand.service';
import { ExchangeService } from './services/exchange.service';

import { AppComponent } from './app.component';
import { NoContentComponent } from './components/no-content';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { AssetListComponent } from './components/asset-list';
import { AssetDetailComponent } from './components/asset-detail';
import { AssetEditComponent } from './components/asset-edit';
import { CreditsComponent } from './components/credits/credits.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { ExchangeDetailComponent } from './components/exchange-detail/exchange-detail.component';
import { NavAuthComponent } from './components/nav-auth/nav.component';
import { HeaderAuthComponent } from './components/header-auth/header.component';

// import '../styles/style.scss';
// import '../styles/landing-page.scss';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

export interface StoreType  {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
                  AppComponent, NoContentComponent, NavComponent, NavAuthComponent,
                  HeaderComponent, HeaderAuthComponent, FooterComponent, LandingComponent,
                  HomeComponent, AssetListComponent, AssetDetailComponent, AssetEditComponent,
                  CreditsComponent, ExchangeComponent, ExchangeDetailComponent
                ],
  imports: [
             BrowserModule, FormsModule, ReactiveFormsModule, HttpModule,
             UserModule, FileUploaderModule, EditorModule, ValidateModule, NotifyModule,
             MaskedInputModule, PaginationModule, ModalModule, VgCoreModule, VgControlsModule,
             VgOverlayPlayModule, VgBufferingModule,
             RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
           ],
  providers: [
               ENV_PROVIDERS, APP_PROVIDERS,
               UserService, AssetService, HandService, ExchangeService, UIService, AuthGuard, NotifyService, FileService
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
      const restoreInputValues = store.restoreInputValues;
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
