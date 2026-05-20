"use client";

import { useEffect, useId } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        opts: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "invisible";
          appearance?: "always" | "execute" | "interaction-only";
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        }
      ) => void;
      reset?: (id?: string) => void;
    };
  }
}

type Props = {
  siteKey: string;
  onToken: (token: string) => void;
  theme?: "light" | "dark" | "auto";
  appearance?: "always" | "execute" | "interaction-only";
  size?: "normal" | "compact" | "invisible";
  enabled?: boolean;
};

export default function Turnstile({
  siteKey,
  onToken,
  theme = "auto",
  appearance = "always",
  size = "normal",
  enabled = true,
}: Props) {
  const uid = useId();
  const containerId = `turnstile-container-${uid.replace(/[:]/g, "_")}`;
  useEffect(() => {
    if (!enabled) return;
    const scriptId = "cf-turnstile-script";
    if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }

    const container = document.getElementById(containerId);
    function render() {
      if (!window.turnstile || !container) return;
      window.turnstile.render(container, {
        sitekey: siteKey,
        theme,
        appearance,
        size,
        callback: (token) => onToken(token),
        "error-callback": () => onToken(""),
        "expired-callback": () => onToken(""),
      });
    }

    const interval = setInterval(() => {
      if (window.turnstile && container) {
        clearInterval(interval);
        render();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [siteKey, onToken, theme, appearance, size, enabled, containerId]);

  return (
    <div className="mt-2 min-h-[65px]">
      <div id={containerId} />
    </div>
  );
}
