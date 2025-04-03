export interface RootState {
    auth: {
        isAuthenticated: boolean;
        user: {
            id: string;
            [key: string]: any;
        } | null;
    };
} 