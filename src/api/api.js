export const cosmeticsAPI = {
    getCosmetics() {
        const URL = "https://fortnite-api.com/v2/cosmetics/br";
        return fetch(URL, { method: 'GET' })
            .then(response => response.json());
    }
}

export const searchAPI = {
    getSearch(name) {
        const URL = `https://fortnite-api.com/v2/cosmetics/br/search/all?matchMethod=contains&name=${name}`
        return fetch(URL, { method: 'GET' })
            .then(response => response.json())
    }
}