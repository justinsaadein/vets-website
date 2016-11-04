import React from 'react';
import classNames from 'classnames';

export default function Notification({ title, body, onClose, type }) {
  const classes = classNames('usa-alert', 'claims-alert', 'claims-alert-status', {
    'usa-alert-success': type === 'success',
    'usa-alert-error': type === 'error'
  });
  return (
    <div className={classes}>
      {onClose && <button className="va-alert-close" onClick={onClose}>
        <i className="fa fa-close"></i>
      </button>}
      <div className="usa-alert-body">
        <h4 className="usa-alert-heading">{title}</h4>
        <p className="usa-alert-text">
          {body}
        </p>
      </div>
    </div>
  );
}

Notification.propTypes = {
  title: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired,
  onClose: React.PropTypes.func,
  type: React.PropTypes.string
};

Notification.defaultProps = {
  type: 'success'
};
