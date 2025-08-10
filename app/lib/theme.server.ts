// Always return dark theme - no more system detection needed
export function getSystemTheme(request: Request): "dark" {
  return "dark";
}
