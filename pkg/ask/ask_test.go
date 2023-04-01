package ask_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"pulley.com/shakesearch/pkg/ask"
	"testing"
)

func TestAsk(t *testing.T) {
	require := require.New(t)

	t.Run(`Given a chatgpt client with a question that is empty,
		when it's called,
		then it returns an error`, func(t *testing.T) {
		client := ask.NewChatGPT()

		resp, err := client.Ask(context.Background(), "")

		require.ErrorIs(err, ask.ErrEmptyQuestion)
		require.Empty(resp)
	})

	t.Run(`Given a chatgpt client,
		when it's called with a query,
		then it returns a response`, func(t *testing.T) {
		client := ask.NewChatGPT()
		resp, err := client.Ask(context.Background(), "some query")
		require.NoError(err)
		require.NotEmpty(resp)
	})
}
