import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PageBreadcrumb = ({ page }) => {
  return (
    <Breadcrumb>
      <Link to="/dashboard">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Link>
      <Breadcrumb.Item active>/{page}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

PageBreadcrumb.propTypes = {
  page: PropTypes.string.isRequired,
};

export default PageBreadcrumb;