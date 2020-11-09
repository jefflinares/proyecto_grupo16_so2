export const Base= (domain) => (resource) => {
    const URL = `${domain}/${resource}`;

    return {
        get: async () => {
            try {
                const response = await fetch(URL);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
            }
        },
    };
};
