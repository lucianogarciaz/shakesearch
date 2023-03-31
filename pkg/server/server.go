package server

import (
	"bytes"
	"encoding/json"
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
	err := s.searcher.Load("completeworks.txt")
	if err != nil {
		log.Fatal(err)
	}
	fs := http.FileServer(http.Dir("./static"))

	http.Handle("/", fs)

	http.Handle("/search", s.Search())

	_ = s.obs.Log(obs.LevelInfo, fmt.Sprintf("http server Listening on port %s", port()))

	log.Fatal(http.ListenAndServe(port(), nil))
}

func (s *Server) Search() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		search := s.searcher
		query, ok := r.URL.Query()["q"]
		if !ok || len(query[0]) < 1 {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("missing search query in URL params"))
			return
		}
		results := search.Search(query[0])
		buf := &bytes.Buffer{}
		enc := json.NewEncoder(buf)
		err := enc.Encode(results)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("encoding failure"))
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(buf.Bytes())
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
