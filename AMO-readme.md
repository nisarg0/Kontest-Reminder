# Build instructions for [addons.mozilla.org](https://addons.mozilla.org) reviewers

The extension file submitted is a zip file with the naming format kontest_reminder-\<version>.zip.

The source code is also available on [Github](https://github.com/nisarg0/kontest-reminder).

This extension uses [browser-polyfill.js from Mozilla's webextension-polyfill repository](https://github.com/mozilla/webextension-polyfill/blob/0.8.0/src/browser-polyfill.js).

It also uses [web-ext by Mozilla](https://github.com/mozilla/web-ext) to build the extension and test it.

Operating system used for build: Windows 10 (will work on any OS).

Command used to generate source code zip file:

```bash
zip -r source-code.zip * -x "build/*" "dev/*" "node_modules/*" ".cache/*" *.zip "web-ext-artifacts/*"
```

To build the extension from source using web-ext, run the file AMO-build-script.sh present in this directory.
