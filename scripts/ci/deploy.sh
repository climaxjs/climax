npm run build
cd build
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
npm publish --access public
