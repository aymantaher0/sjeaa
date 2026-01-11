import React from 'react';
import { Element } from '../../types';

interface FormElementProps {
  element: Element;
  isSelected: boolean;
  onClick: () => void;
}

export const FormElement: React.FC<FormElementProps> = ({ element, isSelected, onClick }) => {
  const fields = element.props.fields || [];

  return (
    <form
      onClick={onClick}
      onSubmit={(e) => e.preventDefault()}
      style={{
        ...element.style,
        outline: isSelected ? '2px solid var(--primary-color)' : 'none',
        cursor: 'pointer',
      }}
    >
      {fields.map((field: any, index: number) => (
        <div key={index} style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>
            {field.label}
          </label>
          <input
            type={field.type || 'text'}
            name={field.name}
            required={field.required}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>
      ))}
      <button
        type="submit"
        style={{
          background: '#000',
          color: '#fff',
          padding: '12px 30px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </form>
  );
};
