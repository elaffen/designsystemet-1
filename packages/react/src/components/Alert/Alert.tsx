import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import {
  InformationSquareFillIcon,
  CheckmarkCircleFillIcon,
  XMarkOctagonFillIcon,
  ExclamationmarkTriangleFillIcon,
} from '@navikt/aksel-icons';
import cl from 'clsx/lite';

import { Paragraph } from '..';

const icons: Record<
  Severity,
  { Icon: typeof InformationSquareFillIcon; title: string }
> = {
  info: {
    Icon: InformationSquareFillIcon,
    title: 'Informasjon',
  },
  warning: { Icon: ExclamationmarkTriangleFillIcon, title: 'Advarsel' },
  success: { Icon: CheckmarkCircleFillIcon, title: 'Suksess' },
  danger: {
    Icon: XMarkOctagonFillIcon,
    title: 'Feil',
  },
};

type Severity = 'info' | 'warning' | 'success' | 'danger';

export type AlertProps = {
  /** Sets color & icon according to severity */
  severity?: Severity;
  /** Adds a shadow to elevate the component */
  elevated?: boolean;
  /** Sets `title` on the icon.
   *
   * Use this to inform screenreaders of severity.
   *  Defaults to Norwegian. */
  iconTitle?: string;
  /**
   * Sets the size of the alert.
   * Does not affect font size.
   *
   * @default md
   */
  size?: 'sm' | 'md' | 'lg';
} & HTMLAttributes<HTMLDivElement>;
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      severity = 'info',
      elevated,
      iconTitle,
      children,
      size = 'md',
      className,
      ...rest
    },
    ref,
  ) => {
    const { Icon, title } = icons[severity];

    return (
      <div
        ref={ref}
        className={cl(
          'ds-alert',
          `ds-alert--${size}`,
          `ds-alert--${severity}`,
          elevated && `ds-alert--elevated`,
          className,
        )}
        {...rest}
      >
        <>
          <Icon
            title={iconTitle || title}
            className='ds-alert__icon'
          />
          <Paragraph
            asChild
            size={size}
            className='ds-alert__content'
          >
            <span>{children}</span>
          </Paragraph>
        </>
      </div>
    );
  },
);

Alert.displayName = 'Alert';
