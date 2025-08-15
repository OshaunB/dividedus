// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPatchOptions } from "../utils/fetchingUtils";

const baseUrl = '/api/users';

export const getAllUsers = async () => {
  return await fetchHandler(baseUrl);
};

export const getUser = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`);
}

export const updateUsername = async ({ id, username }) => {
  return fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }))
}

// NEW: generic partial update (avatar_url, quote, etc.)
export const updateUser = async ({ id, ...updates }) => {
  // `updates` can include { avatar_url, quote, username, ... }
  return fetchHandler(`${baseUrl}/${id}`, getPatchOptions(updates));
};