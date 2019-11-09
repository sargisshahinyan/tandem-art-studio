import React, { Fragment } from 'react';

export function convertText(text) {
  return (
    text
      .split('\n')
      .map((piece, i, arr) => (
        <Fragment key={i}>
          {piece}
          {i !== arr.length - 1 && <br />}
        </Fragment>
      ))
  );
}
