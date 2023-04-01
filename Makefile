run:
	npm run build --prefix ./frontend
	bash -c 'set -o allexport;source .env;set +o allexport;go run ./cmd/main.go'

build:
	go build -o shakesearch ./cmd