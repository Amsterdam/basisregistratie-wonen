import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedNumber } from 'react-intl';
import styled from 'styled-components';

import LoadingIndicator from 'components/LoadingIndicator';
import messages from 'containers/App/messages';
import { isArray, isObject } from 'utils';

import { Ul, Key, StelselpediaLink, SectionHeading } from 'containers/AccommodationObjectPage/styled';

const SectionWrapper = styled.section`
  position: relative;
`;

const printValue = meta => {
  const { type, formattedValue } = meta;

  switch (type) {
    case 'number':
      return <FormattedNumber value={formattedValue} />;
    case 'currency':
      return (
        <FormattedNumber
          value={formattedValue}
          style="currency" // eslint-disable-line
          currency="EUR"
          currencyDisplay="symbol"
          minimumFractionDigits={0}
          maximumFractionDigits={0}
        />
      );
    default:
      return formattedValue;
  }
};

export const SectionComponent = ({ name, href, data, intl }) => {
  const { formatMessage, locale } = intl;
  const sectionData = data && data.length === 1 && isArray(data[0]) ? data[0] : data;

  const renderList = listData => (
    <Ul>
      {listData.map(listItem => {
        let readableKey = listItem.formattedKey;

        if (isObject(readableKey) && readableKey.id) {
          readableKey = formatMessage(readableKey, { entity: listItem.key });
        }

        return (
          <li key={listItem.key || Math.random()}>
            {isArray(listItem) ? (
              renderList(listItem)
            ) : (
              <>
                <Key lang={locale}>{readableKey}</Key>: {printValue(listItem)}
              </>
            )}
          </li>
        );
      })}
    </Ul>
  );

  const Title = () => (
    <SectionHeading marginCollapse id={name}>
      {name}
      {href && (
        <StelselpediaLink
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={formatMessage(messages.to_stelselpedia, { name })}
        >
          <span>i</span>
        </StelselpediaLink>
      )}
    </SectionHeading>
  );

  return (
    <SectionWrapper>
      {name && data !== null && <Title />}

      {data === undefined && <LoadingIndicator />}
      {data && renderList(sectionData)}
    </SectionWrapper>
  );
};

SectionComponent.defaultProps = {
  href: '',
};

SectionComponent.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        formattedKey: PropTypes.oneOfType([
          PropTypes.shape({
            id: PropTypes.string.isRequired,
          }),
          PropTypes.string,
        ]).isRequired,
        formattedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        key: PropTypes.string.isRequired,
        value: PropTypes.any,
      }),
    ),
    PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          formattedKey: PropTypes.oneOfType([
            PropTypes.shape({
              id: PropTypes.string.isRequired,
            }),
            PropTypes.string,
          ]).isRequired,
          formattedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          key: PropTypes.string.isRequired,
          value: PropTypes.any,
        }),
      ),
    ),
  ]),
  intl: intlShape.isRequired,
};

export default injectIntl(SectionComponent);