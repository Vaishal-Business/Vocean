"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function Home() {
  useEffect(() => {
    const aboutBtn = document.getElementById("btn-about");
    const aboutMenu = document.getElementById("about-menu");

    const onAboutClick = (e: Event) => {
      e.stopPropagation();
      const isOpen = aboutMenu?.classList.contains("show");
      if (!aboutMenu || !aboutBtn) return;
      aboutMenu.classList.toggle("show", !isOpen);
      aboutBtn.classList.toggle("pressed", !isOpen);
    };

    const onDocClick = (e: MouseEvent) => {
      if (!aboutMenu || !aboutBtn) return;
      if (!aboutMenu.contains(e.target as Node) && !aboutBtn.contains(e.target as Node)) {
        aboutMenu.classList.remove("show");
        aboutBtn.classList.remove("pressed");
      }
    };

    aboutBtn?.addEventListener("click", onAboutClick);
    document.addEventListener("click", onDocClick);

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => undefined);
      });
    }

    return () => {
      aboutBtn?.removeEventListener("click", onAboutClick);
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  return (
    <>
      <video id="videoInput" playsInline muted style={{ display: "none" }} />
      <div id="monitor-window" className="win-outset">
        <div id="main-content">
          <div id="vis-col">
            <div id="psd-frame" className="win-inset">
              <canvas id="psdCanvas" />
            </div>
            <div id="nn-frame">
              <div className="layer-tabs">
                <div className="layer-btn active" data-layer="0">SSM1</div>
                <div className="layer-btn" data-layer="1">SSM2</div>
                <div className="layer-btn" data-layer="2">SSM3</div>
                <div className="layer-btn" data-layer="3">SSM4</div>
                <div className="layer-btn" data-layer="4">PROJ</div>
              </div>
              <div id="nn-grid" className="win-inset">
                <div className="grid-cell"><span className="cell-label">ROI</span><canvas id="cropDisplayCanvas" /></div>
                <div className="grid-cell"><span className="cell-label">ATTN</span><canvas id="heatmapCanvas" /></div>
                <div className="grid-cell full-width"><span className="cell-label">Heart State</span><canvas id="trajCanvas" /></div>
              </div>
            </div>
          </div>
          <div id="monitor-col">
            <div id="stats-group" className="win-inset">
              {[
                ["HR (BPM)", "hrVal", "--"],
                ["SQI", "sqiVal", "0.00"],
                ["Latency", "latencyVal", "0.0"],
                ["FPS", "fpsVal", "0"],
                ["Frame", "frameVal", "0"]
              ].map(([label, id, value]) => (
                <div className="stat-item" key={id}>
                  <span className="stat-label">{label}</span>
                  <div className="stat-value-box"><span id={id} className="stat-val">{value}</span></div>
                </div>
              ))}
            </div>
            <div id="video-frame" className="win-inset">
              <canvas id="previewCanvas" className="display-layer" />
              <canvas id="overlayCanvas" className="display-layer" />
            </div>
            <div id="wave-frame" className="win-inset">
              <button id="largeStartBtn" disabled>Loading System...</button>
              <canvas id="plotCanvas" />
            </div>
          </div>
        </div>
      </div>
      <div id="bottom-bar" className="win-outset">
        <div id="trend-wrapper">
          <div className="trend-y-axis">
            <span className="axis-label" style={{ bottom: "71.4%" }}>140</span>
            <span className="axis-label" style={{ bottom: "42.8%" }}>100</span>
            <span className="axis-label" style={{ bottom: "14.2%" }}>60</span>
          </div>
          <div id="trend-container" className="win-inset">
            <span id="trend-title">HR TREND</span>
            <canvas id="trendCanvas" />
          </div>
        </div>
        <div id="save-container">
          <button id="saveBtn"><span>SAVE</span><span style={{ fontSize: "10px", fontWeight: "normal" }}>(.ZIP)</span></button>
        </div>
      </div>
      <Script src="/main.js" type="module" strategy="afterInteractive" />
    </>
  );
}
