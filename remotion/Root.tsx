import { Composition } from "remotion";
import { NeuralVideo } from "./NeuralVideo";
import { NeuralVideoMobile } from "./NeuralVideoMobile";

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
    </>
  );
};
