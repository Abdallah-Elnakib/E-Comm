
interface EmailValidationResponse {
    deliverability: string;
}

export const checkMail = async (email: string): Promise<string> => {
    try {
        const response = await fetch(`${process.env.VALIDATION_EMAIL_API_KEY}${email}`);
        const data: EmailValidationResponse = await response.json();
        if (data.deliverability === 'UNDELIVERABLE') {
            return 'UNDELIVERABLE';
        } else if (data.deliverability === 'DELIVERABLE') {
            return 'DELIVERABLE';
        } else {
            return 'UNKNOWN';
        }
    } catch (error) {
        console.error('Error fetching email validation:', error);
        throw new Error('Email validation failed');
    }
};