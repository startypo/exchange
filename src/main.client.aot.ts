// the polyfills must be the first thing imported
import 'angular2-universal-polyfills';
import 'ts-helpers';
import './__workaround.client'; // temporary until 2.1.1 things are patched in Core

// Angular 2
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { bootloader } from '@angularclass/bootloader';
// for AoT use platformBrowser
// import { platformUniversalDynamic } from 'angular2-universal/browser';

import { load as loadWebFont } from 'webfontloader';

// enable prod for faster renders
enableProdMode();

import { ClientModuleNgFactory } from './client.module.ngfactory';

export const platformRef = platformBrowser();

// on document ready bootstrap Angular 2
export function main() {
  // Load fonts async
  // https://github.com/typekit/webfontloader#configuration
  loadWebFont({
    google: {
      families: ['Droid Sans']
    }
  });

  return platformRef.bootstrapModuleFactory(ClientModuleNgFactory);
}

// support async tag or hmr
bootloader(main);
