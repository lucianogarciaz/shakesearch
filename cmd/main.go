package main

import (
	"pulley.com/shakesearch/pkg/searcher"
	server2 "pulley.com/shakesearch/pkg/server"
)

func main() {
	s := searcher.Searcher{}

	server := server2.NewServer(s)

	server.Serve()
}
