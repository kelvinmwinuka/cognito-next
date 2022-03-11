
export default function InputField({
  type,
  name,
  onChange,
  onBlur,
  placeholder
}) {
  return (
    <input
      type={type}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  )
}