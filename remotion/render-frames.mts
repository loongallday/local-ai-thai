import { bundle } from "@remotion/bundler";
import { renderFrames, selectComposition } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function renderComp(bundled: string, id: string, outputDir: string) {
  const composition = await selectComposition({ serveUrl: bundled, id });
  console.log(`Rendering ${id}: ${composition.durationInFrames} frames at ${composition.width}x${composition.height}...`);

  await renderFrames({
    composition,
    serveUrl: bundled,
    outputDir,
    imageFormat: "jpeg",
    jpegQuality: 90,
    onFrameUpdate: (frame: number) => {
      if (frame % 60 === 0) console.log(`  ${id}: ${frame}/${composition.durationInFrames}`);
    },
  });

  console.log(`  ${id} done → ${outputDir}`);
}

async function main() {
  console.log("Bundling...");
  const bundled = await bundle({
    entryPoint: path.resolve(__dirname, "./index.ts"),
    webpackOverride: (config) => config,
  });

  await renderComp(bundled, "NeuralVideo", path.resolve(__dirname, "../public/frames"));
  await renderComp(bundled, "NeuralVideoMobile", path.resolve(__dirname, "../public/frames-mobile"));
}

main().catch((err) => { console.error(err); process.exit(1); });
