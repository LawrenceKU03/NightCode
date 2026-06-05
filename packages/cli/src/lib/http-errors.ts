type ErrorResponse = {
	json: () => Promise<unknown>;
	status: number;
	statusText: string;
};

export async function getErrorMessage(error: ErrorResponse) {
	try {
		const data = (await error.json()) as { error?: string };
		if (typeof data.error === "string" && data.error.length > 0) {
			return data.error;
		}
	} catch {}

	return error.statusText || `Request failed with status ${error.status}`;
}
