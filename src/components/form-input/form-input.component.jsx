import { FormInputLabel, Input, Group } from "./form-input.styles";

function FormInput({ label, ...otherProps }) {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel
          shrink={otherProps.value.length}
          className={`${
            otherProps.value.length > 0 ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
}

export default FormInput;
