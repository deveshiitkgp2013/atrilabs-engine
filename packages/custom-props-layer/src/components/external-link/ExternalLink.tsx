import { ComponentProps } from "../../types";
import { useMemo, useCallback } from "react";
import { createObject } from "../../utility/Utility";

export const ExternalLink: React.FC<ComponentProps> = (props) => {
  const selector = useMemo(() => {
    return props.selector || [];
  }, [props]);
  const propValue = useMemo(() => {
    let currentValue = props.customProps;
    for (let prop of selector) {
      currentValue = currentValue[prop];
    }
    return currentValue;
  }, [props, selector]);
  const callPatchCb = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.patchCb({
        property: {
          custom: createObject(selector, e.target.value),
        },
      });
    },
    [props, selector]
  );

  return (
    <div>
      <div style={{ color: "white" }}>{props.propName}</div>
      <input value={propValue} onChange={callPatchCb} />
    </div>
  );
};
