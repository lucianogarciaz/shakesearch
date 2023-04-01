# Build React app
FROM node:18.4 as react-build
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm ci
COPY ./frontend/ ./
RUN npm run build

# Build Go app
FROM golang:1.19 as go-build
WORKDIR /go/src/app
COPY ./ ./
COPY --from=react-build /app/build ./static
RUN go get -d -v ./...
RUN go build -o app ./cmd/

# Final image
FROM gcr.io/distroless/base
COPY --from=go-build /go/src/app/app /
COPY --from=react-build /app/build /static
ENV PORT=8080
EXPOSE 8080
CMD ["/app"]
