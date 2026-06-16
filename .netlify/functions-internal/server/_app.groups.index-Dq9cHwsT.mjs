import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as objectType, o as stringType } from "./_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.groups.index-Dq9cHwsT.js
var $$splitComponentImporter = () => import("./_app.groups.index-CUOPRGNU.mjs");
var Route = createFileRoute("/_app/groups/")({
	validateSearch: (search) => ({ new: search.new === "true" || search.new === true }),
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
objectType({
	name: stringType().trim().min(2, "Required").max(80),
	description: stringType().max(300).optional(),
	location: stringType().max(120).optional(),
	startDate: stringType().optional(),
	endDate: stringType().optional()
});
//#endregion
export { Route as t };
