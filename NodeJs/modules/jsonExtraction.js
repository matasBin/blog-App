const extractJsonFromMarkdown = (text) => {
    try {
        // First, try to parse the entire text as JSON
        try {
            return JSON.parse(text);
        } catch (e) {
            // If that fails, try to extract JSON from a code block
            const jsonRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
            const match = text.match(jsonRegex);

            if (match && match[1]) {
                // Found a code block, try to parse its content
                return JSON.parse(match[1].trim());
            } else {
                // No code block found, try to find a JSON object in the text
                const jsonObjectRegex = /({[\s\S]*?})/;
                const jsonMatch = text.match(jsonObjectRegex);

                if (jsonMatch && jsonMatch[1]) {
                    return JSON.parse(jsonMatch[1]);
                } else {
                    throw new Error("No valid JSON found in the response");
                }
            }
        }
    } catch (error) {
        console.error("Error extracting JSON from markdown:", error);
        throw error;
    }
};

module.exports = extractJsonFromMarkdown