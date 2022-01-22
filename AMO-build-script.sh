npm install -g web-ext
npm run build
# the above line creates a folder called "build" that contains bundled code
cd build
web-ext build
# now the zip file will be created inside web-ext-artifacts/
