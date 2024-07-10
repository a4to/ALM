package tray

import (
	"github.com/a4to/ALM/app/tray/commontray"
	"github.com/a4to/ALM/app/tray/wintray"
)

func InitPlatformTray(icon, updateIcon []byte) (commontray.OllamaTray, error) {
	return wintray.InitTray(icon, updateIcon)
}
