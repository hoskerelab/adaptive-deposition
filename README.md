# From Particles to Precision

A static research website on real-time adaptive robotic deposition, featuring Muhammad Arslan, Joshua Genova, and Vedhus Hoskere. The design uses a white background, Inter for body text, and Source Serif 4 for display headings.

## Publish on GitHub Pages

1. Extract the ZIP and upload **its contents** to the root of a GitHub repository. Keep `index.html`, `styles.css`, `script.js`, and the `assets/` folder at the repository root.
2. Open **Settings > Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
3. Open `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

No build step is required. All images and MP4 clips are stored locally in the repository. Inter and Source Serif 4 load from Google Fonts, while KaTeX loads from a public CDN to typeset the equations. The site remains readable with local fallback fonts if a font service is unavailable.

## Behavior

Videos are muted and loop automatically while at least 28% visible in the viewport. Playback pauses when a video leaves view or the browser tab is hidden. Visitors with **Reduce Motion** enabled see paused videos and can play them using the video controls. Other visitors see muted autoplay as the clips enter view.

Six embedded clips show DEM simulation, fixed-parameter printing, adaptive printing, single-gap repair, double-gap repair, and crack filling. All media use relative paths so the website works under a GitHub Pages project URL.

## Research scope and citations

**Arslan, M., Mangi, A. W., and Hoskere, V. (2026).** "Real-Time Adaptive Control with Continual Learning for Robotic Construction 3D Printing." *Journal of Computing in Civil Engineering*, ASCE, accepted for publication. DOI: `10.1061/JCCEE5.CPENG-8585`. **Paper coming soon.**

**Genova, J. T., and Hoskere, V. (2026).** "Real-Time Vision-Based Adaptive Robotics for Autonomous Crack Repair in Civil Infrastructure." *Journal of Computing in Civil Engineering*, ASCE, accepted for publication. DOI: `10.1061/JCCEE5.CPENG-7737`. **Paper coming soon.** [Crack-repair project](https://jtgenova.github.io/robotic-crack-repair/).

Arslan's controller uses a discrete element method (DEM) model for offline reinforcement-learning training, then an online IELM predictor and constrained MPC for segment-wise geometric control. The separate mortar-gap repair experiment uses a calibrated deposition model and an offline-trained residual correction. Joshua's system uses an experimentally calibrated model and online, lag-aligned laser feedback; it does not use DEM. All reported performance metrics describe the particular evaluated physical experiments and geometric measurements.

Publication DOI identifiers are shown as non-clickable text until publisher landing pages become active. Figures and videos come from the supplied slides, dissertation, and project materials.

## Editing

- Update the content and citation text in `index.html`.
- Adjust the appearance in `styles.css`.
- Adjust video visibility thresholds and the experimental chart toggle in `script.js`.

To preview locally, open `index.html` or serve the folder with `python -m http.server 8000`.
