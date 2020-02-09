install: install-deps

run:
	npx babel-node 'src/bin/gendiff.js' -h

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

lint:
	npx eslint .

publish:
	npm publish