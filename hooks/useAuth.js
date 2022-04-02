import { useRouter } from "next/router";

export default function useAuth(){

  const router = useRouter()

  const login = (values, { setSubmitting }) => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(res => {
      if (!res.ok) throw res
    }).then(data => {
      console.log(data)
    }).catch(async err => {
      const responseData = await err.json()
      if (responseData?.message?.includes("UserNotConfirmedException:")) {
        // Trigger confirmation code email
        await fetch('/api/confirm/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: values.username })
        })
        await router.push({
          pathname: "/confirm",
          query: {username: values.username}
        })
      }
    }).finally(() => {
      setSubmitting(false)
    })
  }

  return {
    login
  }
}