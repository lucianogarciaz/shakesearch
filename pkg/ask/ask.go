package ask

import (
	"context"
	"errors"
	"fmt"
	"github.com/sashabaranov/go-openai"
	"os"
)

type Ask interface {
	Ask(ctx context.Context, query string) (string, error)
}

var _ Ask = &ChatGPT{}

type ChatGPT struct {
	client *openai.Client
}

const APIKEY = "API_KEY"

func NewChatGPT() *ChatGPT {
	apiKey := os.Getenv(APIKEY)
	return &ChatGPT{openai.NewClient(apiKey)}
}

var (
	ErrEmptyResponse = errors.New("empty response from chatgpt")
	ErrEmptyQuestion = errors.New("empty question")
)

func (c ChatGPT) Ask(ctx context.Context, question string) (string, error) {
	if question == "" {
		return "", ErrEmptyQuestion
	}

	resp, err := c.client.CreateChatCompletion(
		ctx,
		openai.ChatCompletionRequest{
			Model:       openai.GPT3Dot5Turbo,
			Temperature: 0.5,
			TopP:        0.9,
			Messages: []openai.ChatCompletionMessage{
				{
					Role: openai.ChatMessageRoleUser,
					Content: fmt.Sprintf("As an expert on Shakespeare's works, can you answer with modern "+
						"language this input as "+
						"you were Shakespeare without saying that you are Shakespeare and ?"+
						"The input: %s"+
						"The maximum amount of words is 100 and the minimum 50", question),
				},
			},
		},
	)
	if err != nil {
		return "", fmt.Errorf("chatgpt: createChatCompletion: %w", err)
	}

	if len(resp.Choices) == 0 {
		return "", ErrEmptyResponse
	}

	return resp.Choices[0].Message.Content, nil
}
