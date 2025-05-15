export const day = (date) => {
    return new Date(new Date().setDate(new Date().getDate() - (date || 1))).toISOString().split('T')[0];
}