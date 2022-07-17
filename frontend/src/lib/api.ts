export const fetchApi = async (
  endpoint: string,
  csrfToken: string | null,
  options?: RequestInit
): Promise<Response> => {
  const defaultOptions = { ...options };

  if (csrfToken) {
    defaultOptions.headers = {
      "X-CSRFToken": csrfToken,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...defaultOptions.headers,
    };
  }
  defaultOptions.credentials = "include";
  return await fetch("http://localhost:3000/api/" + endpoint, defaultOptions);
};

export const formatApiErrors = (data: Object): Array<string> => {
  const messages: Array<string> = [];
  for (let [key, value] of Object.entries(data)) {
    messages.push(
      `${key !== "detail" ? `${key}: ` : ""}${
        Array.isArray(value) ? value.join(", ") : value
      }`
    );
  }
  return messages;
};
