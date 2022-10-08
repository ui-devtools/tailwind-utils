import resolveConfig from 'tailwindcss/resolveConfig';
import type { Config } from 'tailwindcss/types/config';
import { properties, singleWordUtilities } from './properties';

const Tailwind = (config: Config) => {
  const resolvedConfig = resolveConfig(config);
  const theme = resolvedConfig.theme || {};

  const responsiveModifiers = Object.keys(theme.screens || []);
  const pseudoModifiers = resolvedConfig.variantOrder;

  const parse = (className = '') => {
    // format: prefix-value | responsive:prefix-value | pseudo:prefix-value | responsive:pseudo:prefix-value

    let responsiveModifier: string | null = null;
    let pseudoModifier: string | null = null;
    let propertyName: string;
    let propertyValue: string;
    let relatedProperties: { [key: string]: string } | null = null;

    let keyValue: string = '';

    const numberOfModifiers = className.split(':').length - 1;

    if (numberOfModifiers === 0) keyValue = className;
    else if (numberOfModifiers === 1) {
      const unknownModifier = className.split(':')[0];
      keyValue = className.split(':')[1];
      if (responsiveModifiers.includes(unknownModifier)) responsiveModifier = unknownModifier;
      else if (pseudoModifiers.includes(unknownModifier)) pseudoModifier = unknownModifier;
      else; // have no idea what this is, ignore
    } else if (numberOfModifiers === 2) {
      responsiveModifier = className.split(':')[0];
      pseudoModifier = className.split(':')[1];
      keyValue = className.split(':')[2];
    }

    let prefix: string;
    let possiblePrefixes: string[];
    let valueKey: string;

    const numberOfHyphens = keyValue.split('-').length - 1;

    if (numberOfHyphens === 0) {
      possiblePrefixes = [keyValue];
      valueKey = 'DEFAULT';
    } else if (numberOfHyphens === 1) {
      possiblePrefixes = [keyValue.split('-')[0]];
      valueKey = keyValue.split('-')[1];
    } else if (numberOfHyphens === 2) {
      // if there are more than one - in the className, we need to test for both styles
      // text-blue-600 and drop-shadow-md
      possiblePrefixes = [keyValue.split('-')[0] + '-' + keyValue.split('-')[1]];
      prefix = 'TODO';
      valueKey = 'TODO';
    } else {
      // wow, no clue what's going on here
      propertyName = 'ERROR';
      propertyValue = 'ERROR';
    }

    // TODO: this would only work if there was one prefix
    // so we should make possiblePrefix an array and use that here
    const possibleProperties = properties.filter((p) => p.prefix === prefix);

    // if keyValue does not have a prefix, it's probably a singleWordUtility
    if (possibleProperties.length === 0) {
      if (Object.keys(singleWordUtilities).includes(prefix)) {
        propertyName = singleWordUtilities[prefix as keyof typeof singleWordUtilities].name;
        propertyValue = singleWordUtilities[prefix as keyof typeof singleWordUtilities].value;
      } else {
        propertyName = 'ERROR';
        propertyValue = 'ERROR';
      }
    } else {
      // match value to find property
      const matchingProperty = possibleProperties.find((property) => {
        const scale = theme[property.scale];
        const possibleValue = scale[valueKey];

        // this could be null if it's not the right property
        return possibleValue;
      });

      if (matchingProperty) {
        propertyName = matchingProperty.name;
        const possibleValue = theme[matchingProperty.scale][valueKey];

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

  const classname = () => {};

  return { parse, classname };
};

export default Tailwind;
