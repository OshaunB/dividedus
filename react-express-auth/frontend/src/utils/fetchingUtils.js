// frontend/src/utils/fetchingUtils.js

export const basicFetchOptions = {
  method: "GET",
  credentials: "include",
};

export const deleteOptions = {
  method: "DELETE",
  credentials: "include",
};

export const getPostOptions = (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const getPutOptions = (body) => ({
  method: "PUT",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

// Important: only send headers/body if there's something to patch
export const getPatchOptions = (body = undefined) => {
  const hasBody = body && Object.keys(body).length > 0;
  const base = { method: "PATCH", credentials: "include" };
  return hasBody
    ? {
        ...base,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    : base;
};

export const fetchHandler = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    // Read once to avoid body stream issues
    const text = await res.text();
    const data = text ? (isJson ? JSON.parse(text) : text) : null;

    if (!res.ok) {
      const msg =
        (isJson && data && (data.error || data.message)) ||
        `Fetch failed with status - ${res.status}`;
      return [null, msg];
    }

    return [data, null];
  } catch (err) {
    return [null, err?.message || "Request failed"];
  }
};
