# Premium Interactive Calendar

A highly physical, hyper-realistic interactive web calendar component built with Next.js, React, and Tailwind CSS.

## Features & Innovations

1.  **Thematic Synesthesia Engine:** The calendar algorithmically swaps high-resolution hero imagery and UI color palettes (across highlights, geometric swooshes, and grid text) based on the active month, crossfading seamlessly.
2.  **3D Physical Lighting & Shadows:** The component wrapper acts as a physical wall-mounted object inside a simulated 3D gallery environment. It includes:
    *   A massive radial background gradient to establish a top-left light source.
    *   A triple-layered, physics-based object shadow (Ambient Occlusion, Cast Shadow, Diffusion).
    *   Hyper-realistic metallic twin-loop wire bindings computing correct specular highlights.
3.  **Hardware-Accelerated Page Tear:** Bypassing standard "snap" state changes in favor of a 400ms CSS 3D keyframe animation that tangibly rips the previous month away downwards on the Z-axis.
4.  **Contextual Micro-Journal Nodes:** Typings captured in the Notes section actively trigger a glowing telemetry dot on the grid's selected date, turning the visual matrix into a spatial journal map.

## Architectural Choices

*   **HTML Compositing > CSS Masks:** Instead of using messy `clip-path` properties for the angled hero image (which destroys responsive typography boundaries), we heavily utilized CSS absolute stacking properties to layer complex SVG bezier shapes.
*   **Decoupled Logic:** `date-fns` completely engines the temporal mathematics (leap years, padding bounds, active states). The `DateGrid` strictly acts as a rendering vehicle for `date-fns` boundaries. 
*   **Absolute Hydration Safety:** The entire visual wrapper mounts behind a `useEffect` hydration block and the Next.js `layout.tsx` specifically suppresses browser-extension tag mutation errors, guaranteeing SSR/CSR identical alignment.

## 💻 Running the Project Locally

**Prerequisites:** Ensure you have Node.js 18+ installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hari715om/tuf-calendar.git
   cd tuf-calendar
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **View the Application:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the calendar simulation running natively.
