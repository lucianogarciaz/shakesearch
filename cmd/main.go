package main

import (
	obs2 "github.com/lucianogarciaz/kit/obs"
	"pulley.com/shakesearch/pkg/ask"
	s "pulley.com/shakesearch/pkg/server"
)

func main() {
	client := ask.NewChatGPT()
	obs := obs2.NewObserver(obs2.NoopMetrics{}, obs2.NewBasicLogger())
	server := s.NewServer(obs, client)

	server.Serve()
}
