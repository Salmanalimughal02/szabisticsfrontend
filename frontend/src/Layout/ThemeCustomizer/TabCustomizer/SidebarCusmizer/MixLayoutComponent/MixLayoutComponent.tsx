import { Mix_Layout } from "../../../../../utils/Constant";
import { H6, UL } from "../../../../../AbstractElements";
import BgLight from "./BgLight";
import BgDark from "./BgDark";
import { useAppDispatch } from "../../../../../ReaduxToolkit/Hooks";
import { setMixBackgroundLayout } from "../../../../../ReaduxToolkit/Reducer/ThemeCustomizerSlice";
import ConfigDB from "../../../../../Config/ThemeConfig";

const MixLayoutComponent = () => {
  const dispatch = useAppDispatch();
  const mixLayout = ConfigDB.data.color.mix_background_layout;

  const addMixBackgroundLayout = (mix_background_layout: string) => {
    ConfigDB.data.color.mix_background_layout = mix_background_layout;
    dispatch(setMixBackgroundLayout(mix_background_layout));
  };

  const handleCustomizerMix_Background = (value: string) => {
    addMixBackgroundLayout(value);
    if (value === "light") {
      document.body.classList.add("light");
      document.body.classList.remove("dark-only");
    } else if (value === "dark-only") {
      document.body.classList.remove("light");
      document.body.classList.add("dark-only");
    }
  };
  return (
    <>
      <H6>{Mix_Layout}</H6>
      <UL className="layout-grid customizer-mix flex-row simple-list">
        <BgLight mixLayout={mixLayout} handleCustomizerMix_Background={handleCustomizerMix_Background}/>
        <BgDark mixLayout={mixLayout} handleCustomizerMix_Background={handleCustomizerMix_Background}/>
      </UL>
    </>
  );
};

export default MixLayoutComponent;
