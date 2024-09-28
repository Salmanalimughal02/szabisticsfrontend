import { Button, Input } from "reactstrap";
import { Apply, UnlimitedColor } from "../../../../../utils/Constant";
import { H6, UL } from "../../../../../AbstractElements";
import { useAppDispatch, useAppSelector } from "../../../../../ReaduxToolkit/Hooks";
import { useEffect } from "react";
import { setColorBackground1, setColorBackground2, setOpenCus } from "../../../../../ReaduxToolkit/Reducer/ThemeCustomizerSlice";
import ConfigDB from "../../../../../Config/ThemeConfig";

const ColorComponent = () => {
  const {colorBackground1,colorBackground2} = useAppSelector((state)=>state.themeCustomizer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.documentElement.style.setProperty("--theme-default", colorBackground1);
    document.documentElement.style.setProperty("--theme-secondary", colorBackground2);
    ConfigDB.data.color.primary_color = colorBackground1;
    ConfigDB.data.color.secondary_color = colorBackground2;
  }, []);

  const addColor = (default_color: string, secondary_color: string) => {
    ConfigDB.data.color.primary_color = default_color;
    ConfigDB.data.color.secondary_color = secondary_color;
  };

  const handleUnlimatedColor1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setColorBackground1(value));
  };

  const handleUnlimatedColor2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setColorBackground2(value));
  };

  const OnUnlimatedColorClick = () => {
    addColor(colorBackground1, colorBackground2);
    document.documentElement.style.setProperty("--theme-default", colorBackground1);
    document.documentElement.style.setProperty("--theme-secondary", colorBackground2);
    dispatch(setOpenCus(false))
  };
  return (
    <>
      <H6>{UnlimitedColor}</H6>
      <UL className="simple-list flex-row layout-grid unlimited-color-layout">
        <Input className="p-0" type="color" name="Color-Background1" value={colorBackground1} onChange={(e) => handleUnlimatedColor1Change(e)}/>
        <Input className="p-0" type="color" name="Color-Background2" value={colorBackground2} onChange={(e) => handleUnlimatedColor2Change(e)}/>
        <Button color="primary" className="color-apply-btn color-apply-btn" onClick={OnUnlimatedColorClick}>
          {Apply}
        </Button>
      </UL>
    </>
  );
};

export default ColorComponent;
