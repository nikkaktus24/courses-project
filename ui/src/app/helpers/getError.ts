export default function getError(error: any): string {
    return error && error.response ? error.response.data : null;
}