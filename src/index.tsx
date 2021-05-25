import * as React from 'react'
import DropboxPortal from './DropboxPortal'
import { IProps } from './types';

const Package: React.FC<IProps> = (props) => (
  <>
    <div id={props.id} />
    <DropboxPortal id={props.id} link={props.link} />
  </>
)

export default Package
