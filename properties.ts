// this is probably a bad idea?
// what properties are missing here that might be in the theme
// ["screens","colors","columns","spacing","animation","aspectRatio","backdropBlur","backdropBrightness","backdropContrast","backdropGrayscale","backdropHueRotate","backdropInvert","backdropOpacity","backdropSaturate","backdropSepia","backgroundColor","backgroundImage","backgroundOpacity","backgroundPosition","backgroundSize","blur","brightness","borderColor","borderOpacity","borderRadius","borderSpacing","borderWidth","boxShadow","boxShadowColor","caretColor","accentColor","contrast","container","content","cursor","divideColor","divideOpacity","divideWidth","dropShadow","fill","grayscale","hueRotate","invert","flex","flexBasis","flexGrow","flexShrink","fontFamily","fontSize","fontWeight","gap","gradientColorStops","gridAutoColumns","gridAutoRows","gridColumn","gridColumnEnd","gridColumnStart","gridRow","gridRowStart","gridRowEnd","gridTemplateColumns","gridTemplateRows","height","inset","keyframes","letterSpacing","lineHeight","listStyleType","margin","maxHeight","maxWidth","minHeight","minWidth","objectPosition","opacity","order","padding","placeholderColor","placeholderOpacity","outlineColor","outlineOffset","outlineWidth","ringColor","ringOffsetColor","ringOffsetWidth","ringOpacity","ringWidth","rotate","saturate","scale","scrollMargin","scrollPadding","sepia","skew","space","stroke","strokeWidth","textColor","textDecorationColor","textDecorationThickness","textUnderlineOffset","textIndent","textOpacity","transformOrigin","transitionDelay","transitionDuration","transitionProperty","transitionTimingFunction","translate","width","willChange","zIndex"]

type Property = {
  name: string;
  scale: string;
  prefix: string;
};

// what does it mean to have prefix: ''?
export const properties: Property[] = [
  { name: 'display', scale: 'display', prefix: '' },
  { name: 'opacity', scale: 'opacity', prefix: 'opacity' },

  { name: 'justifyContent', scale: 'justifyContent', prefix: 'justify' },
  { name: 'alignItems', scale: 'alignItems', prefix: 'items' },
  { name: 'flexDirection', scale: 'flexDirection', prefix: 'flex' },
  { name: 'flexWrap', scale: 'flexWrap', prefix: 'flex' },

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

  { name: 'fontFamily', scale: 'fontFamily', prefix: 'font' },
  { name: 'textColor', scale: 'colors', prefix: 'text' },
  { name: 'fontWeight', scale: 'fontWeight', prefix: 'font' },
  { name: 'fontSize', scale: 'fontSize', prefix: 'text' },
  { name: 'textAlign', scale: 'textAlign', prefix: 'text' },
  { name: 'lineHeight', scale: 'lineHeight', prefix: 'leading' },
  { name: 'fontStyle', scale: 'fontStyle', prefix: '' },
  { name: 'textDecoration', scale: 'textDecoration', prefix: '' },
  { name: 'textTransform', scale: 'textTransform', prefix: '' },
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

  { name: 'color', scale: 'colors', prefix: '' },
  { name: 'colors', scale: 'colors', prefix: '' },

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
  { name: 'accessibility', scale: 'accessibility', prefix: '' }
].sort((a, b) => b.prefix.length - a.prefix.length);
// we sort by lengh of prefix so that text-opacity- is matched before text-

// this list is probably longer
export const singleWordUtilities = {
  static: { name: 'position', value: 'static' },
  fixed: { name: 'position', value: 'fixed' },
  absolute: { name: 'position', value: 'absolute' },
  relative: { name: 'position', value: 'relative' },
  sticky: { name: 'position', value: 'sticky' }
};
