import { createContext, useEffect, useReducer, useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../utils/interfaces/user';
import { usersService } from '../services/users.service';
import { ResponseErrorRequest } from '../../shared/interfaces/content';
import { petsService } from '../services/pets.service';

interface State {
    isInitialized: boolean;
    isAuthenticated: boolean;
    user: any;
}

// eslint-disable-next-line no-unused-vars
enum ActionType {
    // eslint-disable-next-line no-unused-vars
    INITIALIZE = 'INITIALIZE',
    // eslint-disable-next-line no-unused-vars
    LOGIN = 'LOGIN',
    // eslint-disable-next-line no-unused-vars
    LOGOUT = 'LOGOUT',
}

type InitializeAction = {
    type: ActionType.INITIALIZE;
    payload: {
        isAuthenticated: boolean;
        user: any;
    };
};

type LoginAction = {
    type: ActionType.LOGIN;
    payload: {
        user: any;
    };
};

type LogoutAction = {
    type: ActionType.LOGOUT;
};

type Action = InitializeAction | LoginAction | LogoutAction;

// eslint-disable-next-line no-unused-vars
type Handler = (state: State, action: any) => State;

const initialState: State = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
};

const handlers: Record<ActionType, Handler> = {
    INITIALIZE: (state: State, action: InitializeAction): State => {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },
    LOGIN: (state: State, action: LoginAction): State => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
    LOGOUT: (state: State): State => ({
        ...state,
        isAuthenticated: false,
        user: null,
    }),
};

const reducer = (state: State, action: Action): State =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

export interface AuthContextValue extends State {
    // eslint-disable-next-line no-unused-vars
    login: (email: string, password: string) => Promise<ResponseErrorRequest>;
    signup: (email: string, password: string, passwordConfirmation:string) => Promise<ResponseErrorRequest>;
    logout: () => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    getPet: (userId: string) => Promise<ResponseErrorRequest>;
    //setPet: (userId: string, pet: any) => Promise<ResponseErrorRequest>;
    updateUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextValue>({
    ...initialState,
    login: () => Promise.resolve({} as ResponseErrorRequest),
    signup: () => Promise.resolve({} as ResponseErrorRequest),
    logout: () => Promise.resolve(),
    getPet: () => Promise.resolve({} as ResponseErrorRequest),
    //setPet: () => Promise.resolve({} as ResponseErrorRequest),
    updateUser: () => Promise.resolve(),
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    const initialize = useCallback(async (): Promise<void> => {
        try {
            const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
            const userConnected = await AsyncStorage.getItem('USER');
            if (accessToken != null && userConnected != null) {
                dispatch({
                    type: ActionType.INITIALIZE,
                    payload: {
                        isAuthenticated: true,
                        user: userConnected,
                    },
                });
            } else {
                dispatch({
                    type: ActionType.INITIALIZE,
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        } catch (err) {
            dispatch({
                type: ActionType.INITIALIZE,
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    }, [dispatch]);

    useEffect(() => {
        initialize();
    }, []);

    const login = useCallback(async (email: string, password: string): Promise<ResponseErrorRequest> => {
        return await usersService.logIn({ email, password });
    }, [dispatch]);
    
      
    const signup = useCallback(async (email: string, password: string, passwordConfirmation: string): Promise<ResponseErrorRequest> => {
        return await usersService.signUp({ email, password, passwordConfirmation });
    }, []);

    const getPet = useCallback(async (userId: string): Promise<ResponseErrorRequest> => {
        return await petsService.getPet(userId);
    }, [dispatch]);
    
    /*
    const setPet = useCallback(async (email: string, password: string, passwordConfirmation: string): Promise<ResponseErrorRequest> => {
        return await petsService.signUp({ email, password, passwordConfirmation });
    }, []);
    */
    const logout = useCallback(async (): Promise<void> => {
        AsyncStorage.removeItem('ACCESS_TOKEN');
        AsyncStorage.removeItem('USER');
        dispatch({ type: ActionType.LOGOUT });
    }, [dispatch]);

    const updateUser = useCallback(
        (user: User | null) => {
            dispatch({
                type: ActionType.INITIALIZE,
                payload: {
                    isAuthenticated: user !== null,
                    user,
                },
            });
        },
        [dispatch],
    );

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                signup,
                logout,
                updateUser, 
                //setPet, 
                getPet
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
