type Property = {
  name: string;
  scale: string;
  prefix: string;
};

export const propertiesOld: Property[] = [
  // { name: 'display', scale: 'display', prefix: ''},
  { name: 'opacity', scale: 'opacity', prefix: 'opacity' },

  { name: 'flex', scale: 'flex', prefix: 'flex' },
  { name: 'flexGrow', scale: 'flexGrow', prefix: 'flex-grow' },
  { name: 'flexShrink', scale: 'flexShrink', prefix: 'flex-shrink' },
  { name: 'alignSelf', scale: 'alignSelf', prefix: 'self' },
  { name: 'order', scale: 'order', prefix: 'order' },

  { name: 'width', scale: 'width', prefix: 'w' },
  { name: 'height', scale: 'height', prefix: 'h' },
  { name: 'maxWidth', scale: 'maxWidth', prefix: 'max-w' },
  { name: 'maxHeight', scale: 'maxHeight', prefix: 'max-h' },
  { name: 'minWidth', scale: 'minWidth', prefix: 'min-w' },
  { name: 'minHeight', scale: 'minHeight', prefix: 'min-h' },
  { name: 'borderRadius', scale: 'borderRadius', prefix: 'rounded' },
  { name: 'borderRadiusTopLeft', scale: 'borderRadius', prefix: 'rounded-tl' },
  { name: 'borderRadiusTopRight', scale: 'borderRadius', prefix: 'rounded-tr' },
  { name: 'borderRadiusBottomRight', scale: 'borderRadius', prefix: 'rounded-br' },
  { name: 'borderRadiusBottomLeft', scale: 'borderRadius', prefix: 'rounded-bl' },

  { name: 'spaceX', scale: 'space', prefix: 'space-x' },
  { name: 'spaceY', scale: 'space', prefix: 'space-y' },

  { name: 'margin', scale: 'margin', prefix: 'm' },
  { name: 'marginTop', scale: 'margin', prefix: 'mt' },
  { name: 'marginRight', scale: 'margin', prefix: 'mr' },
  { name: 'marginBottom', scale: 'margin', prefix: 'mb' },
  { name: 'marginLeft', scale: 'margin', prefix: 'ml' },
  { name: 'marginX', scale: 'margin', prefix: 'mx' },
  { name: 'marginY', scale: 'margin', prefix: 'my' },

  { name: 'padding', scale: 'padding', prefix: 'p' },
  { name: 'paddingTop', scale: 'padding', prefix: 'pt' },
  { name: 'paddingRight', scale: 'padding', prefix: 'pr' },
  { name: 'paddingBottom', scale: 'padding', prefix: 'pb' },
  { name: 'paddingLeft', scale: 'padding', prefix: 'pl' },
  { name: 'paddingX', scale: 'padding', prefix: 'px' },
  { name: 'paddingY', scale: 'padding', prefix: 'py' },

  { name: 'inset', scale: 'inset', prefix: 'inset' },
  { name: 'inset-x', scale: 'inset', prefix: 'inset-x' },
  { name: 'inset-y', scale: 'inset', prefix: 'inset-y' },
  { name: 'top', scale: 'inset', prefix: 'top' },
  { name: 'right', scale: 'inset', prefix: 'right' },
  { name: 'bottom', scale: 'inset', prefix: 'bottom' },
  { name: 'left', scale: 'inset', prefix: 'left' },

  { name: 'gap', scale: 'gap', prefix: 'gap' },
  { name: 'gapX', scale: 'columnGap', prefix: 'gap-x' },
  { name: 'gapY', scale: 'rowGap', prefix: 'gap-y' },

  { name: 'fontFamily', scale: 'fontFamily', prefix: 'font' },
  { name: 'textColor', scale: 'colors', prefix: 'text' },
  { name: 'fontWeight', scale: 'fontWeight', prefix: 'font' },
  { name: 'fontSize', scale: 'fontSize', prefix: 'text' },
  { name: 'textAlign', scale: 'textAlign', prefix: 'text' },
  { name: 'lineHeight', scale: 'lineHeight', prefix: 'leading' },
  // { name: 'fontStyle', scale: 'fontStyle', prefix: '' },
  // { name: 'textDecoration', scale: 'textDecoration', prefix: '' },
  // { name: 'textTransform', scale: 'textTransform', prefix: '' },
  { name: 'textOpacity', scale: 'textOpacity', prefix: 'text-opacity' },

  { name: 'backgroundColor', scale: 'colors', prefix: 'bg' },
  {
    name: 'backgroundOpacity',
    scale: 'backgroundOpacity',
    prefix: 'bg-opacity'
  },

  { name: 'borderWidth', scale: 'borderWidth', prefix: 'border' },
  { name: 'borderTopWidth', scale: 'borderWidth', prefix: 'border-t' },
  { name: 'borderRightWidth', scale: 'borderWidth', prefix: 'border-r' },
  { name: 'borderBottomWidth', scale: 'borderWidth', prefix: 'border-b' },
  { name: 'borderLeftWidth', scale: 'borderWidth', prefix: 'border-l' },

  { name: 'borderColor', scale: 'colors', prefix: 'border' },
  { name: 'borderStyle', scale: 'borderStyle', prefix: 'border' },
  { name: 'outline', scale: 'outline', prefix: 'outline' },
  {
    name: 'borderOpacity',
    scale: 'borderOpacity',
    prefix: 'border-opacity'
  },

  { name: 'boxShadow', scale: 'boxShadow', prefix: 'shadow' },
  { name: 'dropShadow', scale: 'dropShadow', prefix: 'drop-shadow' },

  { name: 'fill', scale: 'fill', prefix: 'fill' },
  { name: 'stroke', scale: 'stroke', prefix: 'stroke' },
  { name: 'strokeWidth', scale: 'strokeWidth', prefix: 'stroke' },

  {
    name: 'transitionProperty',
    scale: 'transitionProperty',
    prefix: 'transition'
  },
  {
    name: 'transitionDuration',
    scale: 'transitionDuration',
    prefix: 'duration'
  },
  {
    name: 'transitionTimingFunction',
    scale: 'transitionTimingFunction',
    prefix: 'ease'
  },
  { name: 'transitionDelay', scale: 'transitionDelay', prefix: 'delay' },
  { name: 'animation', scale: 'animation', prefix: 'animate' },

  { name: 'gridRow', scale: 'gridRow', prefix: 'row' },
  { name: 'gridRowStart', scale: 'gridRowStart', prefix: 'row-start' },
  { name: 'gridRowEnd', scale: 'gridRowEnd', prefix: 'row-end' },
  { name: 'gridColumn', scale: 'gridColumn', prefix: 'col' },
  { name: 'gridColumnStart', scale: 'gridColumnStart', prefix: 'col-start' },
  { name: 'gridColumnEnd', scale: 'gridColumnEnd', prefix: 'col-end' },
  { name: 'gridAutoRows', scale: 'gridAutoRows', prefix: 'auto-rows' },
  { name: 'gridAutoColumns', scale: 'gridAutoColumns', prefix: 'auto-cols' },
  { name: 'gridTemplateRows', scale: 'gridTemplateRows', prefix: 'grid-rows' },
  { name: 'gridTemplateColumns', scale: 'gridTemplateColumns', prefix: 'grid-cols' },

  { name: 'zIndex', scale: 'zIndex', prefix: 'z' },
  { name: 'order', scale: 'order', prefix: 'order' },
  { name: 'translate', scale: 'translate', prefix: 'translate' },
  { name: 'translateX', scale: 'translate', prefix: 'translate-x' },
  { name: 'translateY', scale: 'translate', prefix: 'translate-y' },

  { name: 'transformOrigin', scale: 'transformOrigin', prefix: 'origin' },

  { name: 'listStyleType', scale: 'listStyleType', prefix: 'list' },
  { name: 'cursor', scale: 'cursor', prefix: 'cursor' }

  // { name: 'accessibility', scale: 'accessibility', prefix: '' }
];
