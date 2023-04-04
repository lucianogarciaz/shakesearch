package server

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/lucianogarciaz/kit/obs"

	"pulley.com/shakesearch/pkg/ask"
)

const (
	timeout     = 15
	idleTimeout = 60
	maxAge      = 3600
)

type Server struct {
	obs obs.Observer
	mux.Router
	searcher ask.Ask
}

func NewServer(obs obs.Observer, searcher ask.Ask) *Server {
	return &Server{obs: obs, searcher: searcher}
}

func (s *Server) Serve() {
	path := os.Getenv("FRONTEND_PATH")

	router := mux.NewRouter()

	router.HandleFunc("/search", s.Search()).Methods(http.MethodGet)

	fs := http.FileServer(http.Dir(path))
	router.PathPrefix("/").Handler(handlers.CompressHandler(fs)).Methods(http.MethodGet)

	router.Use(s.logMiddleware)
	router.Use(s.setCacheControlMiddleware)

	server := &http.Server{
		Addr:         port(),
		Handler:      router,
		ReadTimeout:  timeout * time.Second,
		WriteTimeout: timeout * time.Second,
		IdleTimeout:  idleTimeout * time.Second,
	}

	_ = s.obs.Log(obs.LevelInfo, fmt.Sprintf("http server Listening on port %s", port()))

	log.Fatal(server.ListenAndServe())
}

func (s *Server) Search() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		question := r.URL.Query().Get("question")

		response, err := s.searcher.Ask(r.Context(), question)
		if err != nil {
			statusCode := http.StatusInternalServerError

			if errors.Is(err, ask.ErrEmptyQuestion) {
				statusCode = http.StatusBadRequest
			}

			w.WriteHeader(statusCode)

			_ = s.obs.Log(obs.LevelError, err.Error())

			return
		}

		b, err := json.Marshal(Response{Response: response})
		if err != nil {
			_ = s.obs.Log(obs.LevelError, err.Error())

			w.WriteHeader(http.StatusInternalServerError)

			return
		}

		w.WriteHeader(http.StatusOK)
		_, _ = w.Write(b)
		_ = s.obs.Log(obs.LevelInfo, fmt.Sprintf("request with question: %s", question))
	}
}

func (s *Server) setCacheControlMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			if strings.HasPrefix(r.URL.Path, "/static/") {
				w.Header().Set("Cache-Control", fmt.Sprintf("max-age=%d", maxAge))
			}
		}

		h.ServeHTTP(w, r)
	})
}

func (s *Server) logMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func(begin time.Time) {
			elapsed := time.Since(begin)
			_ = s.obs.Log(obs.LevelInfo, fmt.Sprintf("request latency, %f", elapsed.Seconds()))
		}(time.Now())

		_ = s.obs.Log(
			obs.LevelInfo,
			fmt.Sprintf("new request with method %s to url: %s", r.Method, r.URL.String()),
		)
		h.ServeHTTP(w, r)
	})
}

const defaultAddress = "3001"

func port() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultAddress
	}

	return fmt.Sprintf(":%s", port)
}

type Response struct {
	Response string `json:"response"`
}
