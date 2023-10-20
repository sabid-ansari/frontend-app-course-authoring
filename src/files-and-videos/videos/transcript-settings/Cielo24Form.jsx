import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Form, Stack, TransitionReplace } from '@edx/paragon';
import FormDropdown from './FormDropdown';
import { getFidelityOptions } from '../data/utils';
import messages from './messages';

const Cielo24Form = ({
  hasTranscriptCredentials,
  data,
  setData,
  transcriptionPlan,
  // injected
  intl,
}) => {
  const { fidelity } = transcriptionPlan;
  const selectedLanguage = data.preferredLanguages ? data.preferredLanguages : '';
  const turnaroundOptions = transcriptionPlan.turnaround;
  const fidelityOptions = getFidelityOptions(fidelity);
  const sourceLanguageOptions = data.cieloFidelity ? fidelity[data.cieloFidelity]?.languages : {};
  const languages = data.cieloFidelity === 'PROFESSIONAL' ? sourceLanguageOptions : {
    [data.videoSourceLanguage]: sourceLanguageOptions[data.videoSourceLanguage],
  };

  if (hasTranscriptCredentials) {
    return (
      <Stack gap={1}>
        <Form.Group size="sm">
          <Form.Label className="h5">
            <FormattedMessage {...messages.cieloTranscriptLanguageLabel} />
          </Form.Label>
          <FormDropdown
            value={data.cieloTurnaround}
            options={turnaroundOptions}
            handleSelect={(value) => setData({ ...data, cieloTurnaround: value })}
            placeholderText={intl.formatMessage(messages.cieloTranscriptLanguagePlaceholder)}
          />
        </Form.Group>
        <Form.Group size="sm">
          <Form.Label className="h5">
            <FormattedMessage {...messages.cieloFidelityLabel} />
          </Form.Label>
          <FormDropdown
            value={data.cieloFidelity}
            options={fidelityOptions}
            handleSelect={(value) => setData({ ...data, cieloFidelity: value, videoSourceLanguage: '' })}
            placeholderText={intl.formatMessage(messages.cieloFidelityPlaceholder)}
          />
        </Form.Group>
        <TransitionReplace>
          {isEmpty(data.cieloFidelity) ? null : (
            <Form.Group size="sm">
              <Form.Label className="h5">
                <FormattedMessage {...messages.cieloSourceLanguageLabel} />
              </Form.Label>
              <FormDropdown
                value={data.videoSourceLanguage}
                options={sourceLanguageOptions}
                handleSelect={(value) => setData({ ...data, videoSourceLanguage: value, preferredLanguages: '' })}
                placeholderText={intl.formatMessage(messages.cieloSourceLanguagePlaceholder)}
              />
            </Form.Group>
          )}
        </TransitionReplace>
        <TransitionReplace>
          {isEmpty(data.videoSourceLanguage) ? null : (
            <Form.Group size="sm">
              <Form.Label className="h5">
                <FormattedMessage {...messages.cieloTranscriptLanguageLabel} />
              </Form.Label>
              <FormDropdown
                value={selectedLanguage}
                options={languages}
                handleSelect={(value) => setData({ ...data, preferredLanguages: [value] })}
                placeholderText={intl.formatMessage(messages.cieloTranscriptLanguagePlaceholder)}
              />
            </Form.Group>
          )}
        </TransitionReplace>
      </Stack>
    );
  }

  return (
    <Stack gap={1}>
      <div className="small">
        <FormattedMessage {...messages.cieloCredentialMessage} />
      </div>
      <Form.Group size="sm">
        <Form.Label className="h5">
          <FormattedMessage {...messages.cieloApiKeyLabel} />
        </Form.Label>
        <Form.Control onBlur={(e) => setData({ ...data, apiKey: e.target.value })} />
      </Form.Group>
      <Form.Group size="sm">
        <Form.Label className="h5">
          <FormattedMessage {...messages.cieloUsernameLabel} />
        </Form.Label>
        <Form.Control onBlur={(e) => setData({ ...data, username: e.target.value })} />
      </Form.Group>
    </Stack>
  );
};

Cielo24Form.propTypes = {
  hasTranscriptCredentials: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    apiKey: PropTypes.string,
    apiSecretKey: PropTypes.string,
    cieloTurnaround: PropTypes.string,
    cieloFidelity: PropTypes.string,
    preferredLanguages: PropTypes.arrayOf(PropTypes.string),
    videoSourceLanguage: PropTypes.string,
  }).isRequired,
  setData: PropTypes.func.isRequired,
  transcriptionPlan: PropTypes.shape({
    turnaround: PropTypes.shape({}),
    fidelity: PropTypes.shape({}),
  }).isRequired,
  // injected
  intl: intlShape.isRequired,
};

export default injectIntl(Cielo24Form);