package server

import (
	"encoding/json"
	"fmt"
	"github.com/lucianogarciaz/kit/obs"
	"log"
	"net/http"
	"os"
	"pulley.com/shakesearch/pkg/ask"
)

type Server struct {
	obs      obs.Observer
	searcher ask.Ask
}

func NewServer(obs obs.Observer, searcher ask.Ask) *Server {
	return &Server{obs: obs, searcher: searcher}
}

func (s *Server) Serve() {
	path := os.Getenv("FRONTEND_PATH")
	fs := http.FileServer(http.Dir(path))

	http.Handle("/", fs)

	http.Handle("/search", s.Search())

	_ = s.obs.Log(obs.LevelInfo, fmt.Sprintf("http server Listening on port %s", port()))

	log.Fatal(http.ListenAndServe(port(), nil))
}

func (s *Server) Search() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		var req Search
		err := json.NewDecoder(r.Body).Decode(&req)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			_ = s.obs.Log(obs.LevelInfo, err.Error())
			return
		}

		response, err := s.searcher.Ask(r.Context(), req.Question)
		if err != nil {
			switch err {
			case ask.ErrEmptyQuestion:
				w.WriteHeader(http.StatusBadRequest)
			default:
				w.WriteHeader(http.StatusInternalServerError)
			}
			_ = s.obs.Log(obs.LevelError, err.Error())
			return
		}

		b, err := json.Marshal(Response{Response: response})
		if err != nil {
			_ = s.obs.Log(obs.LevelError, err.Error())
			w.WriteHeader(http.StatusInternalServerError)
		}

		_, _ = w.Write(b)
		w.WriteHeader(http.StatusOK)
		_ = s.obs.Log(obs.LevelInfo, fmt.Sprintf("request with question: %s", req.Question))
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

type Search struct {
	Question string `json:"question"`
}

type Response struct {
	Response string `json:"response"`
}
