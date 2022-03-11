
export default function InputHelperText({ children, isError = false }){
  return (
    <span
      style={{
        marginTop: "5px",
        display: "block",
        fontSize: "small",
        color: isError ? "red" : "black"
      }}>
      {children}
    </span>
  )
}