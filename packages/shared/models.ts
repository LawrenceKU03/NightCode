export type ModelPricing = {
	inputUsdPerMillionTokens: number;
	outputUsdPerMillionTokens: number;
};

export type SupportedProvider = "anthropic" | "openai";

export type SupportedChatModelDefinition = {
	id: string;
	provider: SupportedProvider;
	pricing: ModelPricing;
};

export const SUPPORTED_CHAT_MODELS: SupportedChatModelDefinition[] = [
	{
		id: "claude-sonnet-4-6",
		provider: "anthropic",
		pricing: {
			inputUsdPerMillionTokens: 3,
			outputUsdPerMillionTokens: 15,
		},
	},
	{
		id: "claude-haiku-4-5",
		provider: "anthropic",
		pricing: {
			inputUsdPerMillionTokens: 1,
			outputUsdPerMillionTokens: 5,
		},
	},
	{
		id: "claude-opus-4-7",
		provider: "anthropic",
		pricing: {
			inputUsdPerMillionTokens: 5,
			outputUsdPerMillionTokens: 25,
		},
	},
	{
		id: "gpt-4.1",
		provider: "openai",
		pricing: {
			inputUsdPerMillionTokens: 2,
			outputUsdPerMillionTokens: 8,
		},
	},
	{
		id: "gpt-4.1-mini",
		provider: "openai",
		pricing: {
			inputUsdPerMillionTokens: 0.4,
			outputUsdPerMillionTokens: 1.6,
		},
	},
	{
		id: "gpt-4o-mini",
		provider: "openai",
		pricing: {
			inputUsdPerMillionTokens: 0.15,
			outputUsdPerMillionTokens: 0.6,
		},
	},
];

export type SupportedChatModel = (typeof SUPPORTED_CHAT_MODELS)[number];
export type SupportedChatModelId = SupportedChatModel["id"];

export const findSupportedChatModel = (modelId: string) => {
	return SUPPORTED_CHAT_MODELS.filter((model) => model.id == modelId);
};

export const DEFAULT_CHAT_MODEL_ID: supportedChatModelId = "claude-opus-4-7";
