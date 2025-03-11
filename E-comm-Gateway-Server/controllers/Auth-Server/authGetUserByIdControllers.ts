import { Request, Response } from 'express';
import { fetchAnotherServerWithoutBody } from '../../utils/FetchAnotherServer';

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "User id is required" });
            return;
        }
        const response = await fetchAnotherServerWithoutBody(`${process.env.AUTHSERVER}/api/auth/user/${id}`, 'GET');
        console.log(response);
        if ('status' in response) {
            const responseData = await response.json();
            res.status(response.status).json(responseData);
            return;
        } else {
            res.status(500).json({ message: "Error from auth server" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}