import { useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

import ErrorMessage from "../components/ErrorMessage";
import UserMessage from "../components/UserMessage";
import BotMessage from "../components/BotMessage";
import SessionShell from "../components/SessionShell";
import { z } from "zod";
import { DEFAULT_CHAT_MODEL_ID } from "@nightcode/shared";

import { useToast } from "../providers/ToastProvider";
import { apiClient } from "../lib/api-client";
import { getErrorMessage } from "../lib/http-errors";

const newSessionsStateSchema = z.object({
	message: z.string(),
});
const index = () => {
	const navig = useNavigate();
	const location = useLocation();
	const toast = useToast();

	const state = useMemo(() => {
		return newSessionsStateSchema.safeParse(location.state);
	}, [location.state]);

	useEffect(() => {
		if (!state?.data.message) {
			navig("/", { replace: true });
		}
	}, [state, navig]);

	if (!state) return null;

	return (
		<SessionShell onSubmit={() => { }} inputDisabled loading>
			<UserMessage message={state.message} />
		</SessionShell>
	);
};

export default index;
