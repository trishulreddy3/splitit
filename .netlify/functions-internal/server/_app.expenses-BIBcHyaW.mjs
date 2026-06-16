import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.expenses-BIBcHyaW.js
var $$splitComponentImporter = () => import("./_app.expenses-BlMADAkX.mjs");
var Route = createFileRoute("/_app/expenses")({
	validateSearch: (search) => ({ new: search.new === "true" || search.new === true }),
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
