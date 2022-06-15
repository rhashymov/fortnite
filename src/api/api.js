export const cosmeticsAPI = {
    getCosmetics() {
        const URL = "https://fortnite-api.com/v2/cosmetics/br";
        return fetch(URL, { method: 'GET' })
            .then(response => response.json());
    }
}