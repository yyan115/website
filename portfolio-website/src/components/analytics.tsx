"use client";

import { useEffect } from "react";
import * as Fathom from "fathom-client";

export function Analytics(): JSX.Element {
  useEffect(() => {
    // Replace with your Fathom site ID
    Fathom.load("XXXXXXXX", {
      includedDomains: ["yourdomain.com"],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    // Record a pageview when route changes
    window.addEventListener("hashchange", onRouteChangeComplete);

    // Unload when the component unmounts
    return () => {
      window.removeEventListener("hashchange", onRouteChangeComplete);
    };
  }, []);

  return <></>;
}