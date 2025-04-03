export const generateUUID = () => {
    // Generate a random UUID v4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// Generate a shorter 12-character unique ID
export const generateShortUUID = () => {
    return Math.random().toString(36).substring(2, 14).toUpperCase();
}; 