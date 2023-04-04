include .env
run:
	npm run build --prefix ./frontend
	bash -c 'set -o allexport;source .env;set +o allexport;go run ./cmd/main.go'
docker-build:
	docker build -t shakesearch .

docker-run: docker-build
	docker run -p 8081:$(PORT) -e PORT=$(PORT) -e API_KEY=$(API_KEY) -e FRONTEND_PATH=static shakesearch

lint: ## Verify code standards.
	@echo "Running linters"
	golangci-lint run

fix: ## Fix code standards.
	@echo "Fixing linters"
	golangci-lint run --fix

install-moq: ## Install moq.
	go install github.com/matryer/moq@latest

mocks:
	go mod vendor

	#server
	moq -out pkg/server/zmock_server_test.go -pkg server_test pkg/ask Ask
	moq -out pkg/server/zmock_lib_obs_test.go -pkg server_test vendor/github.com/lucianogarciaz/kit/obs Observer

	rm -rf ./vendor