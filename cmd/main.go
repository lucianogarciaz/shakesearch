package main

import (
	obs2 "github.com/lucianogarciaz/kit/obs"
	"pulley.com/shakesearch/pkg/searcher"
	s "pulley.com/shakesearch/pkg/server"
)

func main() {
	searchEng := searcher.Searcher{}
	obs := obs2.NewObserver(obs2.NoopMetrics{}, obs2.NewBasicLogger())
	server := s.NewServer(obs, searchEng)

	server.Serve()
}
