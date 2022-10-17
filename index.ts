import resolveConfig from 'tailwindcss/resolveConfig';
import type { Config } from 'tailwindcss/types/config';
import flattenColorPalette from 'tailwindcss/src/util/flattenColorPalette';
import { properties, singleWordUtilities } from './properties';

const Tailwind = (config: Config) => {
  const resolvedConfig = resolveConfig(config);
  const theme = resolvedConfig.theme || {};

  const flatColors = flattenColorPalette(theme.colors);

  // TODO: check source code for this because the types are more flexible than object
  const responsiveModifiers = Object.keys(theme.screens || {});
  const pseudoModifiers = resolvedConfig.variantOrder;

  const parse = (className: string = '') => {
    // format: prefix-value | responsive:prefix-value | pseudo:prefix-value | responsive:pseudo:prefix-value

    let responsiveModifier: string | null = null;
    let pseudoModifier: string | null = null;
    let propertyName: string;
    let propertyValue: string;
    let relatedProperties: { [key: string]: string } | null = null;

    let classNameWithoutModifers: string = '';

    const numberOfModifiers = className.split(':').length - 1;

    if (numberOfModifiers === 0) classNameWithoutModifers = className;
    else if (numberOfModifiers === 1) {
      const unknownModifier = className.split(':')[0];
      classNameWithoutModifers = className.split(':')[1];
      if (responsiveModifiers.includes(unknownModifier)) responsiveModifier = unknownModifier;
      else if (pseudoModifiers.includes(unknownModifier)) pseudoModifier = unknownModifier;
      else; // have no idea what this is, TODO: should this ignore or throw an error?
    } else if (numberOfModifiers === 2) {
      responsiveModifier = className.split(':')[0];
      pseudoModifier = className.split(':')[1];
      classNameWithoutModifers = className.split(':')[2];
    }

    const possibleProperties = properties.filter((property) =>
      classNameWithoutModifers.startsWith(property.prefix + '-')
    );

    // if keyValue does not have a prefix, it's probably a singleWordUtility
    if (possibleProperties.length === 0) {
      if (Object.keys(singleWordUtilities).includes(classNameWithoutModifers)) {
        propertyName = singleWordUtilities[classNameWithoutModifers as keyof typeof singleWordUtilities].name;
        propertyValue = singleWordUtilities[classNameWithoutModifers as keyof typeof singleWordUtilities].value;
      } else {
        // no clue what this is then
        propertyName = 'ERROR';
        propertyValue = 'ERROR';
      }
    } else {
      // match value to find property
      const matchingProperty = possibleProperties.find((property) => {
        const scale = property.scale === 'colors' ? flatColors : theme[property.scale];
        const scaleKey = classNameWithoutModifers.replace(property.prefix + '-', '');
        const possibleValue = scale[scaleKey];

        // this could be null if it's not the right property
        return Boolean(possibleValue);
      });

      if (matchingProperty) {
        propertyName = matchingProperty.name;

        const scale = matchingProperty.scale === 'colors' ? flatColors : theme[matchingProperty.scale];
        const scaleKey = classNameWithoutModifers.replace(matchingProperty.prefix + '-', '');
        const possibleValue = scale[scaleKey];

        // fontSize is special
        if (propertyName === 'fontSize' && Array.isArray(possibleValue)) {
          propertyValue = possibleValue[0];
          relatedProperties = possibleValue[1];
        } else if (Array.isArray(possibleValue)) {
          // true for fontFamily and dropShadow
          propertyValue = possibleValue.join(', ');
        } else {
          propertyValue = possibleValue;
        }
      } else {
        // no clue if there is no matching property
        // most likely, this is because we don't have it in ./properties
        propertyName = 'ERROR';
        propertyValue = 'ERROR';
      }
    }

    return {
      className,
      responsiveModifier,
      pseudoModifier,
      property: propertyName,
      value: propertyValue,
      relatedProperties
    };
  };

  const classname = ({
    responsiveModifier,
    pseudoModifier,
    property: propertyName,
    value: propertyValue
  }: {
    responsiveModifier: string | null;
    pseudoModifier: string | null;
    property: string;
    value: string;
  }) => {
    let className: string | undefined = '';
    let error: {
      responsiveModifier?: string;
      pseudoModifier?: string;
      property?: string;
      value?: string;
    } = {};

    if (responsiveModifier) {
      if (responsiveModifiers.includes(responsiveModifier)) className = responsiveModifier + ':';
      else
        error['responsiveModifier'] = `Unidentified responsive modifier, expected one of [${responsiveModifiers.join(
          ', '
        )}], got ${responsiveModifier}`;
    }

    if (pseudoModifier) {
      if (pseudoModifiers.includes(pseudoModifier)) className = className + pseudoModifier + ':';
      else
        error['pseudoModifier'] = `Unidentified pseudo modifier, expected one of [${pseudoModifiers.join(
          ', '
        )}], got ${pseudoModifier}`;
    }

    const matchingProperty = properties.find((property) => property.name === propertyName);

    if (matchingProperty) {
      className += matchingProperty.prefix + '-';

      // find value on scale
      const scale = matchingProperty.scale === 'colors' ? flatColors : theme[matchingProperty.scale];
      if (scale) {
        let scaleKey;
        if (propertyName === 'fontSize') {
          // format: sm: [ '0.875rem', { lineHeight: '1.25rem' } ],
          scaleKey = Object.keys(scale).find((key) => scale[key][0] === propertyValue);
        } else {
          scaleKey = Object.keys(scale).find((key) => {
            // true for dropShadow and fontFamily
            if (Array.isArray(scale[key])) return scale[key].join(', ') === propertyValue;
            else return scale[key] === propertyValue;
          });
        }

        if (scaleKey) className += scaleKey;
        else error['value'] = 'UNIDENTIFIED_VALUE';
      } else {
        error['property'] = 'UNIDENTIFIED_PROPERTY';
      }
    } else {
      const isSingleWordUtility = Object.values(singleWordUtilities).find((property) => {
        return property.name === propertyName && property.value === propertyValue;
      });

      if (isSingleWordUtility) className = className + propertyValue;
      else error['property'] = 'UNIDENTIFIED_PROPERTY';
    }

    if (Object.keys(error).length > 0) return { error };
    else return { className };
  };

  return { parse, classname };
};

export default Tailwind;
