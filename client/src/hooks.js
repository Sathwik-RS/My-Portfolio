import { useEffect, useState } from 'react';
export function useApi(url, fallback = null) {
  const [data, setData] = useState(fallback);
  useEffect(() => {
    let live = true;
    fetch(url).then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => live && (Array.isArray(d) ? d.length : d) && setData(d)).catch(() => {});
    return () => { live = false; };
  }, [url]);
  return [data];
}
