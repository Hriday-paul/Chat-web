import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import UploadFileCload from '../../../Hooks/UploadFileCload/UploadFileCload';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase.init';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic/UseAxiosPublic';

type userStateType = {
    uId: string;
    name: string;
    email: string;
    photo: string;
    isAuthonicated: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: string | undefined;
}
type creatType = {
    name: string;
    password: string;
    email: string;
    photo: File[];
    phone: string;
}

type userReturnType = {
    uId: string;
    name: string;
    email: string;
    photo: string;
}

const initialState: userStateType = {
    uId: '',
    name: '',
    email: '',
    photo: '',
    isAuthonicated: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: ''
}

const creatUser = createAsyncThunk<userReturnType, creatType>('user/creatEmailPass', async ({ name, email, password, phone, photo }: creatType) => {

    const axiosPublic = UseAxiosPublic();

    const photoRes = await UploadFileCload(photo[0]);
    const { secure_url: photoSrc } = await photoRes.json();
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, {
        displayName: name,
        photoURL: photoSrc,
    });
    await axiosPublic.put('/addUser', { name: user.displayName, email: user.email, password, phone, photoUrl: photoSrc, uId: user.uid })

    return { name: user.displayName || '', email: user.email || '', photo: user.photoURL || '', uId: user.uid };
});

const creatWithGoogle = createAsyncThunk<userReturnType>('user/creatGoogle', async () => {
    const axiosPublic = UseAxiosPublic();
    const provider = new GoogleAuthProvider();

    const { user } = await signInWithPopup(auth, provider);
    const unKnownPhoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU'
    await axiosPublic.put('/addUser', { name: user.displayName, email: user.email, password: '', phone: '', photoUrl: user.photoURL || unKnownPhoto, uId: user.uid })

    return { name: user.displayName || '', email: user.email || '', photo: user.photoURL || unKnownPhoto, uId: user.uid };
});

const creatWithGithub = createAsyncThunk<userReturnType>('user/creatGithub', async () => {
    const axiosPublic = UseAxiosPublic();
    const gitProvider = new GithubAuthProvider();

    const { user } = await signInWithPopup(auth, gitProvider);
    const unKnownPhoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU'
    await axiosPublic.put('/addUser', { name: user.displayName, email: user.email, password: '', phone: '', photoUrl: user.photoURL || unKnownPhoto, uId: user.uid })

    return { name: user.displayName || '', email: user.email || '', photo: user.photoURL || unKnownPhoto, uId: user.uid };
});

const loginWithEmailPass = createAsyncThunk<userReturnType, { email: string; password: string }>('user/loginWithEmailPass', async ({ email, password }) => {

    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const unKnownPhoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU'

    return { name: user.displayName || '', email: user.email || '', photo: user.photoURL || unKnownPhoto, uId: user.uid };
});

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        addUser: (state, { payload }: PayloadAction<userReturnType>) => {
            state.uId = payload.uId;
            state.name = payload.name;
            state.email = payload.email;
            state.photo = payload.photo;
            state.isAuthonicated = true;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.error = '';
        },
        updateName : (state, { payload }: PayloadAction<{name : string}>)=>{
            state.name = payload.name
        },
        updatePhoto : (state, { payload }: PayloadAction<{photo : string}>)=>{
            state.photo = payload.photo
        },
        signOutUser: (state) => {
            state.uId = '';
            state.name = '';
            state.email = '';
            state.photo = '';
            state.isAuthonicated = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(creatUser.pending, (state) => {
                state.uId = '';
                state.name = '';
                state.email = '';
                state.photo = '';
                state.isAuthonicated = false;
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = '';
            })
            .addCase(creatUser.fulfilled, (state, { payload }: PayloadAction<userReturnType>) => {
                state.uId = payload.uId;
                state.name = payload.name;
                state.email = payload.email;
                state.photo = payload.photo;
                state.isAuthonicated = true;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.error = '';
            })
            .addCase(creatUser.rejected, (state, action) => {
                state.uId = '';
                state.name = '';
                state.email = '';
                state.photo = '';
                state.isAuthonicated = false;
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(creatWithGoogle.pending, (state) => {
                state.uId = '';
                state.name = '';
                state.email = '';
                state.photo = '';
                state.isAuthonicated = false;
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = '';
            })
            .addCase(creatWithGoogle.fulfilled, (state, { payload }: PayloadAction<userReturnType>) => {
                state.uId = payload.uId;
                state.name = payload.name;
                state.email = payload.email;
                state.photo = payload.photo;
                state.isAuthonicated = true;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.error = '';
            })
            .addCase(creatWithGoogle.rejected, (state, action) => {
                state.uId = '';
                state.name = '';
                state.email = '';
                state.photo = '';
                state.isAuthonicated = false;
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(creatWithGithub.pending, (state) => {
                state.uId = '';
                state.name = '';
                state.email = '';
                state.photo = '';
                state.isAuthonicated = false;
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = '';
            })
            .addCase(creatWithGithub.fulfilled, (state, { payload }: PayloadAction<userReturnType>) => {
                state.uId = payload.uId;
                state.name = payload.name;
                state.email = payload.email;
                state.photo = payload.photo;
                state.isAuthonicated = true;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.error = '';
            })
            .addCase(creatWithGithub.rejected, (state, action) => {
                state.uId = '';
                state.name = '';
                state.email = '';
                state.photo = '';
                state.isAuthonicated = false;
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(loginWithEmailPass.pending, (state) => {
                state.uId = '';
                state.name = '';
                state.email = '';
                state.photo = '';
                state.isAuthonicated = false;
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = '';
            })
            .addCase(loginWithEmailPass.fulfilled, (state, { payload }: PayloadAction<userReturnType>) => {
                state.uId = payload.uId;
                state.name = payload.name;
                state.email = payload.email;
                state.photo = payload.photo;
                state.isAuthonicated = true;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.error = '';
            })
            .addCase(loginWithEmailPass.rejected, (state, action) => {
                state.uId = '';
                state.name = '';
                state.email = '';
                state.photo = '';
                state.isAuthonicated = false;
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.error = action.error.message;
            })
    }
})

export { creatUser, creatWithGoogle, creatWithGithub, loginWithEmailPass };

export const { addUser, signOutUser, updateName, updatePhoto } = userSlice.actions
export default userSlice.reducer;

