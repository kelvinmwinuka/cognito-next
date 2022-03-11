
export default function handler(req, res) {
	if (!['POST'].includes(req.method)) {
		return res.status(400).json({ message: 'Method not allowed' })
	}
	res.status(200).json({ name: 'John Doe' })
}