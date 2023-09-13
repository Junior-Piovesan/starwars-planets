type PropsType = {
  handleChange: (event:any) => void
  label:string
  value:string
  name:string
  placeholder:string
  testId?:string
};

export default function InputText({
  handleChange,
  placeholder,
  label,
  value,
  name,
  testId = '',
}:PropsType) {
  return (
    <label htmlFor={ label }>
      {label}
      <input
        data-testid={ testId }
        onChange={ handleChange }
        placeholder={ placeholder }
        id={ label }
        type="text"
        value={ value }
        name={ name }
      />
    </label>
  );
}
