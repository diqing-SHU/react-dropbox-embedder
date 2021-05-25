import * as React from 'react'
import DropboxPortal from './DropboxPortal'
import { IProps } from './types';

const Package: React.FC<IProps> = ({link, id, appKey }: IProps) => (
  <>
    <div id={id} />
    <DropboxPortal id={id} link={link} appKey={appKey}/>
  </>
)

export default Package
