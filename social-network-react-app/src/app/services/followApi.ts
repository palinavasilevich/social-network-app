import { api } from "./api";

export const followApi = api.injectEndpoints({
  endpoints: builder => ({
    subscribeUser: builder.mutation<void, { followingId: string }>({
      query: body => ({
        url: "/subscribe",
        method: "POST",
        body,
      }),
    }),

    unsubscribeUser: builder.mutation<void, string>({
      query: userId => ({
        url: `/unsubscribe/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useSubscribeUserMutation, useUnsubscribeUserMutation } =
  followApi;

export const {
  endpoints: { subscribeUser, unsubscribeUser },
} = followApi;
