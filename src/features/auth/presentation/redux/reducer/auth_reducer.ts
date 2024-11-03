import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState, initialAuthState} from "../state/auth_state";
import {getUserThunk, signInThunk, signUpThunk} from "../action/auth_actions";
import {Failure} from "../../../../../core/error/failure";

// Helper function to handle pending state
const handlePending = (state: AuthState) => {
    state.status = 'loading';
    state.error = null;
};

// Helper function to handle rejected state
const handleRejected = (state: AuthState, action: any, errorMessage: string) => {
    state.status = 'failed';
    state.error = new Failure(action.payload.message) || errorMessage;
};


const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setField: (state, action: PayloadAction<{ field: string; value: string }>) => {
            (state as any)[action.payload.field] = action.payload.value;
        },
        resetStatus: (state) => {
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Sign In
            .addCase(signInThunk.pending, handlePending)
            .addCase(signInThunk.fulfilled, (state: AuthState, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(signInThunk.rejected, (state: AuthState, action) =>
                handleRejected(state, action, "Failed to login")
            )
            // Sign up
            .addCase(signUpThunk.pending, handlePending)
            .addCase(signUpThunk.fulfilled, (state: AuthState, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(signUpThunk.rejected, (state: AuthState, action) =>
                handleRejected(state, action, "Failed to register")
            )
            // Get Current User
            .addCase(getUserThunk.pending, handlePending)
            .addCase(getUserThunk.fulfilled, (state: AuthState, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(getUserThunk.rejected, (state: AuthState, action) => {
                handleRejected(state, action, "User not logged in")
            });
    }
});

export const {setField, resetStatus} = authSlice.actions;

export default authSlice.reducer;