import type {
  KeyboardEventHandler,
  MouseEventHandler,
  SelectHTMLAttributes,
} from 'react';
import { useContext } from 'react';

import { FieldsetContext } from '../Fieldset/FieldsetContext';
import type { FormField } from '../useFormField';
import { useFormField } from '../useFormField';

import type { NativeSelectProps } from './NativeSelect';

type UseNativeSelect = (props: NativeSelectProps) => Omit<
  FormField,
  'inputProps'
> & {
  selectProps: Pick<
    SelectHTMLAttributes<HTMLSelectElement>,
    | 'name'
    | 'required'
    | 'onClick'
    | 'onChange'
    | 'id'
    | 'onKeyDown'
    | 'onMouseDown'
  >;
};

/** Handles props for `NativeSelect` in context with `Fieldset` */
export const useNativeSelect: UseNativeSelect = (props) => {
  const fieldset = useContext(FieldsetContext);
  const {
    inputProps: selectProps,
    readOnly = false,
    size = fieldset?.size ?? 'md',
    ...rest
  } = useFormField(props, 'select');

  return {
    ...rest,
    readOnly,
    size,
    selectProps: {
      ...selectProps,
      readOnly,
      onClick: (e) => {
        if (readOnly) {
          e.preventDefault();
          return;
        }
        props?.onClick?.(e);
      },
      onKeyDown: (e) => {
        if (readOnly) {
          if (e.key === 'Tab') return;
          e.preventDefault();
          return;
        }
        props?.onKeyDown?.(e);
      },
      onMouseDown: (e) => {
        if (readOnly) {
          e.preventDefault();
          if (e.target instanceof HTMLElement) e.target.focus();
          return;
        }
        props?.onMouseDown?.(e);
      },
      onChange: (e) => {
        if (readOnly) {
          e.preventDefault();
          return;
        }
        props?.onChange?.(e);
      },
    },
  };
};
