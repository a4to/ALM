//go:build !windows && !darwin

package cmd

import (
	"context"
	"fmt"

	"github.com/a4to/ALM/api"
)

func startApp(ctx context.Context, client *api.Client) error {
	return fmt.Errorf("could not connect to ALM server, run 'ALM serve' to start it")
}
