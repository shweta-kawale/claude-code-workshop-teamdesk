import { Monitor, Moon, Sparkles, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "#/components/ui/button";

type ThemeMode = "light" | "dark" | "auto" | "unicorn";

const NEXT_MODE: Record<ThemeMode, ThemeMode> = {
  auto: "light",
  dark: "unicorn",
  light: "dark",
  unicorn: "auto",
};

const MODE_LABEL: Record<ThemeMode, string> = {
  auto: "Auto",
  dark: "Dark",
  light: "Light",
  unicorn: "Unicorn",
};

const MODE_ICON = {
  auto: Monitor,
  dark: Moon,
  light: Sun,
  unicorn: Sparkles,
} as const;

function resolveTheme(mode: ThemeMode, prefersDark: boolean): "light" | "dark" {
  if (mode === "auto") {
    return prefersDark ? "dark" : "light";
  }
  if (mode === "unicorn") {
    return "light";
  }
  return mode;
}

function getInitialMode(): ThemeMode {
  if (typeof window === "undefined") {
    return "auto";
  }

  const stored = window.localStorage.getItem("theme");
  if (
    stored === "light" ||
    stored === "dark" ||
    stored === "auto" ||
    stored === "unicorn"
  ) {
    return stored;
  }

  return "auto";
}

function applyThemeMode(mode: ThemeMode) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = resolveTheme(mode, prefersDark);

  document.documentElement.classList.remove("light", "dark", "unicorn");
  document.documentElement.classList.add(resolved);
  if (mode === "unicorn") {
    document.documentElement.classList.add("unicorn");
  }

  if (mode === "auto") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", mode);
  }

  document.documentElement.style.colorScheme = resolved;
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("auto");

  useEffect(() => {
    const initialMode = getInitialMode();
    setMode(initialMode);
    applyThemeMode(initialMode);
  }, []);

  useEffect(() => {
    if (mode !== "auto") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyThemeMode("auto");

    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
    };
  }, [mode]);

  function toggleMode() {
    const nextMode = NEXT_MODE[mode];
    setMode(nextMode);
    applyThemeMode(nextMode);
    window.localStorage.setItem("theme", nextMode);
  }

  const nextLabel = MODE_LABEL[NEXT_MODE[mode]].toLowerCase();
  const label = `Theme mode: ${mode === "auto" ? "auto (system)" : mode}. Click to switch to ${nextLabel} mode.`;

  const ModeIcon = MODE_ICON[mode];

  return (
    <Button
      aria-label={label}
      onClick={toggleMode}
      size="sm"
      title={label}
      type="button"
      variant="outline"
    >
      <ModeIcon />
      {MODE_LABEL[mode]}
    </Button>
  );
}
