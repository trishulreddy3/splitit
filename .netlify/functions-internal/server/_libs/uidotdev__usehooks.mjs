import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "./@floating-ui/react-dom+[...].mjs";
//#region node_modules/@uidotdev/usehooks/index.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = import_react.useState(value);
	import_react.useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);
	return debouncedValue;
}
//#endregion
export { useDebounce as t };
