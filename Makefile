include .env
run:
	npm run build --prefix ./frontend
	bash -c 'set -o allexport;source .env;set +o allexport;go run ./cmd/main.go'
docker-build:
	docker build -t shakesearch .

docker-run: docker-build
	docker run -p 8081:$(PORT) -e PORT=$(PORT) -e API_KEY=$(API_KEY) -e FRONTEND_PATH=static shakesearch
