import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from '../../../Hooks/UseAxiosPublic/UseAxiosPublic';
import { messageType } from '../../../Components/Ui/ChatBoxMessages/ChatBoxMessages';

export interface userType {
    name: string;
    email: string;
    photoUrl: string;
    phone: string;
    _id: string;
}

type usrSResType = {
    friends: userType[]
    hasMore : boolean
}

type mydataType = {
    name: string;
    photoUrl: string;
    phone: string;
    password : string;
    _id: string;
}

type responsemsg = {
    messages : messageType[];
    hasMore : boolean
}

const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: ['myInfo'],
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    endpoints: (builder) => ({
        getFriends: builder.query<usrSResType, {dataCount : number; my : string}>({
            query: ({dataCount, my}) => `/users/?dataCount=${dataCount}&i=${my}`,
        }),
        getFriendsDetails: builder.query<userType, string>({
            query: (id) => `/user/${id}`,
        }),
        getMessages: builder.query<responsemsg, {m : string; f : string; limit : number}>({
            query: ({m, f, limit}) => `/messages?m=${m}&f=${f}&limit=${limit}`,
        }),
        getMyInfo : builder.query<mydataType, {email : string}>({
            query: ({email}) => `/myInfo/${email}`,
            providesTags: ['myInfo']
        }),
        gerSearchUser : builder.query<userType[], {searchTxt : string, me: string}>({
            query: ({searchTxt, me}) => `/searchUsers?searchTxt=${searchTxt}&me=${me}`,
        }),
        addOrUpdateUser: builder.mutation({
            query: (updatedData) => ({
                url: '/updateUser',
                method: 'PUT',
                body: updatedData
            }),
            invalidatesTags: ['myInfo']
        }),
    })
});

export const { useGetFriendsQuery, useGetFriendsDetailsQuery, useGetMessagesQuery, useGetMyInfoQuery, useAddOrUpdateUserMutation, useGerSearchUserQuery } = baseApi;
export default baseApi;