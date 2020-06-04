/** @typedef {JSX.Element} JsxElement */
/** @typedef {'default' | 'pending' | 'success' | 'failure'} StatusCode */
/** @typedef {any} StatusProps */

import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';
import { Button, Spinner, Icon } from 'native-base';

/** @type {Record<StatusCode, StatusCode>} */
export const StatusButtonCode = {
  default: 'default',
  pending: 'pending',
  success: 'success',
  failure: 'failure',
};

const StatusButton = (props) => {
  const {
    status,
    onPress,
    style,
    children,
    pendingProps,
    successProps,
    failureProps,
    ...defaultProps
  } = props;

  /** @type {Record<StatusCode, StatusProps>} */
  const StatusProps = {
    pending: pendingProps,
    success: successProps,
    failure: failureProps,
    default: defaultProps,
  };

  /** @type {{ [key in StatusCode]: JsxElement }} */
  const StatusChildren = {
    pending: <Spinner color="gray" size="small" />,
    success: <Icon name="check" type="Feather" />,
    failure: <Icon name="alert-circle" type="Feather" />,
    default: <></>,
  };

  /** @param {StatusCode} statusCode */
  function getStatusProps(statusCode) {
    return StatusProps[statusCode];
  }

  /** @param {string} statusCode */
  /** @returns {JsxElement} */
  function getStatusChildren(statusCode) {
    if (!children) { return StatusChildren[StatusButtonCode.default]; }
    const allChildren = Array.isArray(children) ? children : [children];
    /** @type {JsxElement} */
    const matchingChildren = allChildren.find((child) => {
      const isDefaultAndNoKey = statusCode === StatusButtonCode.default && !child.key;
      return isDefaultAndNoKey || child.key === statusCode;
    });
    return matchingChildren || StatusChildren[statusCode];
  }

  return (
    <Button {...getStatusProps(status)} style={style} onPress={onPress}>
      {getStatusChildren(status)}
    </Button>
  );
};

StatusButton.propTypes = {
  status: PropTypes.string,
  onPress: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  style: ViewPropTypes.style,
  pendingProps: PropTypes.object,
  successProps: PropTypes.object,
  failureProps: PropTypes.object,
};

StatusButton.defaultProps = {
  status: StatusButtonCode.default,
  onPress: () => { },
  children: <></>,
  style: {},
  pendingProps: {},
  successProps: {},
  failureProps: {},
};

export default StatusButton;
