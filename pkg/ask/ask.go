package ask

import (
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/sashabaranov/go-openai"
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

	const temperature = 0.5
	const p = 0.9

	resp, err := c.client.CreateChatCompletion(
		ctx,
		openai.ChatCompletionRequest{
			Model:       openai.GPT3Dot5Turbo,
			Temperature: temperature,
			TopP:        p,
			Messages: []openai.ChatCompletionMessage{
				{
					Role: openai.ChatMessageRoleUser,
					Content: fmt.Sprintf("As an expert on Shakespeare's works, "+
						"can you answer this input relating it to Shakespeare?"+
						"If the input is not a question, search for related content in Shakespeare's "+
						"works and complete the phrase."+
						"The input: %s"+
						"The maximum amount of words is 150 and the minimum 50", question),
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
