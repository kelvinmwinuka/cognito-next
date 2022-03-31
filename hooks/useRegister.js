
export default function useRegister() {

	const register = (values, { setSubmitting }) => {
		fetch('/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
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

	const confirm = (values, setSubmitting) => {
		fetch('/api/confirm', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
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
		register,
		confirm
	}
}