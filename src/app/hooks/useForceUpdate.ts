import { useState, useCallback } from "react";

function useForceUpdate() {
  const [value, setValue] = useState(0);
  const forceUpdate = useCallback(() => setValue((prev) => prev + 1), []);
  return forceUpdate;
}

export default useForceUpdate;