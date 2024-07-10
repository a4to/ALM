//go:build !windows && !darwin

package cmd

import (
	"context"
	"fmt"

	"github.com/a4to/alm/api"
)

func startApp(ctx context.Context, client *api.Client) error {
	return fmt.Errorf("could not connect to alm server, run 'alm serve' to start it")
}
