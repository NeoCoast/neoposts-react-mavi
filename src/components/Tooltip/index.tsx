import React, { useId } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

type TooltipProps = {
  content: React.ReactNode;
  id?: string;
  place?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
};

const Tooltip = ({ content, id, place = 'top', children }: TooltipProps) => {
  const reactId = useId();
  const tooltipId = id ?? `tooltip-${reactId}`;

  return (
    <>
      <span data-tooltip-id={tooltipId} data-tooltip-content={String(content)}>
        {children}
      </span>
      <ReactTooltip id={tooltipId} place={place} />
    </>
  );
};

export default Tooltip;
