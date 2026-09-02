import { Composition } from "remotion";
import { NeuralVideo } from "./NeuralVideo";
import { NeuralVideoMobile } from "./NeuralVideoMobile";
import { JarvisLoop } from "./JarvisLoop";
import { MimirIntro, MIMIR_INTRO_FRAMES, MIMIR_INTRO_FPS } from "./MimirIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NeuralVideo"
        component={NeuralVideo}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="NeuralVideoMobile"
        component={NeuralVideoMobile}
        durationInFrames={180}
        fps={30}
        width={780}
        height={1400}
      />
      <Composition
        id="JarvisLoop"
        component={JarvisLoop}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MimirIntro"
        component={MimirIntro}
        // authored in 30-fps units, sampled at 60 — same 59.7s (see MimirUI's FPS_SCALE)
        durationInFrames={MIMIR_INTRO_FRAMES * (MIMIR_INTRO_FPS / 30)}
        fps={MIMIR_INTRO_FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
