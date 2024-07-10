package main

import (
	"context"

	"github.com/a4to/ALM/cmd"
	"github.com/spf13/cobra"
)

func main() {
	cobra.CheckErr(cmd.NewCLI().ExecuteContext(context.Background()))
}
