
export default function SubmitButton({ isSubmitting = false }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      style={{
        marginTop: "10px"
      }}>
      {isSubmitting ? 'Submitting' : 'Submit'}
    </button>
  )
}