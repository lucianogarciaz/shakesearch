package server

import (
	"fmt"
	"github.com/lucianogarciaz/kit/obs"
	"log"
	"net/http"
	"os"
	"pulley.com/shakesearch/pkg/searcher"
)

type Server struct {
	obs      obs.Observer
	searcher searcher.Searcher
}

func NewServer(obs obs.Observer, searcher searcher.Searcher) *Server {
	return &Server{obs: obs, searcher: searcher}
}

func (s *Server) Serve() {
	fs := http.FileServer(http.Dir("./frontend/build"))

	http.Handle("/", fs)

	http.Handle("/search", s.Search())

	_ = s.obs.Log(obs.LevelInfo, fmt.Sprintf("http server Listening on port %s", port()))

	log.Fatal(http.ListenAndServe(port(), nil))
}

func (s *Server) Search() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
	}
}

const address = "3001"

func port() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = address
	}

	return fmt.Sprintf(":%s", port)
}
