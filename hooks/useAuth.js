
export default function useAuth(){

  const login = (values, { setSubmitting }) => {
    fetch('/api/login', {
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
    login
  }
}