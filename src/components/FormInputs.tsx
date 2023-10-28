interface IFormInput {
  label: string;
  type: string;
  name: string;
  value?: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormInputs: React.FC<IFormInput> = ({
  label,
  type,
  name,
  value,
  handleChange,
}) => {
  return (
    <label>
      {label}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => handleChange(e)}
        placeholder={label}
        required
      />
    </label>
  );
};

export default FormInputs;
