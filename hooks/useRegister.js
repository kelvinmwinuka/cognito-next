
export default function useRegister() {

	const register = (values, { setSubmitting }) => {
		fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify(values)
		}).then(res => {
			if (!res.ok) throw res
		}).then(data => {
			console.log(data)
		}).catch(err => {
			console.error(err)
		}).finally(() => {
			setSubmitting(false)
		})
	}

	return {
		register
	}
}