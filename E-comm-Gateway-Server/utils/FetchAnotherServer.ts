
export const fetchAnotherServer = async (url: string, method: string, body: any) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        
        return response;
        
    } catch (error) {
        console.error(error);
        return { message: 'Internal server error' };
    }
};


export const fetchAnotherServerWithoutBody = async (url: string, method: string) => {
    try {
        const response = await fetch(url, {
            method,
        });
        
        return response;
        
    } catch (error) {
        console.error(error);
        return { message: 'Internal server error' };
    }
};
