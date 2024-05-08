import { useEffect, useRef, useState } from 'react';
import wasmInit from 'wasm-lib';

export const useWasm = () => {
  const isLoading = useRef(false);
  const instanceRef = useRef<InitOutput>(null);
  const [loading, setLoading] = useState(isLoading.current);
  const [instance, setInstance] = useState(instanceRef.current);
  useEffect(() => {
    isLoading.current = true;
    wasmInit().then((instance) => {
      isLoading.current = false;
      instanceRef.current = instance;
      setLoading(isLoading.current);
      setInstance(instanceRef.current);
    });
  }, []);

  return { loading, wasm: instance };
};
