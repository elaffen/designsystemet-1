import type { Meta, StoryFn } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useEffect, useState } from 'react';

import { Button, Paragraph } from '../..';

import { TrashIcon } from '@navikt/aksel-icons';
import { Popover } from '.';

export default {
  title: 'Komponenter/Popover',
  component: Popover,
  parameters: {
    layout: 'fullscreen',
    customStyles: {
      display: 'flex',
      placeItems: 'end',
      placeContent: 'center',
      padding: '1rem 2rem',
    },
  },
  play: async (ctx) => {
    // When not in Docs mode, automatically open the popover
    const canvas = within(ctx.canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    const popover = ctx.canvasElement.querySelector('[popover]');
    await expect(popover).toBeVisible();
  },
} satisfies Meta;

export const Preview: StoryFn<typeof Popover> = (args) => {
  return (
    <Popover.TriggerContext>
      <Popover.Trigger>My trigger!</Popover.Trigger>
      <Popover {...args}>popover content</Popover>
    </Popover.TriggerContext>
  );
};

Preview.args = {
  placement: 'top',
};
Preview.parameters = {
  customStyles: {
    paddingTop: '5rem',
  },
};

export const Interactive: StoryFn<typeof Popover> = () => {
  return (
    <Popover.TriggerContext>
      <Popover.Trigger data-color='danger' aria-label='Slett rad'>
        <TrashIcon title='Slett rad' />
      </Popover.Trigger>
      <Popover data-color='danger'>
        <Paragraph>
          Er du sikker på at du vil slette raden? Handlingen kan ikke angres.
        </Paragraph>
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-size-2)',
            marginTop: 'var(--ds-size-2)',
          }}
        >
          <Button data-size='sm'>Ja, slett den</Button>
          <Button data-size='sm' variant='tertiary'>
            Avbryt
          </Button>
        </div>
      </Popover>
    </Popover.TriggerContext>
  );
};
Interactive.parameters = {
  customStyles: {
    padding: '12rem 6rem 1rem',
  },
};

export const DottedUnderline: StoryFn<typeof Popover> = () => {
  return (
    <>
      <Popover.TriggerContext>
        <Paragraph>
          Vi bruker <Popover.Trigger inline>design tokens</Popover.Trigger> for
          å sikre at vi har en konsistent design.
        </Paragraph>
        <Popover data-color='neutral'>
          <Paragraph>
            <strong
              style={{
                display: 'block',
              }}
            >
              Design tokens
            </strong>
            Design tokens er en samling av variabler som definerer designet i et
            designsystem.
          </Paragraph>
        </Popover>
      </Popover.TriggerContext>
    </>
  );
};
DottedUnderline.parameters = {
  customStyles: {
    padding: '10rem 6rem 1rem',
  },
};

export const Variants: StoryFn<typeof Popover> = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(true), []);

  return (
    <div
      style={{
        height: '110px',
        width: '240px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-2)',
          flexWrap: 'wrap',
          height: '100%',
          width: '100%',
        }}
      >
        <Popover.TriggerContext>
          <Popover.Trigger>popover</Popover.Trigger>
          <Popover
            open={open}
            placement='top'
            data-color='neutral'
            autoPlacement={false}
          >
            neutral
          </Popover>
        </Popover.TriggerContext>
        <Popover.TriggerContext>
          <Popover.Trigger>popover</Popover.Trigger>
          <Popover
            open={open}
            placement='bottom'
            data-color='danger'
            autoPlacement={false}
          >
            danger
          </Popover>
        </Popover.TriggerContext>
        <Popover.TriggerContext>
          <Popover.Trigger>popover</Popover.Trigger>
          <Popover
            open={open}
            placement='top'
            data-color='info'
            autoPlacement={false}
          >
            info
          </Popover>
        </Popover.TriggerContext>
        <Popover.TriggerContext>
          <Popover.Trigger>popover</Popover.Trigger>
          <Popover
            open={open}
            placement='bottom'
            data-color='warning'
            autoPlacement={false}
          >
            warning
          </Popover>
        </Popover.TriggerContext>
      </div>
    </div>
  );
};
Variants.parameters = {
  customStyles: {
    padding: '5rem 1rem',
  },
};
Variants.play = () => {};

export const Controlled: StoryFn<typeof Popover> = () => {
  const [open, setOpen] = useState(false);

  return (
    <Popover.TriggerContext>
      <Popover.Trigger onClick={() => setOpen(!open)}>
        My trigger
      </Popover.Trigger>
      <Popover open={open} onClose={() => setOpen(false)} data-color='neutral'>
        <Paragraph>Er du sikker på at du vil slette?</Paragraph>
        <Button
          data-color='danger'
          onClick={() => setOpen(false)}
          data-size='sm'
          style={{ marginTop: 'var(--ds-size-2)' }}
        >
          Slett
        </Button>
      </Popover>
    </Popover.TriggerContext>
  );
};
Controlled.parameters = {
  customStyles: {
    padding: '8rem 6rem 1rem',
  },
};

export const WithoutContext: StoryFn<typeof Popover> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button popovertarget='my-popover' onClick={() => setOpen(!open)}>
        My trigger
      </Button>
      <Popover
        id='my-popover'
        open={open}
        onClose={() => setOpen(false)}
        data-color='neutral'
      >
        <Paragraph>Er du sikker på at du vil slette?</Paragraph>
        <Button
          data-color='danger'
          onClick={() => setOpen(false)}
          data-size='sm'
          style={{ marginTop: 'var(--ds-size-2)' }}
        >
          Slett
        </Button>
      </Popover>
    </>
  );
};
WithoutContext.parameters = {
  customStyles: {
    padding: '8rem 6rem 1rem',
  },
};
