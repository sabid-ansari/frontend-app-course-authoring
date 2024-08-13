import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { EditorPage } from '@edx/frontend-lib-content-components';
import { getConfig } from '@edx/frontend-platform';

const EditorContainer = ({
  courseId,
}) => {
  const { blockType, blockId } = useParams();
  return (
    <div className="editor-page">
      {/* coming here */}
      <EditorPage
        courseId={courseId}
        blockType={blockType}
        blockId={blockId}
        studioEndpointUrl={getConfig().STUDIO_BASE_URL}
        lmsEndpointUrl={getConfig().LMS_BASE_URL}
      />
    </div>
  );
};
EditorContainer.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default EditorContainer;
