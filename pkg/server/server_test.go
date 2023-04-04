package server_test

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/lucianogarciaz/kit/obs"
	"github.com/stretchr/testify/require"

	"pulley.com/shakesearch/pkg/ask"
	"pulley.com/shakesearch/pkg/server"
)

func TestSearch(t *testing.T) {
	require := require.New(t)

	t.Run(`Given a request with a ask that returns an error,
		when it's called,
		then it return a 500 status`, func(t *testing.T) {
		expectedQuestion := "question"
		expectedError := errors.New("ask")
		obsMock := &ObserverMock{
			LogFunc: func(obs.LogLevel, string, ...obs.PayloadEntry) error {
				return nil
			},
		}

		askMock := &AskMock{AskFunc: func(context.Context, string) (string, error) {
			return "", expectedError
		}}
		s := server.NewServer(obsMock, askMock)

		w := httptest.NewRecorder()
		r := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/search?question=%s", expectedQuestion), nil)
		s.Search().ServeHTTP(w, r)

		require.Equal(http.StatusInternalServerError, w.Code)
		require.Len(askMock.AskCalls(), 1)
		require.Equal(expectedQuestion, askMock.AskCalls()[0].Query)
		require.Len(obsMock.LogCalls(), 1)
		require.Equal(expectedError.Error(), obsMock.LogCalls()[0].Message)
		require.Equal(obs.LevelError, obsMock.LogCalls()[0].Level)
	})

	t.Run(`Given a request with a ask that returns a ErrEmptyQuestion,
		when it's called,
		then it return a 400 status`, func(t *testing.T) {
		obsMock := &ObserverMock{
			LogFunc: func(obs.LogLevel, string, ...obs.PayloadEntry) error {
				return nil
			},
		}

		askMock := &AskMock{AskFunc: func(context.Context, string) (string, error) {
			return "", ask.ErrEmptyQuestion
		}}
		s := server.NewServer(obsMock, askMock)

		w := httptest.NewRecorder()
		r := httptest.NewRequest(http.MethodGet, "/search", nil)
		s.Search().ServeHTTP(w, r)

		require.Equal(http.StatusBadRequest, w.Code)
		require.Len(askMock.AskCalls(), 1)
		require.Len(obsMock.LogCalls(), 1)
		require.Equal(ask.ErrEmptyQuestion.Error(), obsMock.LogCalls()[0].Message)
		require.Equal(obs.LevelError, obsMock.LogCalls()[0].Level)
	})

	t.Run(`Given a valid request,
		when it's called,
		then it return a 200 status and a response`, func(t *testing.T) {
		response := "response"
		expectedResponse := fmt.Sprintf(`{"response":"%s"}`, response)
		expectedQuestion := "question"
		obsMock := &ObserverMock{
			LogFunc: func(obs.LogLevel, string, ...obs.PayloadEntry) error {
				return nil
			},
		}

		askMock := &AskMock{AskFunc: func(context.Context, string) (string, error) {
			return response, nil
		}}
		s := server.NewServer(obsMock, askMock)

		w := httptest.NewRecorder()

		r := httptest.NewRequest(http.MethodPost, fmt.Sprintf("/search?question=%s", expectedQuestion), nil)
		s.Search().ServeHTTP(w, r)

		require.Equal(http.StatusOK, w.Code)
		require.Len(askMock.AskCalls(), 1)
		require.Equal(expectedQuestion, askMock.AskCalls()[0].Query)
		require.Len(obsMock.LogCalls(), 1)
		require.Equal(obs.LevelInfo, obsMock.LogCalls()[0].Level)
		require.Equal(expectedResponse, w.Body.String())
	})
}
