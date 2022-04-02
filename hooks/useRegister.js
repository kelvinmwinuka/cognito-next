import { useRouter } from 'next/router'

export default function useRegister() {

	const router = useRouter()

	const register = (values, { setSubmitting }) => {
		fetch('/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(values)
		}).then(res => {
			if (!res.ok) throw res
			router.push({
				pathname: '/confirm',
				query: { username: values?.username }
			})
		}).catch(err => {
			console.error(err)
		}).finally(() => {
			setSubmitting(false)
		})
	}

	const confirm = (values, { setSubmitting }) => {
		fetch('/api/confirm', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(values)
		}).then(res => {
			if (!res.ok) throw res
			router.push({
				pathname: '/login',
				query: { confirmed: true }
			})
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