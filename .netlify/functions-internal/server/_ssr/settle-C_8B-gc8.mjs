//#region node_modules/.nitro/vite/services/ssr/assets/settle-C_8B-gc8.js
function formatCurrency(amount, currency = "INR") {
	try {
		return new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency,
			maximumFractionDigits: 2
		}).format(amount);
	} catch {
		return `${currency} ${amount.toFixed(2)}`;
	}
}
//#endregion
export { formatCurrency as t };
