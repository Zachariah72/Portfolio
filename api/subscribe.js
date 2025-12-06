export default function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;
        if (email) {
            // Here you can add logic to save the email to a database or send a confirmation
            console.log('New subscription:', email);
            res.status(200).json({ message: 'Subscribed successfully!' });
        } else {
            res.status(400).json({ message: 'Email is required' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}